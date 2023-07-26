/*
  Warnings:

  - You are about to drop the `Objects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Places` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Objects" DROP CONSTRAINT "Objects_userId_fkey";

-- DropForeignKey
ALTER TABLE "Places" DROP CONSTRAINT "Places_userId_fkey";

-- DropTable
DROP TABLE "Objects";

-- DropTable
DROP TABLE "Places";

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Object" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectOnPlaces" (
    "objectId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "ObjectOnPlaces_pkey" PRIMARY KEY ("objectId","placeId")
);

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Object" ADD CONSTRAINT "Object_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectOnPlaces" ADD CONSTRAINT "ObjectOnPlaces_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "Object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObjectOnPlaces" ADD CONSTRAINT "ObjectOnPlaces_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
