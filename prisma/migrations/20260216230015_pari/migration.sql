/*
  Warnings:

  - You are about to drop the column `dividend` on the `Action` table. All the data in the column will be lost.
  - Added the required column `where` to the `Action` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Action" DROP COLUMN "dividend",
ADD COLUMN     "dividendYield" DOUBLE PRECISION,
ADD COLUMN     "user_id" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "where" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Pari" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "sexe" TEXT NOT NULL,
    "poids" TEXT NOT NULL,
    "taille" TEXT NOT NULL,
    "yeux" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "cheveux" TEXT NOT NULL,
    "autres" TEXT,
    "parieurName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pari_pkey" PRIMARY KEY ("id")
);
