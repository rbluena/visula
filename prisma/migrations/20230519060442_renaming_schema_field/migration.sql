/*
  Warnings:

  - You are about to drop the column `checksum` on the `project_schema` table. All the data in the column will be lost.
  - You are about to drop the column `versionDescription` on the `project_schema` table. All the data in the column will be lost.
  - You are about to drop the column `contentManagementSystem` on the `project_settings` table. All the data in the column will be lost.
  - Added the required column `data` to the `project_schema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_schema" DROP COLUMN "checksum",
DROP COLUMN "versionDescription",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "project_settings" DROP COLUMN "contentManagementSystem",
ADD COLUMN     "contentManagementSystems" JSONB[];
