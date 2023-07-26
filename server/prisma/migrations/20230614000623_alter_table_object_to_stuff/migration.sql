/*
  Warnings:

  - You are about to drop the `Object` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ObjectOnPlaces` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Object" DROP CONSTRAINT "Object_userId_fkey";

-- DropForeignKey
ALTER TABLE "ObjectOnPlaces" DROP CONSTRAINT "ObjectOnPlaces_objectId_fkey";

-- DropForeignKey
ALTER TABLE "ObjectOnPlaces" DROP CONSTRAINT "ObjectOnPlaces_placeId_fkey";

-- DropTable
DROP TABLE "Object";

-- DropTable
DROP TABLE "ObjectOnPlaces";

-- CreateTable
CREATE TABLE "Stuff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Stuff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StuffOnPlaces" (
    "stuffId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "StuffOnPlaces_pkey" PRIMARY KEY ("stuffId","placeId")
);

-- AddForeignKey
ALTER TABLE "Stuff" ADD CONSTRAINT "Stuff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StuffOnPlaces" ADD CONSTRAINT "StuffOnPlaces_stuffId_fkey" FOREIGN KEY ("stuffId") REFERENCES "Stuff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StuffOnPlaces" ADD CONSTRAINT "StuffOnPlaces_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
