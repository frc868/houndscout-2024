-- CreateEnum
CREATE TYPE "AutoStartingZone" AS ENUM ('ONE', 'TWO', 'THREE');

-- CreateEnum
CREATE TYPE "IntakeLocation" AS ENUM ('GROUND', 'CHUTE', 'SHELF');

-- CreateEnum
CREATE TYPE "IntakeType" AS ENUM ('PRELOAD', 'PRESET');

-- CreateEnum
CREATE TYPE "GamePiece" AS ENUM ('CONE', 'CUBE');

-- CreateEnum
CREATE TYPE "ScoringPosition" AS ENUM ('HIGH', 'MID', 'HYBRID');

-- CreateEnum
CREATE TYPE "ChargeStationInteraction" AS ENUM ('BALANCED', 'DOCKED', 'ATTEMPTED');

-- CreateEnum
CREATE TYPE "Segment" AS ENUM ('AUTO', 'TELEOP');

-- CreateTable
CREATE TABLE "Server" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER,
    "activeMatchId" INTEGER,

    CONSTRAINT "Server_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Heartbeat" (
    "id" SERIAL NOT NULL,
    "station" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "section" TEXT NOT NULL,
    "serverId" INTEGER NOT NULL,

    CONSTRAINT "Heartbeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scouter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Scouter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "eventCode" TEXT NOT NULL,
    "startTime" TIMESTAMP(3),
    "presetPiece1" "GamePiece",
    "presetPiece2" "GamePiece",
    "presetPiece3" "GamePiece",
    "presetPiece4" "GamePiece",
    "red1TeamId" INTEGER NOT NULL,
    "red2TeamId" INTEGER NOT NULL,
    "red3TeamId" INTEGER NOT NULL,
    "blue1TeamId" INTEGER NOT NULL,
    "blue2TeamId" INTEGER NOT NULL,
    "blue3TeamId" INTEGER NOT NULL,
    "red1TeamScoreId" INTEGER NOT NULL,
    "red2TeamScoreId" INTEGER NOT NULL,
    "red3TeamScoreId" INTEGER NOT NULL,
    "blue1TeamScoreId" INTEGER NOT NULL,
    "blue2TeamScoreId" INTEGER NOT NULL,
    "blue3TeamScoreId" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamScore" (
    "id" SERIAL NOT NULL,
    "teamId" INTEGER NOT NULL,
    "preloadPiece" "GamePiece",
    "autoStartingZone" "AutoStartingZone",
    "driverSkillRating" INTEGER,
    "defensePlayedAgainst" INTEGER,
    "scouterId" INTEGER,

    CONSTRAINT "TeamScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AutoScoringEvent" (
    "id" SERIAL NOT NULL,
    "intakeType" "IntakeType" NOT NULL,
    "gamePiece" "GamePiece" NOT NULL,
    "scoringPosition" "ScoringPosition",
    "failed" BOOLEAN NOT NULL DEFAULT false,
    "timestampScored" DECIMAL(65,30) NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "AutoScoringEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeleopScoringEvent" (
    "id" SERIAL NOT NULL,
    "intakeLocation" "IntakeLocation" NOT NULL,
    "gamePiece" "GamePiece" NOT NULL,
    "scoringPosition" "ScoringPosition",
    "dropped" BOOLEAN NOT NULL DEFAULT false,
    "failed" BOOLEAN NOT NULL DEFAULT false,
    "timestampPickedUp" DECIMAL(65,30) NOT NULL,
    "timestampScored" DECIMAL(65,30) NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "TeleopScoringEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChargeStationAttempt" (
    "id" SERIAL NOT NULL,
    "segment" "Segment" NOT NULL,
    "timestampStarted" DECIMAL(65,30) NOT NULL,
    "timestampEnded" DECIMAL(65,30) NOT NULL,
    "numberRobots" INTEGER NOT NULL,
    "interaction" "ChargeStationInteraction" NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "ChargeStationAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncapSegment" (
    "id" SERIAL NOT NULL,
    "timestampStarted" DECIMAL(65,30) NOT NULL,
    "timestampEnded" DECIMAL(65,30) NOT NULL,
    "full" BOOLEAN NOT NULL,
    "teamScoreId" INTEGER NOT NULL,

    CONSTRAINT "IncapSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Heartbeat_station_key" ON "Heartbeat"("station");

-- CreateIndex
CREATE UNIQUE INDEX "Scouter_name_key" ON "Scouter"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Event_code_key" ON "Event"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Team_number_key" ON "Team"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Match_key_key" ON "Match"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Match_red1TeamScoreId_key" ON "Match"("red1TeamScoreId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_red2TeamScoreId_key" ON "Match"("red2TeamScoreId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_red3TeamScoreId_key" ON "Match"("red3TeamScoreId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_blue1TeamScoreId_key" ON "Match"("blue1TeamScoreId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_blue2TeamScoreId_key" ON "Match"("blue2TeamScoreId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_blue3TeamScoreId_key" ON "Match"("blue3TeamScoreId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_name_eventCode_key" ON "Match"("name", "eventCode");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToTeam_AB_unique" ON "_EventToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToTeam_B_index" ON "_EventToTeam"("B");

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Server" ADD CONSTRAINT "Server_activeMatchId_fkey" FOREIGN KEY ("activeMatchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heartbeat" ADD CONSTRAINT "Heartbeat_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_eventCode_fkey" FOREIGN KEY ("eventCode") REFERENCES "Event"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_red1TeamId_fkey" FOREIGN KEY ("red1TeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_red2TeamId_fkey" FOREIGN KEY ("red2TeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_red3TeamId_fkey" FOREIGN KEY ("red3TeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_blue1TeamId_fkey" FOREIGN KEY ("blue1TeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_blue2TeamId_fkey" FOREIGN KEY ("blue2TeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_blue3TeamId_fkey" FOREIGN KEY ("blue3TeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_red1TeamScoreId_fkey" FOREIGN KEY ("red1TeamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_red2TeamScoreId_fkey" FOREIGN KEY ("red2TeamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_red3TeamScoreId_fkey" FOREIGN KEY ("red3TeamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_blue1TeamScoreId_fkey" FOREIGN KEY ("blue1TeamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_blue2TeamScoreId_fkey" FOREIGN KEY ("blue2TeamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_blue3TeamScoreId_fkey" FOREIGN KEY ("blue3TeamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamScore" ADD CONSTRAINT "TeamScore_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamScore" ADD CONSTRAINT "TeamScore_scouterId_fkey" FOREIGN KEY ("scouterId") REFERENCES "Scouter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AutoScoringEvent" ADD CONSTRAINT "AutoScoringEvent_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeleopScoringEvent" ADD CONSTRAINT "TeleopScoringEvent_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChargeStationAttempt" ADD CONSTRAINT "ChargeStationAttempt_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncapSegment" ADD CONSTRAINT "IncapSegment_teamScoreId_fkey" FOREIGN KEY ("teamScoreId") REFERENCES "TeamScore"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTeam" ADD CONSTRAINT "_EventToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTeam" ADD CONSTRAINT "_EventToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
