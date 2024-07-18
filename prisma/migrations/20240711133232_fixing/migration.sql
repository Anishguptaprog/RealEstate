/*
  Warnings:

  - You are about to drop the column `beadrooms` on the `PropertyFeature` table. All the data in the column will be lost.
  - You are about to drop the column `parking` on the `PropertyFeature` table. All the data in the column will be lost.
  - Added the required column `bedrooms` to the `PropertyFeature` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parkingSpots` to the `PropertyFeature` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PropertyFeature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bedrooms" INTEGER NOT NULL,
    "bathrooms" INTEGER NOT NULL,
    "parkingSpots" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "hasSwimmingPool" BOOLEAN NOT NULL,
    "hasGardenYard" BOOLEAN NOT NULL,
    "hasBalcony" BOOLEAN NOT NULL,
    "propertyId" INTEGER NOT NULL,
    CONSTRAINT "PropertyFeature_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PropertyFeature" ("area", "bathrooms", "hasBalcony", "hasGardenYard", "hasSwimmingPool", "id", "propertyId") SELECT "area", "bathrooms", "hasBalcony", "hasGardenYard", "hasSwimmingPool", "id", "propertyId" FROM "PropertyFeature";
DROP TABLE "PropertyFeature";
ALTER TABLE "new_PropertyFeature" RENAME TO "PropertyFeature";
CREATE UNIQUE INDEX "PropertyFeature_propertyId_key" ON "PropertyFeature"("propertyId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
