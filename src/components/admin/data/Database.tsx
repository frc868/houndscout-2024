/* eslint-disable react/display-name */
import { Scouter } from "@/redux/adminDataSlice";
import { Scores } from "@/redux/scoresSlice";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Event, TeamScore } from "@prisma/client";
import { Ranking } from "@/lib/enums";
import DataTeamModal from "./DataTeamModal";
interface Props {
  rankings: Ranking[];
  handleMatchSelect: (name: string) => void;
  handleMatchDelete: (name: string) => void;
}

export default function Database({
  rankings,
  handleMatchSelect,
  handleMatchDelete,
}: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [showTeam, setShowTeam] = useState(false);
  const [teamNumber, setTeamNumber] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [teamScore, setTeamScore] = useState([{}]);
 
  return (
    <div className="d-flex justify-content-center">
      <DataTeamModal
        teamNumber={teamNumber as number}
        teamName={teamName as string}
        teamScores={teamScore as TeamScore[]}
        show={showTeam}
        handleClose={() => setShowTeam(false)}
      ></DataTeamModal>
      <div className="d-flex flex-column">
        <h1 className="text-center mb-3">Database (WIP)</h1>
        <Table bordered className="border-secondary-subtle">
          <thead className="align-middle text-center">
            <tr>
              <th>Team</th>
              <th>Mobility Bonus?</th>
              <th>Auton Speaker</th>
              <th>Teleop Speaker</th>
              <th>Teleop Amp</th>
              <th>Teleop Passes</th>
              <th>Endgame Data</th>
              <th>Average Incap Time</th>
              <th>Played Defense?</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="align-middle text-center">
            {rankings.map((team:Ranking) => (
              <tr key={team.teamNumber}>
                <td className="px-2 table-secondary">
                  <p>Team {team.teamNumber}:<br />{team.teamName}</p>
                </td>
                <td className="px-2">
                  <p>{team.mobility}/{team.total} matches</p>
                </td>
                <td className="px-2">
                  <p>{team.autoSpeaker} avg scores</p>
                  <p>{team.autoMisses} avg misses</p>
                </td>
                <td className="px-2">
                  <p>{team.speaker} avg scores</p>
                  <p>{team.speakerMisses} avg misses</p>
                </td>
                <td className="px-2">
                  <p>{team.amp} avg scores</p>
                  <p>{team.ampMisses} avg misses</p>
                </td>
                <td className="px-2">
                  <p>{team.pass} avg scores</p>
                  <p>{team.passMisses} avg misses</p>
                </td>
                <td className="px-2">
                  <p>{team.climb} (Climbed)<br />{team.ensemble} (Ensemble Bonus)<br />{team.trap} (Scored in Trap)<br />{team.total} (Total)</p>
                </td>
                <td className="px-2">
                  <p>{team.incap} seconds?<br /></p>
                </td>
                <td className="px-2">
                  <p>{team.defense}/{team.total} matches<br /></p>
                </td>
                <td
                  className={"px-2 py-4 d-flex flex-column"}
                >
                  <Button onClick={() => {
                    setTeamNumber(team.teamNumber);
                    setTeamName(team.teamName);
                    setTeamScore(team.teamScores);
                    setShowTeam(true);}}>
                    More Info
                  </Button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  );
}
