/*
  Warnings:

  - Added the required column `quantity` to the `input_applications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "input_applications" ADD COLUMN     "quantity" DOUBLE PRECISION NOT NULL;
