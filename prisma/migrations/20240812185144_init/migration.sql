/*
  Warnings:

  - You are about to drop the `applications` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_inputId_fkey";

-- DropForeignKey
ALTER TABLE "applications" DROP CONSTRAINT "applications_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "dob" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "applications";

-- CreateTable
CREATE TABLE "input_applications" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "inputId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "input_applications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "input_applications" ADD CONSTRAINT "input_applications_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "inputs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "input_applications" ADD CONSTRAINT "input_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
