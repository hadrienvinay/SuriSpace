/*
  Warnings:

  - You are about to drop the column `image1` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "image1",
ADD COLUMN     "image" TEXT;
