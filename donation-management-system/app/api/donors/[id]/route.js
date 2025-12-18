import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
  try {
    const donor = await prisma.donor.findUnique({
      where: { id: params.id },
      include: {
        donations: { include: { campaigns: true }, orderBy: { date: 'desc' } },
      },
    })

    if (!donor) {
      return NextResponse.json({ error: 'Donor not found' }, { status: 404 })
    }

    const totalGiving = donor.donations.reduce((sum, d) => sum + d.amount, 0)
    const lastDonation = donor.donations[0]
    const daysSinceLastGift = lastDonation
      ? Math.floor((Date.now() - lastDonation.date.getTime()) / (1000 * 60 * 60 * 24))
      : null

    let status = 'inactive'
    if (daysSinceLastGift !== null) {
      status = daysSinceLastGift <= 90 ? 'active' : 'lapsed'
    }

    return NextResponse.json({
      ...donor,
      totalGiving,
      lastGiftDate: lastDonation?.date || null,
      status,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { firstName, lastName, email, phone, streetAddress, city, state, zipCode, preferredContactMethod, notes } = await request.json()

    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const donor = await prisma.donor.update({
      where: { id: params.id },
      data: { firstName, lastName, email, phone, streetAddress, city, state, zipCode, preferredContactMethod, notes },
    })

    return NextResponse.json(donor)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.donor.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

