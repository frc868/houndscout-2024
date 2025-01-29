/*
  Warnings:

  - You are about to drop the `AutoAlgaeScoringEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AutoCoralScoringEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeleopAlgaeScoringEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeleopCoralScoringEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CoralIntakeLocation" AS ENUM ('AUTOPRELOAD', 'AUTOGROUND1', 'AUTOGROUND2', 'AUTOGROUND3', 'AUTOSTATION1', 'AUTOSTATION2', 'TELEOPGROUND', 'TELEOPSTATION');

-- CreateEnum
CREATE TYPE "AlgaeIntakeLocation" AS ENUM ('AUTOREEF1', 'AUTOREEF2', 'AUTOREEF3', 'AUTOREEF4', 'AUTOREEF5', 'AUTOREEF6', 'AUTOGROUND1', 'AUTOGROUND2', 'AUTOGROUND3', 'TELEOPREEF', 'TELEOPGROUND');

-- CreateEnum
CREATE TYPE "CoralScoringSide" AS ENUM ('SIDE1', 'SIDE2', 'SIDE3', 'SIDE4', 'SIDE5', 'SIDE6');

-- DropForeignKey
ALTER TABLE "AutoAlgaeScoringEvent" DROP CONSTRAINT "AutoAlgaeScoringEvent_teamScoreId_fkey";

-- DropForeignKey
ALTER TABLE "AutoCoralScoringEvent" DROP CONSTRAINT "AutoCoralScoringEvent_teamScoreId_fkey";

-- DropForeignKey
ALTER TABLE "TeleopAlgaeScoringEvent" DROP CONSTRAINT "TeleopAlgaeScoringEvent_teamScoreId_fkey";

-- DropForeignKey
ALTER TABLE "TeleopCoralScoringEvent" DROP CONSTRAINT "TeleopCoralScoringEvent_teamScoreId_fkey";

-- DropTable
DROP TABLE "AutoAlgaeScoringEvent";

-- DropTable
DROP TABLE "AutoCoralScoringEvent";

-- DropTable
DROP TABLE "TeleopAlgaeScoringEvent";

-- DropTable
DROP TABLE "TeleopCoralScoringEvent";

-- DropEnum
DROP TYPE "AutoAlgaeIntakeLocation";

-- DropEnum
DROP TYPE "AutoCoralIntakeLocation";

-- DropEnum
DROP TYPE "AutoCoralScoringSide";

-- DropEnum
DROP TYPE "TeleopAlgaeIntakeLocation";

-- DropEnum
DROP TYPE "TeleopCoralIntakeLocation";

-- CreateTable
CREATE TABLE "CoralScoringEvent" (
    "id" SERIAL NOT NULL,
    "intakeLocation" "CoralIntakeLocation" NOT NULL,
    "scoringLevel" "CoralScoringLevel",
    "scoringSide" "CoralScoringSide",
    "dropped" BOOLEAN NOT NULL DEFAULT false,
    "failedScoring" BOOLEAN NOT NULL DEFAULT false,
    "timestampPickedUp" DECIMAL(65,30) NOT NULL,
    "timestampScored" DECIMAL(65,30) NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "CoralScoringEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlgaeScoringEvent" (
    "id" SERIAL NOT NULL,
    "intakeLocation" "AlgaeIntakeLocation" NOT NULL,
    "scoringLocation" "AlgaeScoringLocation",
    "dropped" BOOLEAN NOT NULL DEFAULT false,
    "failedScoring" BOOLEAN NOT NULL DEFAULT false,
    "timestampPickedUp" DECIMAL(65,30) NOT NULL,
    "timestampScored" DECIMAL(65,30) NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "AlgaeScoringEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoralScoringEvent" ADD CONSTRAINT "CoralScoringEvent_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlgaeScoringEvent" ADD CONSTRAINT "AlgaeScoringEvent_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
