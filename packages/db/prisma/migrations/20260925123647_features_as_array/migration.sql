/*
  Warnings:

  - The `features` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "parcelId" SET DATA TYPE TEXT,
DROP COLUMN "features",
ADD COLUMN     "features" TEXT[];
