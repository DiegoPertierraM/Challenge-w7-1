/*
  Warnings:

  - You are about to drop the column `year` on the `Song` table. All the data in the column will be lost.
  - Added the required column `description` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "year",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL;
