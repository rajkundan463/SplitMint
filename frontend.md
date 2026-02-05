# SplitMint — Intelligent Expense Splitting Platform

SplitMint is a full-stack expense management application designed to handle real-world financial scenarios such as group spending, debt settlement, and balance minimization.

The project focuses on correctness, scalability, and production-style architecture rather than simple CRUD operations. It demonstrates strong backend design, financial computation logic, and modern frontend engineering practices.

---

## Overview

Managing shared expenses is deceptively complex. Once multiple participants, uneven contributions, percentage splits, and settlement optimization enter the system, naive implementations quickly fail.

SplitMint was built to solve these challenges with:

- Accurate financial calculations
- Deterministic rounding
- Debt minimization
- Participant-based identity modeling
- Transaction-safe operations
- Intelligent UI flows

The system ensures that balances always reconcile and that financial data remains trustworthy.

---

## Key Features

### Authentication
Secure user registration and login with protected routes.

### Group-Based Expense Management
Users can create groups, invite participants, and track shared spending within isolated financial contexts.

Each group maintains its own ledger and settlement graph.

### Participant-Centric Financial Identity
The system distinguishes between **Users** (authentication) and **Participants** (financial entities).

This mirrors real-world fintech architecture and enables:

- Ghost participants (non-registered members)
- Accurate debt ownership
- Flexible group modeling

### Advanced Expense Splitting

Supports three production-grade split strategies:

**Equal Split**
Automatically distributes amounts with deterministic rounding to prevent floating-point drift.

**Custom Split**
Allows precise allocation while enforcing backend validation to guarantee the total matches the expense.

**Percentage Split**
Converts percentages into monetary shares while ensuring the distribution sums exactly to 100%.

All calculations occur server-side to maintain financial integrity.

### Balance Engine

A dedicated balance engine computes:

- Net balances per participant
- Who owes whom
- Exact payable amounts

The system prevents phantom debts and ensures every transaction reconciles.

### Debt Simplification Algorithm

SplitMint minimizes the number of transactions required to settle a group.

Instead of multiple redundant payments, the algorithm restructures obligations into the smallest possible settlement set.

Example:

Rather than:

A → B  
B → C  

The system simplifies to:

A → C  

This improves usability and reflects how modern expense platforms behave.

### Settlement Visualization

Balances are not just computed — they are visualized.

An interactive graph displays:

- Money flow direction
- Debtor → creditor relationships
- Relative payment weights

This provides immediate clarity into group finances.

### Analytics Dashboard

Each group includes a financial dashboard showing:

- Total group spending
- Individual contributions
- Net balances
- Settlement suggestions
- Transaction history

The dashboard derives all values from computed balances, ensuring consistency across the system.

### Transaction Safety

Critical operations use database transactions to prevent partial writes such as:

- Group created without participant
- Expense saved without shares

Financial systems must fail atomically — SplitMint enforces this.

---

## Frontend Architecture

The frontend is built using modern React patterns with a strong emphasis on maintainability and separation of concerns.

### Stack
- React (Vite)
- React Query for server-state management
- Axios for API communication
- Tailwind CSS for structured UI development
- Context API for global group state

### Design Philosophy

The UI avoids unnecessary decoration and focuses on clarity, hierarchy, and usability.

Key principles:

- Server is the source of truth
- Derived state is never duplicated
- Components remain predictable
- Data flows in one direction

### State Strategy

The application separates:

- Server state (React Query)
- UI state (modals, toggles)
- Global workspace state (selected group)

This prevents race conditions and stale financial data.

---

## Backend Highlights (Engineering Depth)

Although this repository focuses on frontend work, the system was designed alongside a production-style backend featuring:

- Prisma ORM with relational modeling
- Transactional writes
- Unique constraints to prevent identity duplication
- Indexed queries for scalability
- Server-side financial computation
- Self-healing participant mapping

The architecture prioritizes correctness over shortcuts.

---

## Financial Accuracy

Handling money requires strict safeguards:

- Decimal storage for currency
- Controlled rounding boundaries
- Backend validation of splits
- Ownership verification for participants
- Group-scoped identity checks

The system is designed to avoid silent inconsistencies — a critical property for fintech-style applications.

---

## Challenges Solved

This project intentionally tackled problems beyond basic application development:

- Modeling financial identities separately from authentication
- Designing a deterministic split engine
- Building a debt minimization algorithm
- Preventing floating-point errors
- Maintaining transactional consistency
- Synchronizing workspace state
- Visualizing settlement flows

These decisions reflect real-world engineering tradeoffs.

---

## Running the Frontend

Install dependencies:

Start the development server:


The application expects a running backend configured via environment variables.

---

## What This Project Demonstrates

This project reflects an engineering mindset focused on building reliable systems rather than feature-heavy prototypes.

It showcases the ability to:

- Design relational data models
- Implement financial logic safely
- Structure scalable React applications
- Maintain separation of concerns
- Think in terms of system guarantees
- Solve non-trivial computational problems

---

## Future Enhancements

Planned directions include:

- Smart split auto-balancing UI
- Recurring expenses
- Payment integrations
- AI-powered expense parsing
- Advanced analytics
- Mobile-responsive optimization

The architecture supports these extensions without major refactoring.

---

## Closing Note

SplitMint was built with the intention of approaching software the way production systems are designed — with careful attention to correctness, structure, and long-term scalability.

Rather than optimizing for visual complexity, the project prioritizes sound engineering decisions and real-world applicability.


