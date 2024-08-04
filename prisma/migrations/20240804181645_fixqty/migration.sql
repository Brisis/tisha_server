/*
  Warnings:

  - You are about to drop the column `quantiy` on the `inputs` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `inputs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inputs" DROP COLUMN "quantiy",
ADD COLUMN     "quantity" INTEGER NOT NULL;
