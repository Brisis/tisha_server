/*
  Warnings:

  - The values [USER,ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `adminId` on the `inputs` table. All the data in the column will be lost.
  - You are about to drop the column `payback` on the `inputs` table. All the data in the column will be lost.
  - You are about to drop the column `received` on the `inputs` table. All the data in the column will be lost.
  - Made the column `locationId` on table `inputs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('FARMER', 'DISTRIBUTOR', 'SUPERUSER');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "inputs" DROP CONSTRAINT "inputs_locationId_fkey";

-- DropForeignKey
ALTER TABLE "inputs" DROP CONSTRAINT "inputs_userId_fkey";

-- AlterTable
ALTER TABLE "inputs" DROP COLUMN "adminId",
DROP COLUMN "payback",
DROP COLUMN "received",
ALTER COLUMN "locationId" SET NOT NULL;

-- CreateTable
CREATE TABLE "assignedinputs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "received" BOOLEAN NOT NULL DEFAULT false,
    "payback" DOUBLE PRECISION NOT NULL,
    "inputId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "assignedinputs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inputs" ADD CONSTRAINT "inputs_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedinputs" ADD CONSTRAINT "assignedinputs_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "inputs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedinputs" ADD CONSTRAINT "assignedinputs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
