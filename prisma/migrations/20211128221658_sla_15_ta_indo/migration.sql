-- CreateTable
CREATE TABLE "ToDoList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL,
    "projectId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToDoList" ADD FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
