import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Table } from "react-bootstrap";
import { Ranking } from "@/lib/enums";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";

interface Props {
  rankings: Ranking[];
}
export default function RankingsContent({rankings}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [sortField, setSortField] = useState<keyof Ranking | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Sorting function
  const sortedRankings = useMemo(() => {
    if (!sortField) return [...rankings].sort((a, b) => {
      if(a.firstpicklist&&!b.firstpicklist) return -1;
        else if(!a.firstpicklist&&b.firstpicklist) return 1;
        else if(a.secondpicklist&&!b.secondpicklist) return -1;
        else if(!a.secondpicklist&&b.secondpicklist) return 1;
        else if(a.teamnumber<b.teamnumber) return -1;
        else if(a.teamnumber>b.teamnumber) return 1;
        else return 0;
  });

    return [...rankings].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      console.log(valueA+", "+valueB)
      if (valueA==undefined||valueA==null) return -1;
      else if (valueB==undefined||valueB==null) return 1;
      else if (valueA < valueB) {
        if (sortDirection === "asc") return -1;
        else return 1;
      }else if (valueA > valueB) {
        if (sortDirection === "asc") return 1;
        else return -1;
      }else if (valueA == valueB){
        if(a.firstpicklist&&!b.firstpicklist) return -1;
        else if(!a.firstpicklist&&b.firstpicklist) return 1;
        else if(a.secondpicklist&&!b.secondpicklist) return -1;
        else if(!a.secondpicklist&&b.secondpicklist) return 1;
        else if(a.teamnumber<b.teamnumber) return -1;
        else if(a.teamnumber>b.teamnumber) return 1;
        else return 0;
      }
      return 0;
    });
    
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
      <h1>Welcome to the HoundScout data viewer! (WIP)</h1>
      <p>This is a built-in tool that provides easy access to the collected data. Feel free to use this page to make the best possible decisions!</p>
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
              "Team Number",
              "Total Games",
              "Mobility",
              "Coral Dropped",
              "Algae Dropped",
              "Endgame Parked",
              "Endgame Shallow",
              "Endgame Deep",
              "Incap",
              "Defense",
              "Driver Skill",
              "First Picklist",
              "Second Picklist",
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
                <i className={` bi ${(header.toLowerCase().replace(/ /g, "") as keyof Ranking!=sortField) ? "bi-chevron-bar-contract" : sortDirection=="asc" ? "bi-chevron-bar-down" : "bi-chevron-bar-up"}`} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRankings.map((r, idx) => (
            <tr key={r.teamnumber}>
              <td 
                // key={r}  
                // style={getColor(idx as number, maxValues[r], r)}
              >
                {r.teamnumber}
              </td>
              <td>{r.totalgames}</td>
              <td>{r.mobility}</td>
              <td>{r.coraldropped}</td>
              <td>{r.algaedropped}</td>
              <td>{r.endgameparked}</td>
              <td>{r.endgameshallow}</td>
              <td>{r.endgamedeep}</td>
              <td>{r.incap}</td>
              <td>{r.defense}</td>
              <td>{r.driverskill}</td>
              <td>
                <div
                  className={"d-flex justify-content-center align-items-center"}
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
                        teamNumber: r.teamnumber as number,
                        firstPicklist: !r.firstpicklist,
                        secondPicklist: r.secondpicklist
                      })
                    );
                  }}
                >
                  <i className={`bi ${r.firstpicklist ? "bi-star-fill" : "bi-star"}`} />
                </div>
              </td>
              <td>
                <div
                  className={"d-flex justify-content-center align-items-center"}
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
                        teamNumber: r.teamnumber as number,
                        firstPicklist: r.firstpicklist,
                        secondPicklist: !r.secondpicklist
                      })
                    );
                  }}
                >
                  <i className={`bi ${r.secondpicklist ? "bi-star-fill" : "bi-star"}`} />
                </div>
              </td>
              {/* {Object.entries(r).map(([key, value]) =>
                key !== "team" ? (
                  <td
                    key={key}
                    style={getColor(value as number, maxValues[key], key)}
                  >
                    {value}
                  </td>
                ) : (
                  <td key={key}>{value}</td>
                )
              )} */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
