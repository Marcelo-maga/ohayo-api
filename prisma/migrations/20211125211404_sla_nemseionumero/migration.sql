/*
  Warnings:

  - You are about to drop the `columns` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `toDoList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "columns" DROP CONSTRAINT "columns_toDoListId_fkey";

-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_columnId_fkey";

-- DropForeignKey
ALTER TABLE "toDoList" DROP CONSTRAINT "toDoList_projectId_fkey";

-- DropTable
DROP TABLE "columns";

-- DropTable
DROP TABLE "itens";

-- DropTable
DROP TABLE "toDoList";
