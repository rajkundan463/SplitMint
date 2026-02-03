-- CreateEnum
CREATE TYPE "SplitType" AS ENUM ('EQUAL', 'CUSTOM', 'PERCENT');

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "splitType" "SplitType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" TEXT NOT NULL,
    "payerId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseShare" (
    "id" TEXT NOT NULL,
    "shareAmount" DOUBLE PRECISION NOT NULL,
    "percentage" DOUBLE PRECISION,
    "expenseId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,

    CONSTRAINT "ExpenseShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Group_createdById_idx" ON "Group"("createdById");

-- CreateIndex
CREATE INDEX "Participant_groupId_idx" ON "Participant"("groupId");

-- CreateIndex
CREATE INDEX "Expense_groupId_idx" ON "Expense"("groupId");

-- CreateIndex
CREATE INDEX "Expense_payerId_idx" ON "Expense"("payerId");

-- CreateIndex
CREATE INDEX "ExpenseShare_participantId_idx" ON "ExpenseShare"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseShare_expenseId_participantId_key" ON "ExpenseShare"("expenseId", "participantId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payerId_fkey" FOREIGN KEY ("payerId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseShare" ADD CONSTRAINT "ExpenseShare_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseShare" ADD CONSTRAINT "ExpenseShare_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
