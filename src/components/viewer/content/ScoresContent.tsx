import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Row, Col, Table } from "react-bootstrap";
import { Team, Ranking, DetailedTeamScore } from "@/lib/enums";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";
import TeamDropdown from "@/components/TeamDropdown";
import { TeamScore, Result, EndgameType } from "@prisma/client";

interface Props {
  scores: DetailedTeamScore[];
  teams: Team[];
}
export default function ScoresContent({scores, teams}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [team, setTeam]=useState<Team | undefined>();

  const [sortField, setSortField] = useState<keyof Ranking | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
    // Sorting function
    // const sortedRankings = useMemo(() => {
    //   return scores;
    //   // if (!sortField) return rankings;
  
    //   // return [...rankings].sort((a, b) => {
    //   //   const valueA = a[sortField];
    //   //   const valueB = b[sortField];
  
    //   //   if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    //   //   if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    //   //   return 0;
    //   // });
      
    // }, [scores, sortField, sortDirection]);
  
    // Calculate max values for coloring
    const maxValues = useMemo(() => {
      const maxes: Record<string, number> = {};
      [...scores].forEach((r) => {
        Object.entries(r).forEach(([key, value]) => {
          if (typeof value === "number" && key !== "team") {
            maxes[key] = Math.max(maxes[key] || 0, value);
          }
        });
      });
      return maxes;
    }, [scores]);
  
    // Handler to sort by column
    const handleSort = (field: keyof Ranking) => {
      if (field === sortField) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortField(field);
        setSortDirection("asc");
      }
    };
  
    // Determine cell color based on value
    const getColor = (
      value: number,
      maxValue: number,
      category: string,
      reverse: boolean,
    ): React.CSSProperties => {
      if (category === "team") return {};
  
      const intensity = maxValue / value;
      let color: string;
      // Define your color logic here
      color = reverse?`rgba(0, 0, 255, ${1-intensity})`:`rgba(0, 0, 255, ${intensity})`; // Example color logic
      return { backgroundColor: color };
    };
  
    return (
      <div
        style={{
          height: "calc(100% - 2*24px)",
          width: "calc(85vw - 2*24px)",
          color: "white",
          overflowX: "auto",
          overflowY: "auto",
          float: "right"
        }}
        className="m-4 bg-dark rounded-3 font-monospace text-center"
      >
        <h1>Team Match Data</h1>
        <Row className="d-flex flex-row justify-content-center align-items-center">
          <h3 className="mr-2">Team Number: </h3>
          <TeamDropdown
            red={false}
            activeTeam={Number(team?.number)}
            teams={teams as Team[]}
            handleTeamSelect={(number) => {
              setTeam(teams.filter(team=>team.number===number)[0]);
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
                  teamNumber: team.number as number,
                  firstPicklist: !(team.firstPicklist),
                  secondPicklist: team.secondPicklist
                })
              );
              setTeam({...team, firstPicklist: !team.firstPicklist});
            }}
          >
            <i className={`bi ${team.firstPicklist ? "bi-star-fill" : "bi-star"}`} />
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
                  teamNumber: team.number as number,
                  firstPicklist: team.firstPicklist,
                  secondPicklist: !(team.secondPicklist)
                })
              );
              setTeam({...team, secondPicklist: !team.secondPicklist});
            }}
          >
            <i className={`bi ${team.secondPicklist ? "bi-star-fill" : "bi-star"}`} />
          </div>
          </>)}
        </Row>
        {team &&(
          <Table
            bordered
            variant="dark"
            className="table-responsive"
            style={{width: "calc(125vw - 2*24px)"}}
          >
            <thead>
              <tr>
                {/* Clickable table headers for sorting */}
                {[
                  "Match Name",
                  "Station",
                  "Scouter",
                  "Preload",
                  "Mobility Bonus",
                  "Time Incapped (s)",
                  "Endgame Type",
                  "Endgame Success",
                  "Driver Skill",
                  "Result",
                  "Played Defense",
                ].map((header) => (
                  <th
                    key={header}
                    onClick={() =>
                      handleSort(
                        header.toLowerCase().replace(/ /g, "") as keyof Ranking
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {header}
                  </th>
                ))}
                <th
                  key="Comments"
                  onClick={() =>
                    handleSort("comments")
                  }
                  style={{ cursor: "pointer", width: "500%" }}
                >
                  Comments
                </th>
              </tr>
              
            </thead>
            <tbody>
              {scores.filter((score)=>score.teamNumber==team.number).map((r, idx) => (
                <tr key={r.id}>
                  <td>{r.matchName}</td>
                  <td>{r.station}</td>
                  <td>{r.scouterName}</td>
                  <td style={r.preloaded?{backgroundColor: "blue"}:{}}>{r.preloaded?"yes":"no"}</td>
                  <td style={r.leftStartingZone?{backgroundColor: "blue"}:{}}>{r.leftStartingZone?"yes":"no"}</td>
                  <td style={getColor(r.totalIncapTime as number, maxValues.totalIncapTime, "totalIncapTime", true)}>{r.totalIncapTime}</td>
                  <td style={getColor(r.endgameType==EndgameType.PARKED?2:r.endgameType==EndgameType.SHALLOW?6:r.endgameType==EndgameType.DEEP?12:0, 12, "endgameType", false)}>{r.endgameType}</td>
                  <td style={r.endgameSuccess?{backgroundColor: "blue"}:{}}>{r.endgameSuccess?"yes":"no"}</td>
                  <td style={getColor(r.driverSkillRating as number, 5, "driverSkillRating", false)}>{r.driverSkillRating}</td>
                  <td style={getColor(r.result==Result.TIE?1:r.result==Result.WIN?3:0, 3, "result", false)}>{r.result}</td>
                  <td style={r.playedDefense?{backgroundColor: "blue"}:{}}>{r.playedDefense?"yes":"no"}</td>
                  <td style={{fontSize: "12px"}}>{r.comments}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
  );
}
