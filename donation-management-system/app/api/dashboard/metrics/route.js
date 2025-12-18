import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const donations = await prisma.donation.findMany({
      where: { date: { gte: startOfMonth } },
      include: { donor: true },
    })

    const totalRaisedThisMonth = donations.reduce((sum, d) => sum + d.amount, 0)

    const goal = await prisma.goal.findFirst({
      where: { year: now.getFullYear(), month: now.getMonth() + 1 },
    })

    const monthlyGoal = goal?.monthlyGoal || 0
    const progressPercentage = monthlyGoal > 0 ? (totalRaisedThisMonth / monthlyGoal) * 100 : 0

    const newDonors = await prisma.donor.findMany({
      where: { createdAt: { gte: startOfMonth } },
    })

    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    const allDonors = await prisma.donor.findMany({
      include: { donations: { where: { date: { lt: ninetyDaysAgo } } } },
    })

    const lapsedDonors = allDonors.filter(d => d.donations.length > 0 && !donations.some(donation => donation.donorId === d.id))

    const avgGiftSize = donations.length > 0 ? totalRaisedThisMonth / donations.length : 0

    const recentDonations = donations.sort((a, b) => b.date - a.date).slice(0, 10)
    const recentActivity = recentDonations.map(d => ({
      id: d.id,
      type: 'donation',
      donorId: d.donorId,
      donorName: `${d.donor.firstName} ${d.donor.lastName}`,
      amount: d.amount,
      date: d.date,
      campaign: d.campaignId ? 'Campaign' : 'General',
    }))

    return NextResponse.json({
      metrics: {
        totalRaised: totalRaisedThisMonth,
        monthlyGoal,
        goalPercentage: Math.round(progressPercentage * 100) / 100,
        newDonors: newDonors.length,
        lapsedDonors: lapsedDonors.length,
        averageGift: Math.round(avgGiftSize * 100) / 100,
        donationCount: donations.length,
      },
      recentActivity,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
