-- CreateEnum
CREATE TYPE "OwnerShip" AS ENUM ('Owner', 'Lease', 'Sharing');

-- CreateEnum
CREATE TYPE "FarmerType" AS ENUM ('Subsistence', 'Commercial');

-- CreateEnum
CREATE TYPE "CropType" AS ENUM ('Grain', 'Fruit', 'Vegetable');

-- CreateEnum
CREATE TYPE "LiveStockType" AS ENUM ('Goat', 'Cattle', 'Poultry', 'Aquatic');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "inputs" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "cropType" "CropType",
ADD COLUMN     "dob" TIMESTAMP(3),
ADD COLUMN     "farmerType" "FarmerType",
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "landOwnership" "OwnerShip",
ADD COLUMN     "livestockNumber" INTEGER,
ADD COLUMN     "livestockType" "LiveStockType",
ADD COLUMN     "nationalId" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "surname" TEXT;

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "inputId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedbackMessages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "feedbackMessages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "inputs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbackMessages" ADD CONSTRAINT "feedbackMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
