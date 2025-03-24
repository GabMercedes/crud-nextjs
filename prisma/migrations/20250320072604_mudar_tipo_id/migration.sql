/*
  Warnings:

  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Usuario" ("ativo", "email", "id", "nome", "senha") SELECT "ativo", "email", "id", "nome", "senha" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
