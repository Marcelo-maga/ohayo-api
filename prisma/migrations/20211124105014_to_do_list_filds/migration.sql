-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "refreshToken" (
    "id" SERIAL NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "toDoList" (
    "id" SERIAL NOT NULL,
    "projectId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "columns" (
    "id" SERIAL NOT NULL,
    "nameColumn" TEXT NOT NULL,
    "toDoListId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens" (
    "id" SERIAL NOT NULL,
    "nameIten" TEXT NOT NULL,
    "columnId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refreshToken_userId_unique" ON "refreshToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "toDoList_projectId_unique" ON "toDoList"("projectId");

-- AddForeignKey
ALTER TABLE "refreshToken" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "toDoList" ADD FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "columns" ADD FOREIGN KEY ("toDoListId") REFERENCES "toDoList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD FOREIGN KEY ("columnId") REFERENCES "columns"("id") ON DELETE CASCADE ON UPDATE CASCADE;
