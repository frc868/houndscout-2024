/* eslint-disable react/display-name */
import { Scouter } from "@/redux/adminDataSlice";
import { Scores } from "@/redux/scoresSlice";
import React, { useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Event, TeamScore } from "@prisma/client";
import { Ranking } from "@/lib/enums";

interface Props {
  teamNumber: number;
  teamName: string;
  teamScores: TeamScore[];
  show: boolean;
  handleClose: () => void;
}

export default function Database({
  teamNumber,
  teamName,
  teamScores,
  show,
  handleClose
}: Props) {
  return (
    <Modal centered show={show} size="xl" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Team {teamNumber}: {teamName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table bordered className="border-secondary-subtle">
          <thead className="align-middle text-center">
            <tr>
              <th>Preloaded?</th>
              <th>Mobility Bonus?</th>
              <th>Auton Scoring Info</th>
              <th>Teleop Scoring Events</th>
              <th>Incap Segments</th>
              <th>Endgame Data</th>
              <th>Driver Skill Rating</th>
              <th>Played Defense?</th>
              <th>Under Heavy Defense?</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody className="align-middle text-center">
            {teamScores.map((score:TeamScore) => (
              <tr key={score.id}>
                <td className="px-2">
                  <p>{score.preloaded}</p>
                </td>
                <td className="px-2">
                  <p>{score.leftStartingZone}<br />Zone {score.autoStartingZone}</p>
                </td>
                <td className="px-2">
                  <p>{score.autoGamePieces}</p>
                  <p>{score.missingAutoGamePieces}</p>
                  <p>{score.autoGamePiecesScored}</p>
                </td>
                <td className="px-2">
                  {/* <p>{score.teleopScoringEvents}</p> */}
                </td>
                <td className="px-2">
                  {/* <p>{score.incapSegments}</p> */}
                </td>
                <td className="px-2">
                  {/* <p>{score.climbType} at {score.timestampClimbStarted} with {score.numberRobotsOnChain}<br />Scored in Trap: {score.scoredInTrap}<br />Spotlit: {score.scoredInTrap}</p> */}
                </td>
                <td className="px-2">
                  <p>{score.playedDefense}</p>
                </td>
                <td className="px-2">
                  <p>{score.underDefense}</p>
                </td>
                <td
                  className={"px-2"}
                >
                  <p>{score.comments}</p>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <p>To do: Change the team numbers to dropdowns</p>
      </Modal.Footer>
    </Modal>
  );
}
