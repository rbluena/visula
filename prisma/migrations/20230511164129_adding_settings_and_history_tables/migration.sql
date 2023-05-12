/*
  Warnings:

  - Added the required column `projectSettingId` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "projectSettingId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "project_settings" (
    "id" TEXT NOT NULL,
    "contentManagementSystem" TEXT,

    CONSTRAINT "project_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_history" (
    "id" TEXT NOT NULL,
    "checksum" TEXT NOT NULL,
    "versionDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schema_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_projectSettingId_fkey" FOREIGN KEY ("projectSettingId") REFERENCES "project_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
