import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const tasks = await prisma.task.findMany({
      include: { donor: true, donation: true },
      orderBy: { dueDate: 'asc' },
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const overdue = []
    const thisWeek = []
    const later = []

    tasks.forEach(task => {
      if (task.status === 'completed') return

      const dueDate = new Date(task.dueDate)
      dueDate.setHours(0, 0, 0, 0)

      const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24))

      if (daysUntilDue < 0) {
        overdue.push(task)
      } else if (daysUntilDue < 7) {
        thisWeek.push(task)
      } else {
        later.push(task)
      }
    })

    return NextResponse.json({ overdue, thisWeek, later })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { title, taskType, donorId, donationId, dueDate, description, status } = await request.json()

    if (!title || !taskType || !dueDate) {
      return NextResponse.json({ error: 'Title, type, and due date required' }, { status: 400 })
    }

    const task = await prisma.task.create({
      data: {
        title,
        taskType,
        donorId,
        donationId,
        dueDate: new Date(dueDate),
        description,
        status: status || 'pending',
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
