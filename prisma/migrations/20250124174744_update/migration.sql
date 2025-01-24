/*
  Warnings:

  - The values [REEF] on the enum `AutoAlgaeIntakeLocation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AutoAlgaeIntakeLocation_new" AS ENUM ('REEF1', 'REEF2', 'REEF3', 'REEF4', 'REEF5', 'REEF6', 'GROUND1', 'GROUND2', 'GROUND3');
ALTER TABLE "AutoAlgaeScoringEvent" ALTER COLUMN "intakeLocation" TYPE "AutoAlgaeIntakeLocation_new" USING ("intakeLocation"::text::"AutoAlgaeIntakeLocation_new");
ALTER TYPE "AutoAlgaeIntakeLocation" RENAME TO "AutoAlgaeIntakeLocation_old";
ALTER TYPE "AutoAlgaeIntakeLocation_new" RENAME TO "AutoAlgaeIntakeLocation";
DROP TYPE "AutoAlgaeIntakeLocation_old";
COMMIT;

-- AlterTable
ALTER TABLE "_EventToTeam" ADD CONSTRAINT "_EventToTeam_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_EventToTeam_AB_unique";
