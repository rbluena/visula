/*
  Warnings:

  - You are about to drop the column `projectSettingId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the `schema_history` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `project_settings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_projectSettingId_fkey";

-- AlterTable
ALTER TABLE "project_settings" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "projectSettingId";

-- DropTable
DROP TABLE "schema_history";

-- CreateTable
CREATE TABLE "project_schema" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "versionDescription" TEXT,
    "checksum" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_schema_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_settings" ADD CONSTRAINT "project_settings_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_schema" ADD CONSTRAINT "project_schema_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
