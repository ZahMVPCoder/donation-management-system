import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const skip = parseInt(searchParams.get('skip') || '0')
    const take = parseInt(searchParams.get('take') || '20')

    const campaigns = await prisma.campaign.findMany({
      skip,
      take,
      include: { donations: { include: { donations: true } } },
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.campaign.count()

    const enriched = campaigns.map(campaign => {
      const totalRaised = campaign.donations.reduce((sum, cd) => sum + (cd.donations?.amount || 0), 0)
      const progressPercentage = campaign.goalAmount > 0 ? (totalRaised / campaign.goalAmount) * 100 : 0
      const donorCount = new Set(campaign.donations.map(cd => cd.donations?.donorId)).size

      return {
        ...campaign,
        totalRaised,
        progressPercentage,
        donorCount,
      }
    })

    return NextResponse.json({ campaigns: enriched, total, skip, take })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { name, description, goalAmount, startDate, endDate, status } = await request.json()

    if (!name || !goalAmount) {
      return NextResponse.json({ error: 'Name and goal amount required' }, { status: 400 })
    }

    const campaign = await prisma.campaign.create({
      data: {
        name,
        description,
        goalAmount: parseFloat(goalAmount),
        startDate: startDate ? new Date(startDate) : new Date(),
        endDate: endDate ? new Date(endDate) : null,
        status: status || 'active',
      },
    })

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
