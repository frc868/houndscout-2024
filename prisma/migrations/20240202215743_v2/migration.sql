/*
  Warnings:

  - The values [CHUTE,SHELF] on the enum `IntakeLocation` will be removed. If these variants are still used in the database, this will fail.
  - The values [HIGH,MID,HYBRID] on the enum `ScoringPosition` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `gamePiece` on the `AutoScoringEvent` table. All the data in the column will be lost.
  - You are about to drop the column `interaction` on the `ChargeStationAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `presetPiece1` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `presetPiece2` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `presetPiece3` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `presetPiece4` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `preloadPiece` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the column `gamePiece` on the `TeleopScoringEvent` table. All the data in the column will be lost.
  - Added the required column `area` to the `ChargeStationAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harmony` to the `ChargeStationAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trap` to the `ChargeStationAttempt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bluePreset1` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bluePreset2` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bluePreset3` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redPreset1` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redPreset2` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `redPreset3` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StageInteractionArea" AS ENUM ('LEFT', 'RIGHT', 'CENTER', 'NONE');

-- CreateEnum
CREATE TYPE "StageInteractionHarmony" AS ENUM ('PARK', 'NONE', 'ONE', 'TWO');

-- CreateEnum
CREATE TYPE "StageInteractionTrap" AS ENUM ('ATTEMPTED', 'SUCCESS');

-- AlterEnum
BEGIN;
CREATE TYPE "IntakeLocation_new" AS ENUM ('GROUND', 'SOURCE');
ALTER TABLE "TeleopScoringEvent" ALTER COLUMN "intakeLocation" TYPE "IntakeLocation_new" USING ("intakeLocation"::text::"IntakeLocation_new");
ALTER TYPE "IntakeLocation" RENAME TO "IntakeLocation_old";
ALTER TYPE "IntakeLocation_new" RENAME TO "IntakeLocation";
DROP TYPE "IntakeLocation_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ScoringPosition_new" AS ENUM ('SPEAKER', 'AMP');
ALTER TABLE "AutoScoringEvent" ALTER COLUMN "scoringPosition" TYPE "ScoringPosition_new" USING ("scoringPosition"::text::"ScoringPosition_new");
ALTER TABLE "TeleopScoringEvent" ALTER COLUMN "scoringPosition" TYPE "ScoringPosition_new" USING ("scoringPosition"::text::"ScoringPosition_new");
ALTER TYPE "ScoringPosition" RENAME TO "ScoringPosition_old";
ALTER TYPE "ScoringPosition_new" RENAME TO "ScoringPosition";
DROP TYPE "ScoringPosition_old";
COMMIT;

-- AlterTable
ALTER TABLE "AutoScoringEvent" DROP COLUMN "gamePiece";

-- AlterTable
ALTER TABLE "ChargeStationAttempt" DROP COLUMN "interaction",
ADD COLUMN     "area" "StageInteractionArea" NOT NULL,
ADD COLUMN     "harmony" "StageInteractionHarmony" NOT NULL,
ADD COLUMN     "trap" "StageInteractionTrap" NOT NULL;

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "presetPiece1",
DROP COLUMN "presetPiece2",
DROP COLUMN "presetPiece3",
DROP COLUMN "presetPiece4",
ADD COLUMN     "bluePreset1" TEXT NOT NULL,
ADD COLUMN     "bluePreset2" TEXT NOT NULL,
ADD COLUMN     "bluePreset3" TEXT NOT NULL,
ADD COLUMN     "redPreset1" TEXT NOT NULL,
ADD COLUMN     "redPreset2" TEXT NOT NULL,
ADD COLUMN     "redPreset3" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeamScore" DROP COLUMN "preloadPiece";

-- AlterTable
ALTER TABLE "TeleopScoringEvent" DROP COLUMN "gamePiece";

-- DropEnum
DROP TYPE "ChargeStationInteraction";

-- DropEnum
DROP TYPE "GamePiece";
