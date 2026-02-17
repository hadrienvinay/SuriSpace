/*
  Warnings:

  - You are about to drop the column `dividend` on the `Action` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "dividend",
ADD COLUMN     "dividendYield" DOUBLE PRECISION;
