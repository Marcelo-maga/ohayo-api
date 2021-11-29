/*
  Warnings:

  - You are about to alter the column `timeWorked` on the `projects` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `timeWorked` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "timeWorked" SET NOT NULL,
ALTER COLUMN "timeWorked" SET DATA TYPE INTEGER;
