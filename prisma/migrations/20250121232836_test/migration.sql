/*
  Warnings:

  - You are about to drop the column `autoGamePieces` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the column `autoGamePiecesScored` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the column `climbType` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the column `missingAutoGamePieces` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the column `numberRobotsOnChain` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the column `scoredInTrap` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the column `spotlit` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the column `timestampClimbStarted` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the column `underDefense` on the `TeamScore` table. All the data in the column will be lost.
  - You are about to drop the `AutoScoringEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StageAttempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeleopScoringEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AutoCoralIntakeLocation" AS ENUM ('PRELOAD', 'GROUND1', 'GROUND2', 'GROUND3');

-- CreateEnum
CREATE TYPE "AutoAlgaeIntakeLocation" AS ENUM ('REEF', 'GROUND1', 'GROUND2', 'GROUND3');

-- CreateEnum
CREATE TYPE "TeleopCoralIntakeLocation" AS ENUM ('GROUND', 'STATION');

-- CreateEnum
CREATE TYPE "TeleopAlgaeIntakeLocation" AS ENUM ('GROUND', 'REEF');

-- CreateEnum
CREATE TYPE "CoralScoringLevel" AS ENUM ('LEVEL1', 'LEVEL2', 'LEVEL3', 'LEVEL4');

-- CreateEnum
CREATE TYPE "AutoCoralScoringSide" AS ENUM ('SIDE1', 'SIDE2', 'SIDE3', 'SIDE4', 'SIDE5', 'SIDE6');

-- CreateEnum
CREATE TYPE "AlgaeScoringLocation" AS ENUM ('NET', 'PROCESSOR');

-- CreateEnum
CREATE TYPE "EndgameType" AS ENUM ('NONE', 'PARKED', 'SHALLOW', 'DEEP');

-- CreateEnum
CREATE TYPE "Result" AS ENUM ('WIN', 'TIE', 'LOSS');

-- DropForeignKey
ALTER TABLE "AutoScoringEvent" DROP CONSTRAINT "AutoScoringEvent_teamScoreId_fkey";

-- DropForeignKey
ALTER TABLE "StageAttempt" DROP CONSTRAINT "StageAttempt_teamScoreId_fkey";

-- DropForeignKey
ALTER TABLE "TeleopScoringEvent" DROP CONSTRAINT "TeleopScoringEvent_teamScoreId_fkey";

-- AlterTable
ALTER TABLE "TeamScore" DROP COLUMN "autoGamePieces",
DROP COLUMN "autoGamePiecesScored",
DROP COLUMN "climbType",
DROP COLUMN "missingAutoGamePieces",
DROP COLUMN "numberRobotsOnChain",
DROP COLUMN "scoredInTrap",
DROP COLUMN "spotlit",
DROP COLUMN "timestampClimbStarted",
DROP COLUMN "underDefense",
ADD COLUMN     "endgameSuccess" BOOLEAN DEFAULT false,
ADD COLUMN     "endgameType" "EndgameType",
ADD COLUMN     "result" "Result";

-- DropTable
DROP TABLE "AutoScoringEvent";

-- DropTable
DROP TABLE "StageAttempt";

-- DropTable
DROP TABLE "TeleopScoringEvent";

-- DropEnum
DROP TYPE "AutoGamePiece";

-- DropEnum
DROP TYPE "ClimbType";

-- DropEnum
DROP TYPE "IntakeLocation";

-- DropEnum
DROP TYPE "ScoringLocation";

-- CreateTable
CREATE TABLE "AutoCoralScoringEvent" (
    "id" SERIAL NOT NULL,
    "intakeLocation" "AutoCoralIntakeLocation" NOT NULL,
    "scoringLevel" "CoralScoringLevel",
    "scoringSide" "AutoCoralScoringSide",
    "dropped" BOOLEAN NOT NULL DEFAULT false,
    "failedScoring" BOOLEAN NOT NULL DEFAULT false,
    "timestampPickedUp" DECIMAL(65,30) NOT NULL,
    "timestampScored" DECIMAL(65,30) NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "AutoCoralScoringEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoAlgaeScoringEvent" (
    "id" SERIAL NOT NULL,
    "intakeLocation" "AutoAlgaeIntakeLocation" NOT NULL,
    "scoringLocation" "AlgaeScoringLocation",
    "dropped" BOOLEAN NOT NULL DEFAULT false,
    "failedScoring" BOOLEAN NOT NULL DEFAULT false,
    "timestampPickedUp" DECIMAL(65,30) NOT NULL,
    "timestampScored" DECIMAL(65,30) NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "AutoAlgaeScoringEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeleopCoralScoringEvent" (
    "id" SERIAL NOT NULL,
    "intakeLocation" "TeleopCoralIntakeLocation" NOT NULL,
    "scoringLocation" "CoralScoringLevel",
    "dropped" BOOLEAN NOT NULL DEFAULT false,
    "failedScoring" BOOLEAN NOT NULL DEFAULT false,
    "timestampPickedUp" DECIMAL(65,30) NOT NULL,
    "timestampScored" DECIMAL(65,30) NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "TeleopCoralScoringEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeleopAlgaeScoringEvent" (
    "id" SERIAL NOT NULL,
    "intakeLocation" "TeleopAlgaeIntakeLocation" NOT NULL,
    "scoringLocation" "AlgaeScoringLocation",
    "dropped" BOOLEAN NOT NULL DEFAULT false,
    "failedScoring" BOOLEAN NOT NULL DEFAULT false,
    "timestampPickedUp" DECIMAL(65,30) NOT NULL,
    "timestampScored" DECIMAL(65,30) NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "TeleopAlgaeScoringEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AutoCoralScoringEvent" ADD CONSTRAINT "AutoCoralScoringEvent_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoAlgaeScoringEvent" ADD CONSTRAINT "AutoAlgaeScoringEvent_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeleopCoralScoringEvent" ADD CONSTRAINT "TeleopCoralScoringEvent_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeleopAlgaeScoringEvent" ADD CONSTRAINT "TeleopAlgaeScoringEvent_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
