#  SplitMint – Smart Expense Splitting Backend

SplitMint is a production-style backend system designed to simplify group expense management.  
It allows users to track shared expenses, compute balances, and generate optimized settlement suggestions with minimal transactions.

Built with a scalable architecture, SplitMint demonstrates real-world backend engineering practices including financial calculations, RESTful API design, search & filtering, and analytics.

---

## Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Prisma ORM**
- **JWT Authentication**
- **REST API Architecture**

---

## Core Features

> Secure Authentication  
> Group & Participant Management  
> Smart Expense Splitting (Equal / Custom / Percentage)  
> Automated Balance Calculation  
> Minimal Settlement Algorithm  
> Analytics Dashboard  
> Advanced Search & Filters  
> Pagination & Sorting  
> Financial Data Integrity  

---

# Base URL

/api/v1


---

# Authentication Routes

### Register User
POST /api/v1/auth/register


**Body**
```json
{
  "email": "test@example.com",
  "password": "password123"
}

Login
POST /api/v1/auth/login
Returns JWT token for authenticated requests.

Get Current User  Recommended
GET /api/v1/auth/me
Returns logged-in user details.

👥 Group Routes
Create Group
POST /api/v1/groups
Get User Groups
GET /api/v1/groups
Update Group
PATCH /api/v1/groups/:groupId
Delete Group
DELETE /api/v1/groups/:groupId
Cascade deletes participants, expenses, and shares.

👤 Participant Routes (Nested)
Participants belong to a group.

Add Participant
POST /api/v1/groups/:groupId/participants
Update Participant
PATCH /api/v1/groups/:groupId/participants/:participantId
Remove Participant
DELETE /api/v1/groups/:groupId/participants/:participantId
 Expense Routes
Create Expense
POST /api/v1/expenses
Supports:

Equal Split

Custom Amount

Percentage Split

Update Expense
PATCH /api/v1/expenses/:expenseId
Automatically recalculates balances.

Delete Expense
DELETE /api/v1/expenses/:expenseId
Balances update dynamically.

🔎 Search & Filter Expenses
Get Group Expenses
GET /api/v1/groups/:groupId/expenses
Query Parameters
Parameter	Description
search	Search by description
participantId	Filter by participant
startDate	Filter from date
endDate	Filter to date
minAmount	Minimum expense
maxAmount	Maximum expense
page	Pagination page
limit	Results per page
sortBy	amount / date
order	asc / desc
⚖️ Balance & Settlement
Get Settlement Plan
GET /api/v1/groups/:groupId/settlement
Features:

> Computes net balances
> Identifies who owes whom
> Generates minimal transactions
> Prevents circular payments

📊 Analytics Dashboard
Group Financial Overview
GET /api/v1/groups/:groupId/dashboard
Returns:

Total spent

Amount owed / receivable

Participant contributions

Spending percentages

Directional balances

Transaction history

Share breakdown

Designed for real-time UI dashboards.

🧮 Settlement Algorithm
SplitMint uses a greedy optimization algorithm to reduce the number of payments required to settle debts.

Goal:
Minimize total transactions while maintaining financial correctness.

Example:

Instead of:

A → B  
B → C  
C → A
System simplifies to:

B → A  
C → A
🏗️ Architecture Highlights
Modular folder structure

Separation of business logic

Query vs command handling

Stateless balance computation

Indexed database queries

Consistent REST patterns

🔒 Security Practices
> JWT-based authentication
> Protected routes
> Environment-based configuration
> Input validation
> Error handling middleware

🚀 Future Enhancements
Settle-Up Payments

Recurring Expenses

AI Expense Parsing

Redis Caching

Export Reports

Mobile-ready APIs

👨‍💻 Why This Project Stands Out
Unlike basic CRUD apps, SplitMint demonstrates:

Financial system design

Algorithmic optimization

Data aggregation

Scalable backend patterns

This project reflects production-level backend thinking suitable for real-world fintech-style applications.

⚙️ Running Locally
Install dependencies
npm install
Setup environment variables
Create .env

DATABASE_URL=your_db_url
JWT_SECRET=your_secret
Run migrations
npx prisma migrate dev
Start server
npm run dev
⭐ If You Found This Useful
Give the repo a star ⭐


---

# 👑 Honest Advice (VERY Important)

After pushing this README…

👉 Your GitHub instantly looks **10x more professional.**

Recruiters LOVE structured projects.

Most candidates write:

Expense tracker backend


💀

You won’t.

---

# 🔥 One SMALL Upgrade I Recommend

At the top of README later add:

## 👉 Architecture Diagram (optional)

Even a simple one boosts credibility massively.

Tell me — I can generate one for you in 30 seconds.

---

# 🚀 FINAL QUESTION (Important)

Before you push…

Have you added:

👉 `.env` to `.gitignore` ?

If not — DO IT NOW.

Never leak secrets.

Senior reflex.

---

Next step after pushing?

Tell me.

Because I want to guide you VERY smartly into frontend so your project looks **top 5% in placements.**
