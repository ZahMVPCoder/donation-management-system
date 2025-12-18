# Quick Start Guide

Get DonationHub running in 5 minutes!

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Generate Prisma Client
```bash
npm run prisma:generate
```

## Step 3: Set Up Database
```bash
npm run prisma:migrate
```
When prompted for a migration name, just press Enter or type "init"

## Step 4: Start Development Server
```bash
npm run dev
```

## Step 5: Open in Browser
Navigate to: **http://localhost:3000**

---

## 🎯 What You Can Do Now

### Home Page (`/`)
- Overview of DonationHub features
- Quick links to main screens
- Feature highlights

### Dashboard (`/dashboard`)
- View key fundraising metrics
- See recent donation activity
- Check monthly progress

### Donors (`/donors`)
- Search and browse all donors
- Click on a donor to view details
- Add new donor: Click "Add Donor" button
- Edit donor: Go to donor profile → Click "Edit"
- View donation history for each donor

### Log Donation (`/donations/new`)
- Record a new donation
- Select donor from list (with search)
- Choose donation method
- Link to campaign (optional)
- Auto-creates thank-you task

### Campaigns (`/campaigns`)
- View all fundraising campaigns
- See campaign progress
- Click on campaign for details
- View top donors for each campaign

### Tasks (`/tasks`)
- View all follow-up tasks
- Tasks grouped by urgency
- Check off completed tasks
- See tasks linked to donors

---

## 📊 Sample Data

The database is currently empty. To add sample data:

1. Go to `/donors/new` and create a donor
2. Go to `/donations/new` and log a donation
3. Go to `/campaigns` (no campaigns yet - create form coming soon)
4. Check `/tasks` to see auto-generated thank-you task

---

## 🔑 Key Features to Try

### Donor Search
- Go to `/donors`
- Type in the search box to filter by name, email, or phone
- Results update in real-time

### Donor Profile Notes
- Go to `/donors` and click on any donor
- Click "Edit" on the notes section
- Save your changes

### Task Completion
- Go to `/tasks`
- Check the checkbox next to a task to mark it complete
- Overdue tasks appear in red

---

## 💡 Tips

- **Email must be unique** when adding donors
- **Donations auto-create thank-you tasks** - check `/tasks` after logging a donation
- **Click on donor names** in tables to view their full profile
- **All changes save to the database** - refresh to confirm

---

## 🛠️ Helpful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# View database with Prisma Studio
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

---

## 📍 Next Steps

After exploring the features:

1. **Add sample data** - Create donors and donations to see the system in action
2. **Check the dashboard** - After adding donations, view metrics
3. **Create campaigns** - Campaign creation form coming soon
4. **Explore the codebase** - See `README.md` for architecture details

---

## ❓ Troubleshooting

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Database issues?**
```bash
# Reset everything
npx prisma migrate reset
npm run prisma:generate
npm run dev
```

**Module not found?**
```bash
npm install
npm run prisma:generate
```

---

## 📚 Full Documentation

See `README.md` for comprehensive documentation including:
- Project structure
- API routes documentation
- Database schema details
- Development guidelines

Enjoy DonationHub! 🚀
