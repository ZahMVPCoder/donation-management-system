import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: params.id },
      include: {
        donations: {
          include: {
            donation: {
              include: {
                donor: true,
              },
            },
          },
        },
      },
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
    }

    const donations = campaign.donations.map(cd => cd.donation)
    const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0)
    const progressPercentage = campaign.goalAmount > 0 ? (totalRaised / campaign.goalAmount) * 100 : 0

    return NextResponse.json({
      ...campaign,
      totalRaised,
      progressPercentage,
      donations: campaign.donations,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { name, description, goalAmount, status, startDate, endDate } = await request.json()

    const campaign = await prisma.campaign.update({
      where: { id: params.id },
      data: {
        name,
        description,
        goalAmount: goalAmount ? parseFloat(goalAmount) : undefined,
        status,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
      },
    })

    return NextResponse.json(campaign)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
