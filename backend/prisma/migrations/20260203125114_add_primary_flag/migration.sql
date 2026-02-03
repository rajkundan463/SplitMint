-- DropIndex
DROP INDEX "Participant_groupId_idx";

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false;
