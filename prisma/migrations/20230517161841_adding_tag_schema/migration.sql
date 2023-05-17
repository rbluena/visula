/*
  Warnings:

  - Added the required column `contentManagementSystem` to the `project_settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project_schema" ADD COLUMN     "tag" TEXT;

-- AlterTable
ALTER TABLE "project_settings" DROP COLUMN "contentManagementSystem",
ADD COLUMN     "contentManagementSystem" JSONB NOT NULL;
