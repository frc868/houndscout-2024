/* eslint-disable @next/next/no-img-element */
import { Dropdown, Form, Table } from "react-bootstrap";
import { useState, useMemo } from "react";
import { CoralIntakeLocation, CoralScoringLevel, CoralScoringSide, AlgaeIntakeLocation, AlgaeScoringLocation } from "@prisma/client";
import { Row, Col } from "react-bootstrap";
import { Team, Ranking } from "@/lib/enums";
import TeamDropdown from "@/components/TeamDropdown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";

interface Props {
  rankings: Ranking[];
  teams: Team[]
}

export default function IncapsContent({rankings, teams}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [team, setTeam]=useState<Ranking | undefined>();

    const sortedEvents = useMemo(() => {
      return team?.teamScores.filter(score=>score.submitted).flatMap((teamScore)=>(
        teamScore.incapSegments.map((r, idx) => {
          return {
            ...r,
            totaltime: (Number(r.timestampEnded)-Number(r.timestampStarted))/1000
          }
        })
      ));
    }, [team?.teamScores]);
  
  // Calculate max values for coloring
    const maxValues = useMemo(() => {
      const maxes: Record<string, number> = {};
      sortedEvents?.forEach((r) => {
        Object.entries(r).forEach(([key, value]) => {
          if (typeof value === "number" && key !== "team") {
            maxes[key] = Math.max(maxes[key] || 0, value);
          }
        });
      });
      return maxes;
    }, [sortedEvents]);
  
    // Calculate min values for coloring
    const minValues = useMemo(() => {
      const mins: Record<string, number> = {};
      sortedEvents?.forEach((r) => {
        Object.entries(r).forEach(([key, value]) => {
          if (typeof value === "number" && key !== "team") {
            mins[key] = Math.min(mins[key] || Infinity, value);
          }
        });
      });
      return mins;
    }, [sortedEvents]);
  
    // Determine cell color based on value
    const getColor = (
      value: number,
      maxValue: number,
      minValue: number,
      category: string
    ): React.CSSProperties => {
      if (category === "team") return {};
  
      const intensity = (maxValue - value) / (maxValue - minValue);
      let color: string;
      // Define your color logic here
      color = `rgba(0, 0, 255, ${intensity})`; // Example color logic
      return { backgroundColor: color };
    };

  return (
    <div
    style={{
      height: "calc(100% - 2*24px)",
      width: "calc(100% - 2*24px)",
      color: "white",
      overflowX: "auto",
      overflowY: "auto",
      float: "right"
    }}
      className="m-4 bg-dark rounded-3 font-monospace text-center"
    >
      <h1>Incap Event Data</h1>
      
      <Row className="d-flex flex-row justify-content-center align-items-center">
        <h3 className="mr-2">Team Number: </h3>
        <TeamDropdown
          red={false}
          activeTeam={Number(team?.teamnumber)}
          teams={teams as Team[]}
          handleTeamSelect={(number) => {
            setTeam(rankings.filter(team=>team.teamnumber===number)[0]);
          }}
        />
        {team && (<>
          <div
            className={"d-flex justify-content-start align-items-center"}
            style={{
              width: "auto",
              height: "100%",
              fontSize: "35pt",
              color: "gold",
              cursor: "pointer",
            }}
            onMouseDown={async () => {
              await dispatch(
                updatePicklistsAsync({
                  teamNumber: team.teamnumber as number,
                  firstPicklist: !(team.firstpicklist),
                  secondPicklist: team.secondpicklist
                })
              );
              setTeam({...team, firstpicklist: !team.firstpicklist});
            }}
          >
            <i className={`bi ${team.firstpicklist ? "bi-star-fill" : "bi-star"}`} />
          </div>
          <div
            className={"d-flex justify-content-end align-items-center"}
            style={{
              width: "auto",
              height: "100%",
              fontSize: "35pt",
              color: "silver",
              cursor: "pointer",
            }}
            onMouseDown={async () => {
              await dispatch(
                updatePicklistsAsync({
                  teamNumber: team.teamnumber as number,
                  firstPicklist: team.firstpicklist,
                  secondPicklist: !(team.secondpicklist)
                })
              );
              setTeam({...team, secondpicklist: !team.secondpicklist});
            }}
          >
            <i className={`bi ${team.secondpicklist ? "bi-star-fill" : "bi-star"}`} />
          </div>
        </>)}
      </Row>
      {team &&(
        <Table
          bordered
          variant="dark"
          className="table-responsive"
        >
          <thead>
            <tr>
              {/* Clickable table headers for sorting */}
              {[
                // "Match Number",
                "Incap Time (s)",
                "Completed?",
              ].map((header) => (
                <th
                  key={header}
                  // onClick={() =>
                  //   handleSort(
                  //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                  //   )
                  // }
                  style={{ cursor: "pointer" }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedEvents?.map((r, idx) => (
              <tr key={r.id}>
                <td style={getColor(r.totaltime as number, maxValues.totaltime, minValues.totaltime, "totaltime")}>{r.totaltime}</td>
                <td style={r.full?{backgroundColor: "blue"}:{}}>{r.full?"yes":"no"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
