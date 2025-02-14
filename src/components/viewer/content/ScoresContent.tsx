import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Row, Col, Table } from "react-bootstrap";
import { Team, Ranking } from "@/lib/enums";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";
import TeamDropdown from "@/components/admin/TeamDropdown";

interface Props {
  rankings: Ranking[];
  teams: Team[];
}
export default function ScoresContent({rankings, teams}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [team, setTeam]=useState<Ranking | undefined>();

  const [sortField, setSortField] = useState<keyof Ranking | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
    // Sorting function
    const sortedRankings = useMemo(() => {
      return rankings;
      // if (!sortField) return rankings;
  
      // return [...rankings].sort((a, b) => {
      //   const valueA = a[sortField];
      //   const valueB = b[sortField];
  
      //   if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      //   if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      //   return 0;
      // });
      
    }, [rankings, sortField, sortDirection]);
  
    // Calculate max values for coloring
    const maxValues = useMemo(() => {
      const maxes: Record<string, number> = {};
      [...rankings].forEach((r: Ranking) => {
        Object.entries(r).forEach(([key, value]) => {
          if (typeof value === "number" && key !== "team") {
            maxes[key] = Math.max(maxes[key] || 0, value);
          }
        });
      });
      return maxes;
    }, [rankings]);
  
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
      category: string
    ): React.CSSProperties => {
      if (category === "team") return {};
  
      const intensity = value / maxValue;
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
        <h1>Match Data (WIP)</h1>
        <Row className="d-flex flex-row justify-content-center align-items-center">
          <h3 className="mr-2">Team Number: </h3>
          <TeamDropdown
            red={false}
            activeTeam={Number(team?.teamNumber)}
            teams={teams as Team[]}
            handleTeamSelect={(number) => {
              setTeam(rankings.filter(team=>team.teamNumber===number)[0]);
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
                    teamNumber: team.teamNumber as number,
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
                    teamNumber: team.teamNumber as number,
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
            hover
            variant="dark"
            className="table-responsive"
          >
            <thead>
              <tr>
                {/* Clickable table headers for sorting */}
                {[
                  "Match Number",
                  "Scouter",
                  "Preload",
                  "Mobility Bonus",
                  "Total Incap Time (s)",
                  "Endgame Type",
                  "Endgame Success",
                  "Driver Skill",
                  "Result",
                  "Played Defense",
                  "Comments",
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
              </tr>
            </thead>
            <tbody>
              {team.teamScores.map((r, idx) => (
                <tr key={r.id}>
                  {/* <td>{
                    if(r.red1Match){
                      return (r.red1Match.number); 
                    }
                  }</td> */}
                  <td>WIP</td>
                  <td>{r.scouterId}</td>
                  <td>{r.preloaded?"yes":"no"}</td>
                  <td>{r.leftStartingZone?"yes":"no"}</td>
                  <td>{r.incapSegments.reduce((s, ind)=>(s+Number(ind.timestampEnded)-Number(ind.timestampStarted)),0)/1000}</td>
                  <td>{r.endgameType}</td>
                  <td>{r.endgameSuccess?"yes":"no"}</td>
                  <td>{r.driverSkillRating}</td>
                  <td>{r.result}</td>
                  <td>{r.playedDefense?"yes":"no"}</td>
                  <td>{r.comments}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
  );
}
