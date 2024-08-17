-- CreateEnum
CREATE TYPE "OwnerShip" AS ENUM ('Owner', 'Lease', 'Sharing');

-- CreateEnum
CREATE TYPE "FarmerType" AS ENUM ('Subsistence', 'Commercial');

-- CreateEnum
CREATE TYPE "CropType" AS ENUM ('Grain', 'Fruit', 'Vegetable');

-- CreateEnum
CREATE TYPE "LiveStockType" AS ENUM ('Goat', 'Cattle', 'Poultry', 'Aquatic');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FARMER', 'DISTRIBUTOR', 'SUPERUSER');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('ACCEPTED', 'INPROGRESS', 'REJECTED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "dob" TEXT,
    "age" INTEGER,
    "gender" "Gender",
    "phone" TEXT,
    "address" TEXT,
    "nationalId" TEXT,
    "farmSize" DOUBLE PRECISION,
    "coordinates" TEXT,
    "landOwnership" "OwnerShip",
    "farmerType" "FarmerType",
    "cropType" "CropType",
    "livestockType" "LiveStockType",
    "livestockNumber" INTEGER,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,
    "locationId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inputs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "inputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignedinputs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "received" BOOLEAN NOT NULL DEFAULT false,
    "payback" DOUBLE PRECISION,
    "quantity" DOUBLE PRECISION NOT NULL,
    "inputId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "assignedinputs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "input_applications" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,
    "status" "ApplicationStatus" NOT NULL,
    "message" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "inputId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "input_applications_pkey" PRIMARY KEY ("id")
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

-- CreateIndex
CREATE UNIQUE INDEX "locations_name_key" ON "locations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inputs" ADD CONSTRAINT "inputs_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedinputs" ADD CONSTRAINT "assignedinputs_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "inputs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedinputs" ADD CONSTRAINT "assignedinputs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "input_applications" ADD CONSTRAINT "input_applications_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "inputs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "input_applications" ADD CONSTRAINT "input_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedbackMessages" ADD CONSTRAINT "feedbackMessages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
