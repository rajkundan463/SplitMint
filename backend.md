#  SplitMint Backend

SplitMint is a production-style expense splitting backend built to simulate real-world financial systems. 
It enables users to manage group expenses, calculate balances automatically, and generate optimized settlement plans.

---

##  Project Highlights
- Secure JWT Authentication
- RESTful API Architecture
- Smart Expense Splitting (Equal / Custom / Percentage)
- Automatic Balance Engine
- Minimal Settlement Algorithm
- Analytics Dashboard
- Advanced Search & Filters
- Pagination & Sorting
- Cascade-safe relational design

---

#  API Routes

**Base URL:** `/api/v1`

---

##  Authentication
POST   /auth/register        → Register a new user  
POST   /auth/login           → Login and receive JWT token  
GET    /auth/me              → Get current authenticated user  

---

##  Groups
POST   /groups               → Create a group  
GET    /groups               → Get all user groups  
PATCH  /groups/:groupId      → Update group details  
DELETE /groups/:groupId      → Delete group (cascade supported)  

### Group Intelligence
GET /groups/:groupId/dashboard   → Financial analytics & insights  
GET /groups/:groupId/settlement  → Optimized debt settlement  

---

##  Participants (Nested)
POST   /groups/:groupId/participants                     → Add participant  
PATCH  /groups/:groupId/participants/:participantId      → Update participant  
DELETE /groups/:groupId/participants/:participantId      → Remove participant  

---

##  Expenses
POST   /expenses                → Create expense  
PATCH  /expenses/:expenseId     → Update expense  
DELETE /expenses/:expenseId     → Delete expense  

Supports:
- Equal split
- Custom amounts
- Percentage-based splits

Balances update automatically after any modification.

---

##  Search & Filters
GET /groups/:groupId/expenses

Query Options:
- search
- participantId
- startDate
- endDate
- minAmount
- maxAmount
- page
- limit
- sortBy (amount/date)
- order (asc/desc)

Filters can be combined for advanced querying.

---

##  Balance & Settlement Engine
Computes who owes whom and minimizes the number of transactions using a greedy algorithm.

Example:
Instead of:
A → B  
B → C  
C → A  

System simplifies to:
B → A  
C → A  

---

##  Analytics Dashboard
GET /groups/:groupId/dashboard

Provides:
- Total spending
- Amount owed / receivable
- Participant contributions
- Spending percentages
- Directional balances
- Transaction history
- Share breakdown

---

#  Backend Architecture

modules/
├── auth  
├── groups  
├── participants  
├── expenses  
├── balance  
├── analytics  

Key Engineering Decisions:
- Stateless balance computation
- Separation of query vs business logic
- Nested resource design
- Indexed database queries
- Financial rounding safety

---

#  Security
- JWT-based authentication
- Protected routes
- Environment-based configs
- Global error handling
- Input validation

---

#  Running Locally

Install dependencies:
npm install

Setup `.env`:
DATABASE_URL=your_database_url  
JWT_SECRET=your_secret  

Run migrations:
npx prisma migrate dev

Start server:
npm run dev

---

#  Why This Project Stands Out
Unlike basic CRUD apps, SplitMint demonstrates:
- Financial system design
- Algorithmic optimization
- Data aggregation
- Scalable backend structure

This reflects production-level backend thinking suitable for fintech-style applications.
