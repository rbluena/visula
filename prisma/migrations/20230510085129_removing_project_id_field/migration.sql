/*
  Warnings:

  - You are about to drop the column `projectId` on the `Projects` table. All the data in the column will be lost.
  - Made the column `name` on table `Projects` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Projects_projectId_key";

-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "projectId",
ALTER COLUMN "name" SET NOT NULL;
