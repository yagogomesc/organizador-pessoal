/*
  Warnings:

  - Added the required column `noteDate` to the `Calendar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Calendar" ADD COLUMN     "noteDate" TIMESTAMP(3) NOT NULL;
