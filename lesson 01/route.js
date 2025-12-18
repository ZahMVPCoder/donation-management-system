// Activity 1: POST Donation - Build It Together
// Starter Code

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {

    try {
        // TODO: Extract amount, donorId, and optional campaignId from request body

        // TODO: Add validation checks:
        // - Is amount a positive number?
        // - Is donorId provided?
        // - Write a console.log for each validation that fails

        // TODO: Use Prisma to check if the donor exists

        // TODO: If campaignId is provided, verify the campaign exists

        // TODO: Create the donation using prisma.donation.create()

        // TODO: Return 201 status with the created donation

    } catch (error) {
        console.error('Error creating donation:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Success Criteria:
// - [ ] POST request with valid data creates donation
// - [ ] Invalid donor ID returns 404 with clear message
// - [ ] Negative amount is rejected
// - [ ] Missing required fields return 400 error