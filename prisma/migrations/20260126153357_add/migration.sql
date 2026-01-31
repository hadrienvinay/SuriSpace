-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tag" TEXT,
    "link" TEXT,
    "image" TEXT,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
