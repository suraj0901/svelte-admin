/*
  Warnings:

  - Added the required column `published` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL
);
INSERT INTO "new_Post" ("body", "date", "id", "image", "title") SELECT "body", "date", "id", "image", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
