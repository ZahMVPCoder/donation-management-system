const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.campaignDonation.deleteMany();
  await prisma.task.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.donor.deleteMany();
  await prisma.user.deleteMany();

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const testUser = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'User',
      email: 'test@example.com',
      password: hashedPassword,
    },
  });
  console.log('✅ Test user created: test@example.com / password123');

  // Create sample donors
  const donor1 = await prisma.donor.create({
    data: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '555-0101',
      streetAddress: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      preferredContactMethod: 'email',
      notes: 'Major donor, prefers email contact',
    },
  });

  const donor2 = await prisma.donor.create({
    data: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@email.com',
      phone: '555-0102',
      streetAddress: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      preferredContactMethod: 'phone',
      notes: 'Corporate sponsor',
    },
  });

  const donor3 = await prisma.donor.create({
    data: {
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.j@email.com',
      phone: '555-0103',
      streetAddress: '789 Pine Rd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      preferredContactMethod: 'email',
      notes: 'Recurring monthly donor',
    },
  });

  console.log('✅ Created 3 donors');

  // Create sample campaigns
  const campaign1 = await prisma.campaign.create({
    data: {
      name: 'Holiday Drive 2024',
      description: 'Annual holiday fundraising campaign',
      goalAmount: 50000,
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-12-31'),
      status: 'active',
    },
  });

  const campaign2 = await prisma.campaign.create({
    data: {
      name: 'Building Fund',
      description: 'Fundraising for new facility construction',
      goalAmount: 100000,
      startDate: new Date('2024-09-01'),
      endDate: new Date('2025-08-31'),
      status: 'active',
    },
  });

  console.log('✅ Created 2 campaigns');

  // Create sample donations
  const donation1 = await prisma.donation.create({
    data: {
      donorId: donor1.id,
      amount: 1000,
      date: new Date('2024-12-01'),
      method: 'credit_card',
      isRecurring: true,
      recurringFrequency: 'monthly',
      notes: 'Monthly contribution',
    },
  });

  const donation2 = await prisma.donation.create({
    data: {
      donorId: donor2.id,
      amount: 2500,
      date: new Date('2024-12-05'),
      method: 'bank_transfer',
      isRecurring: false,
      notes: 'Year-end gift',
    },
  });

  const donation3 = await prisma.donation.create({
    data: {
      donorId: donor1.id,
      amount: 5000,
      date: new Date('2024-11-15'),
      method: 'check',
      isRecurring: false,
      notes: 'Building fund contribution',
    },
  });

  console.log('✅ Created 3 donations');

  // Link donations to campaigns
  await prisma.campaignDonation.create({
    data: {
      campaignId: campaign1.id,
      donationId: donation1.id,
      amount: 1000,
    },
  });

  await prisma.campaignDonation.create({
    data: {
      campaignId: campaign1.id,
      donationId: donation2.id,
      amount: 2500,
    },
  });

  await prisma.campaignDonation.create({
    data: {
      campaignId: campaign2.id,
      donationId: donation3.id,
      amount: 5000,
    },
  });

  console.log('✅ Created 3 campaign donations');

  // Create sample tasks
  await prisma.task.create({
    data: {
      title: 'Thank You Call - John Smith',
      description: 'Call John to thank for recent $1000 donation',
      taskType: 'thank-you',
      donorId: donor1.id,
      donationId: donation1.id,
      dueDate: new Date('2024-12-08'),
      status: 'open',
    },
  });

  await prisma.task.create({
    data: {
      title: 'Follow-up with Jane Doe',
      description: 'Check in about Building Fund campaign',
      taskType: 'follow-up',
      donorId: donor2.id,
      dueDate: new Date('2024-12-15'),
      status: 'open',
    },
  });

  await prisma.task.create({
    data: {
      title: 'Monthly Renewal Check-in - Michael Johnson',
      description: 'Confirm recurring donation is still active',
      taskType: 'renewal',
      donorId: donor3.id,
      donationId: donation1.id,
      dueDate: new Date('2024-12-20'),
      status: 'open',
    },
  });

  console.log('✅ Created 3 tasks');

  // Create sample goals
  await prisma.goal.create({
    data: {
      monthlyGoal: 10000,
      annualGoal: 120000,
      year: 2024,
    },
  });

  await prisma.goal.create({
    data: {
      monthlyGoal: 12000,
      annualGoal: 150000,
      year: 2025,
    },
  });

  console.log('✅ Created 2 goals');

  console.log('✨ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
