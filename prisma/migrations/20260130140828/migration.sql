/*
  Warnings:

  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "image",
DROP COLUMN "published",
ADD COLUMN     "content2" TEXT,
ADD COLUMN     "image1" TEXT,
ADD COLUMN     "image2" TEXT,
ADD COLUMN     "resume" TEXT;
