/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Form, Table } from "react-bootstrap";
import { Ranking } from "@/lib/enums";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";
import { DrivetrainType, IntakeType, WheelType } from "@prisma/client";
interface Props {
  rankings: Ranking[];
}
export default function PitContent({rankings}: Props) {
    const dispatch = useDispatch<AppDispatch>();

    const [sortField, setSortField] = useState<keyof Ranking | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const [drivetrain, setDrivetrain] = useState<DrivetrainType|undefined>(undefined);
    const [wheels, setWheels] = useState<WheelType|undefined>(undefined);
    const [intake, setIntake] = useState<IntakeType|undefined>(undefined);

    const [groundCoralEnabled, setGroundCoralEnabled] = useState<boolean>(false);
    const [stationCoralEnabled, setStationCoralEnabled] = useState<boolean>(false);
    const [groundAlgaeEnabled, setGroundAlgaeEnabled] = useState<boolean>(false);
    const [reefAlgaeEnabled, setReefAlgaeEnabled] = useState<boolean>(false);
    const [reefAlgaeNoIntakeEnabled, setReefAlgaeNoIntakeEnabled] = useState<boolean>(false);

    const [reefL1Enabled, setReefL1Enabled] = useState<boolean>(false);
    const [reefL2Enabled, setReefL2Enabled] = useState<boolean>(false);
    const [reefL3Enabled, setReefL3Enabled] = useState<boolean>(false);
    const [reefL4Enabled, setReefL4Enabled] = useState<boolean>(false);
    const [netEnabled, setNetEnabled] = useState<boolean>(false);
    const [processorEnabled, setProcessorEnabled] = useState<boolean>(false);

    const [parkEnabled, setParkEnabled] = useState<boolean>(false);
    const [shallowEnabled, setShallowEnabled] = useState<boolean>(false);
    const [deepEnabled, setDeepEnabled] = useState<boolean>(false);
    const [autonEnabled, setAutonEnabled] = useState<boolean>(false);

    const [firstPicklistEnabled, setFirstPicklistEnabled] = useState<boolean>(false);
    const [secondPicklistEnabled, setSecondPicklistEnabled] = useState<boolean>(false);
  
    // Sorting function
    const sortedRankings = useMemo(() => {
      let newRankings = JSON.parse(JSON.stringify(rankings as Ranking[]));
      if (drivetrain) newRankings=newRankings.filter((ranking:Ranking)=>ranking.drivetrain==drivetrain);
      if (wheels) newRankings=newRankings.filter((ranking:Ranking)=>ranking.wheels==wheels);
      if (intake) newRankings=newRankings.filter((ranking:Ranking)=>ranking.intake==intake);
      if (groundCoralEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canIntakeGroundCoral);
      if (stationCoralEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canIntakeStationCoral);
      if (groundAlgaeEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canIntakeGroundAlgae);
      if (reefAlgaeEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canIntakeReefAlgae);
      if (reefAlgaeNoIntakeEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canRemoveReefAlgaeWithoutIntake);
      if (reefL1Enabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canScoreReefL1);
      if (reefL2Enabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canScoreReefL2);
      if (reefL3Enabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canScoreReefL3);
      if (reefL4Enabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canScoreReefL4);
      if (netEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canScoreNet);
      if (processorEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canScoreProcessor);
      if (parkEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canPark);
      if (shallowEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canShallow);
      if (deepEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canDeep);
      if (autonEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.hasAuton);
      if (firstPicklistEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.firstPicklist);
      if (secondPicklistEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.secondPicklist);
      return newRankings;
      // if (!sortField) return rankings;
  
      // return [...rankings].sort((a, b) => {
      //   const valueA = a[sortField];
      //   const valueB = b[sortField];
  
      //   if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      //   if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      //   return 0;
      // });
      
    }, [rankings, groundCoralEnabled, stationCoralEnabled, groundAlgaeEnabled, reefAlgaeEnabled, reefAlgaeNoIntakeEnabled, reefL1Enabled, reefL2Enabled, reefL3Enabled, reefL4Enabled, netEnabled, processorEnabled, parkEnabled, shallowEnabled, deepEnabled, autonEnabled, firstPicklistEnabled, secondPicklistEnabled]);
  
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
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                Team
              </th>
              <th
                style={{ cursor: "pointer" }}
                colSpan={4}
              >
                Structure
              </th>
              <th
                style={{ cursor: "pointer" }}
                colSpan={5}
              >
                Intaking: Can...
              </th>
              <th
                style={{ cursor: "pointer" }}
                colSpan={6}
              >
                Scoring: Can Score...
              </th>
              <th
                style={{ cursor: "pointer" }}
                colSpan={3}
              >
                Endgame: Can...
              </th>
              <th
                key="Has Auton"
                onClick={() =>
                  handleSort(
                    "hasauton" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                <Form.Check
                  type="checkbox"
                  checked={autonEnabled}
                  onChange={() => {setAutonEnabled(!autonEnabled)}}
                />
                Has Auton
              </th>
              <th
                key="Weight"
                onClick={() =>
                  handleSort(
                    "weight" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                Weight
              </th>
              <th
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                Comments
              </th>
              <th
                key="First Picklist"
                onClick={() =>
                  handleSort(
                    "firstpicklist" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                <Form.Check
                  type="checkbox"
                  checked={firstPicklistEnabled}
                  onChange={() => {setFirstPicklistEnabled(!firstPicklistEnabled)}}
                />
                First Picklist
              </th>
              <th
                key="Second Picklist"
                onClick={() =>
                  handleSort(
                    "secondpicklist" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                <Form.Check
                  type="checkbox"
                  checked={secondPicklistEnabled}
                  onChange={() => {setSecondPicklistEnabled(!secondPicklistEnabled)}}
                />
                Second Picklist
              </th>
            </tr>
            <tr>
              {/* Clickable table headers for sorting */}
              
              <th
                key="Images"
                style={{ cursor: "pointer" }}
              >
                Image
              </th>
              <th
                key="Drivetrain"
                onClick={() =>
                  handleSort(
                    "drivetrain" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Control
                  as="select"
                  value={drivetrain}
                  onChange={(e) => setDrivetrain(e.target.value as DrivetrainType|undefined)} // Updates drivetrain on selection
                >
                  <option value={undefined}>Select...</option>
                  <option value={DrivetrainType.SWERVE}>Swerve</option>
                  <option value={DrivetrainType.TANK}>Tank</option>
                  <option value={DrivetrainType.MECANUM}>Mecanum</option>
                  <option value={DrivetrainType.OTHER}>Other</option>
                </Form.Control>
                Drivetrain
              </th>
              <th
                key="Wheel Type"
                onClick={() =>
                  handleSort(
                    "wheeltype" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Control
                  as="select"
                  value={wheels}
                  onChange={(e) => setWheels(e.target.value as WheelType|undefined)} // Updates wheel type on selection
                >
                  <option value={undefined}>Select...</option>
                  <option value={WheelType.COLSUNS}>Colsuns</option>
                  <option value={WheelType.BLACKNITRITE}>Black Nitrite</option>
                  <option value={WheelType.BLUENITRITE}>Blue Nitrite</option>
                  <option value={WheelType.TPY}>TPY</option>
                  <option value={WheelType.WHITEANDYMARK}>White AndyMark</option>
                  <option value={WheelType.MECANUM}>Mecanum</option>
                  <option value={WheelType.OTHER}>Other</option>
                </Form.Control>
                Wheel Type
              </th>
              <th
                key="Intake Type"
                onClick={() =>
                  handleSort(
                    "intaketype" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Control
                  as="select"
                  value={intake}
                  onChange={(e) => setIntake(e.target.value as IntakeType|undefined)} // Updates intake type on selection
                >
                  <option value={undefined}>Select...</option>
                  <option value={IntakeType.MECHANICAL}>Mechanical</option>
                  <option value={IntakeType.PNEUMATIC}>Pneumatic</option>
                  <option value={IntakeType.OTHER}>Other</option>
                </Form.Control>
                Intake Type
              </th>
              <th
                key="Intake Ground Coral"
                onClick={() =>
                  handleSort(
                    "intakegroundcoral" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={groundCoralEnabled}
                  onChange={() => {setGroundCoralEnabled(!groundCoralEnabled)}}
                />
                Intake Ground Coral
              </th>
              <th
                key="Intake Station Coral"
                onClick={() =>
                  handleSort(
                    "intakestationcoral" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={stationCoralEnabled}
                  onChange={() => {setStationCoralEnabled(!stationCoralEnabled)}}
                />
                Intake Station Coral
              </th>
              <th
                key="Intake Ground Algae"
                onClick={() =>
                  handleSort(
                    "intakegroundalgae" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={groundAlgaeEnabled}
                  onChange={() => {setGroundAlgaeEnabled(!groundAlgaeEnabled)}}
                />
                Intake Ground Algae
              </th>
              <th
                key="Intake Reef Algae"
                onClick={() =>
                  handleSort(
                    "intakereefalgae" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={reefAlgaeEnabled}
                  onChange={() => {setReefAlgaeEnabled(!reefAlgaeEnabled)}}
                />
                Intake Reef Algae
              </th>
              <th
                key="Remove Reef Algae w/o Intaking"
                onClick={() =>
                  handleSort(
                    "removereefalgaew/ointaking" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={reefAlgaeNoIntakeEnabled}
                  onChange={() => {setReefAlgaeNoIntakeEnabled(!reefAlgaeNoIntakeEnabled)}}
                />
                Remove Reef Algae w/o Intaking
              </th>
              <th
                key="Coral in Reef L1"
                onClick={() =>
                  handleSort(
                    "coralinreefl1" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={reefL1Enabled}
                  onChange={() => {setReefL1Enabled(!reefL1Enabled)}}
                />
                Coral in Reef L1
              </th>
              <th
                key="Coral in Reef L2"
                onClick={() =>
                  handleSort(
                    "coralinreefl2" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={reefL2Enabled}
                  onChange={() => {setReefL2Enabled(!reefL2Enabled)}}
                />
                Coral in Reef L2
              </th>
              <th
                key="Coral in Reef L3"
                onClick={() =>
                  handleSort(
                    "coralinreefl3" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={reefL3Enabled}
                  onChange={() => {setReefL3Enabled(!reefL3Enabled)}}
                />
                Coral in Reef L3
              </th>
              <th
                key="Coral in Reef L4"
                onClick={() =>
                  handleSort(
                    "coralinreefl4" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={reefL4Enabled}
                  onChange={() => {setReefL4Enabled(!reefL4Enabled)}}
                />
                Coral in Reef L4
              </th>
              <th
                key="Algae in Net"
                onClick={() =>
                  handleSort(
                    "algaeinnet" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={netEnabled}
                  onChange={() => {setNetEnabled(!netEnabled)}}
                />
                Algae in Net
              </th>
              <th
                key="Algae in Processor"
                onClick={() =>
                  handleSort(
                    "algaeinprocessor" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={processorEnabled}
                  onChange={() => {setProcessorEnabled(!processorEnabled)}}
                />
                Algae in Processor
              </th>
              <th
                key="Park under Net"
                onClick={() =>
                  handleSort(
                    "parkundernet" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={parkEnabled}
                  onChange={() => {setParkEnabled(!parkEnabled)}}
                />
                Park under Net
              </th>
              <th
                key="Hang on Shallow Cage"
                onClick={() =>
                  handleSort(
                    "hangonshallowcage" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={shallowEnabled}
                  onChange={() => {setShallowEnabled(!shallowEnabled)}}
                />
                Hang on Shallow Cage
              </th>
              <th
                key="Hang on Deep Cage"
                onClick={() =>
                  handleSort(
                    "hangondeepcage" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={deepEnabled}
                  onChange={() => {setDeepEnabled(!deepEnabled)}}
                />
                Hang on Deep Cage
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRankings.map((r: Ranking, idx: number) => (
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
                <td>{r.hasAuton?"yes":"no"}</td>
                <td>{Number(r.weight)}</td>
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
