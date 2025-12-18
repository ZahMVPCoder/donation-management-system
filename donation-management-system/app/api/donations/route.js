import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const donorId = searchParams.get('donorId')
    const skip = parseInt(searchParams.get('skip') || '0')
    const take = parseInt(searchParams.get('take') || '20')

    let where = {}
    if (donorId) where.donorId = donorId

    const donations = await prisma.donation.findMany({
      where,
      skip,
      take,
      include: { donor: true, campaigns: true },
      orderBy: { date: 'desc' },
    })

    const total = await prisma.donation.count({ where })

    return NextResponse.json({ donations, total, skip, take })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { donorId, amount, date, method, isRecurring, recurringFrequency, campaignId, notes } = await request.json()

    if (!donorId || !amount || !date) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    if (amount <= 0) {
      return NextResponse.json({ error: 'Amount must be positive' }, { status: 400 })
    }

    const donor = await prisma.donor.findUnique({ where: { id: donorId } })
    if (!donor) {
      return NextResponse.json({ error: 'Donor not found' }, { status: 404 })
    }

    const donation = await prisma.donation.create({
      data: {
        donorId,
        amount: parseFloat(amount),
        date: new Date(date),
        method,
        isRecurring: isRecurring || false,
        recurringFrequency,
        notes,
      },
    })

    if (campaignId) {
      await prisma.campaignDonation.create({
        data: { campaignId, donationId: donation.id },
      })
    }

    // Auto-create thank-you task
    await prisma.task.create({
      data: {
        title: `Thank ${donor.firstName} for donation`,
        taskType: 'thank-you',
        donorId,
        donationId: donation.id,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        status: 'pending',
      },
    })

    return NextResponse.json(donation, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
