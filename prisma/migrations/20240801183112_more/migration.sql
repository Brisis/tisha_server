/*
  Warnings:

  - You are about to drop the column `amount` on the `inputs` table. All the data in the column will be lost.
  - Added the required column `payback` to the `inputs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantiy` to the `inputs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `inputs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmSize` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "inputs" DROP COLUMN "amount",
ADD COLUMN     "locationId" TEXT,
ADD COLUMN     "payback" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantiy" INTEGER NOT NULL,
ADD COLUMN     "unit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "coordinates" TEXT,
ADD COLUMN     "farmSize" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "inputs" ADD CONSTRAINT "inputs_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
