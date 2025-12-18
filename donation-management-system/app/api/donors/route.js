import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('q')
    const skip = parseInt(searchParams.get('skip') || '0')
    const take = parseInt(searchParams.get('take') || '20')

    let where = {}

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }

    const donors = await prisma.donor.findMany({
      where,
      skip,
      take,
      include: { donations: true },
      orderBy: { createdAt: 'desc' },
    })

    const total = await prisma.donor.count({ where })

    const enrichedDonors = donors.map(donor => {
      const lastDonation = donor.donations.sort((a, b) => b.date - a.date)[0]
      const totalGiving = donor.donations.reduce((sum, d) => sum + d.amount, 0)
      const daysSinceLastGift = lastDonation
        ? Math.floor((Date.now() - lastDonation.date.getTime()) / (1000 * 60 * 60 * 24))
        : null

      let donorStatus = 'inactive'
      if (daysSinceLastGift !== null) {
        if (daysSinceLastGift <= 90) donorStatus = 'active'
        else donorStatus = 'lapsed'
      }

      return {
        ...donor,
        lastGiftDate: lastDonation?.date || null,
        totalGiving,
        donorStatus,
      }
    })

    return NextResponse.json({ donors: enrichedDonors, total, skip, take })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone, streetAddress, city, state, zipCode, preferredContactMethod, notes } = await request.json()

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      )
    }

    const existing = await prisma.donor.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }

    const donor = await prisma.donor.create({
      data: { firstName, lastName, email, phone, streetAddress, city, state, zipCode, preferredContactMethod, notes },
    })

    return NextResponse.json(donor, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
