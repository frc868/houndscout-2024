/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Table } from "react-bootstrap";
import { Ranking } from "@/lib/enums";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";

interface Props {
  rankings: Ranking[];
}
export default function PitContent({rankings}: Props) {
  const dispatch = useDispatch<AppDispatch>();

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
          width: "calc(85% - 2*24px)",
          color: "white",
          overflowX: "auto",
          overflowY: "auto",
          float: "right"
        }}
        className="m-4 bg-dark rounded-3 font-monospace text-center"
      >
        <h1>Pit Scouting Data (WIP)</h1>
        <Table
          bordered
          hover
          variant="dark"
          className="table-responsive"
        >
          <thead>
            <tr>
              <th
                // onClick={() =>
                //   handleSort(
                //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                //   )
                // }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                Team
              </th>
              <th
                // onClick={() =>
                //   handleSort(
                //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                //   )
                // }
                style={{ cursor: "pointer" }}
                colSpan={4}
              >
                Structure
              </th>
              <th
                // onClick={() =>
                //   handleSort(
                //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                //   )
                // }
                style={{ cursor: "pointer" }}
                colSpan={5}
              >
                Intaking: Can...
              </th>
              <th
                // onClick={() =>
                //   handleSort(
                //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                //   )
                // }
                style={{ cursor: "pointer" }}
                colSpan={6}
              >
                Scoring: Can Score...
              </th>
              <th
                // onClick={() =>
                //   handleSort(
                //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                //   )
                // }
                style={{ cursor: "pointer" }}
                colSpan={3}
              >
                Endgame: Can...
              </th>
              <th
                // onClick={() =>
                //   handleSort(
                //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                //   )
                // }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                Comments
              </th>
              <th
                // onClick={() =>
                //   handleSort(
                //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                //   )
                // }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                First Picklist
              </th>
              <th
                // onClick={() =>
                //   handleSort(
                //     header.toLowerCase().replace(/ /g, "") as keyof Ranking
                //   )
                // }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                Second Picklist
              </th>
            </tr>
            <tr>
              {/* Clickable table headers for sorting */}
              {[
                "Image",
                "Drivetrain",
                "Wheels",
                "Intake",
                "Intake Ground Coral",
                "Intake Station Coral",
                "Intake Ground Algae",
                "Intake Reef Algae",
                "Remove Reef Algae w/o Intaking",
                "Coral in Reef L1",
                "Coral in Reef L2",
                "Coral in Reef L3",
                "Coral in Reef L4",
                "Algae in New",
                "Algae in Processor",
                "Park under Net",
                "Hang on Shallow Cage",
                "Hang on Deep Cage",
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
            {sortedRankings.map((r, idx) => (
              <tr key={r.teamNumber}>
                <td>{r.teamNumber}</td>
                <td>
                  {r.robotImage &&
                    <img className="" alt="" src={r.robotImage} width={85} />
                  }
                </td>
                <td>{r.drivetrain}</td>
                <td>{r.wheels}</td>
                <td>{r.intake}</td>
                <td>{r.canIntakeGroundCoral?"yes":"no"}</td>
                <td>{r.canIntakeStationCoral?"yes":"no"}</td>
                <td>{r.canIntakeGroundAlgae?"yes":"no"}</td>
                <td>{r.canIntakeReefAlgae?"yes":"no"}</td>
                <td>{r.canRemoveReefAlgaeWithoutIntake?"yes":"no"}</td>
                <td>{r.canScoreReefL1?"yes":"no"}</td>
                <td>{r.canScoreReefL2?"yes":"no"}</td>
                <td>{r.canScoreReefL3?"yes":"no"}</td>
                <td>{r.canScoreReefL4?"yes":"no"}</td>
                <td>{r.canScoreNet?"yes":"no"}</td>
                <td>{r.canScoreProcessor?"yes":"no"}</td>
                <td>{r.canPark?"yes":"no"}</td>
                <td>{r.canShallow?"yes":"no"}</td>
                <td>{r.canDeep?"yes":"no"}</td>
                <td>{r.comments}</td>
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
                          teamNumber: r.teamNumber as number,
                          firstPicklist: !r.firstPicklist,
                          secondPicklist: r.secondPicklist
                        })
                      );
                    }}
                  >
                    <i className={`bi ${r.firstPicklist ? "bi-star-fill" : "bi-star"}`} />
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
                          teamNumber: r.teamNumber as number,
                          firstPicklist: r.firstPicklist,
                          secondPicklist: !r.secondPicklist
                        })
                      );
                    }}
                  >
                    <i className={`bi ${r.secondPicklist ? "bi-star-fill" : "bi-star"}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  );
}
