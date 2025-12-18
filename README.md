# API Route Labs

A hands-on learning project for building Next.js API routes with Prisma ORM.

## Overview

This project contains practical exercises for learning how to create RESTful API endpoints in Next.js, with a focus on database operations using Prisma.

## Project Structure

```
API-Route-Labs/
├── lesson 01/
│   └── route.js          # POST endpoint for creating donations
├── package.json
└── README.md
```

## Lessons

### Lesson 01: POST Donation Endpoint

Build a POST API route that handles donation creation with proper validation and database integration.

**Learning Objectives:**
- Extract data from POST request body
- Implement input validation
- Perform database lookups with Prisma
- Handle errors and return appropriate HTTP status codes
- Create database records

**Success Criteria:**
- ✅ POST request with valid data creates donation
- ✅ Invalid donor ID returns 404 with clear message
- ✅ Negative amount is rejected
- ✅ Missing required fields return 400 error

## Getting Started

### Prerequisites

- Node.js installed
- Basic understanding of JavaScript and REST APIs
- Familiarity with Next.js and Prisma (helpful but not required)

### Installation

```bash
npm install
```

## Tech Stack

- **Next.js** - React framework with API routes
- **Prisma** - Modern database ORM
- **JavaScript** - ES6+ with modern syntax

## Database Schema

The project works with the following entities:
- **Donation** - Records of donations made
- **Donor** - People making donations
- **Campaign** - Optional donation campaigns

## Contributing

This is a learning project. Feel free to experiment and modify the code to enhance your understanding.

## License

ISC
