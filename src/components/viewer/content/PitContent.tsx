/* eslint-disable @next/next/no-img-element */
import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, ReduxState } from "@/redux/store";
import { Dropdown, Form, Table } from "react-bootstrap";
import { Ranking } from "@/lib/enums";
import { updatePicklistsAsync } from "@/redux/viewerDataSlice";
import { DrivetrainType, IntakeType, WheelType } from "@prisma/client";
interface Props {
  rankings: Ranking[];
}

//I know there's errors, but I'm still trying to fix those.
// UPDATE CYCLE (Pit): WIP
export default function PitContent({rankings}: Props) {
    const dispatch = useDispatch<AppDispatch>();

    const [sortField, setSortField] = useState<keyof Ranking | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const [drivetrain, setDrivetrain] = useState({
      ...(Object.fromEntries(Object.values(DrivetrainType).filter((key) => isNaN(Number(key))).map((key) => [key, false]))),
    });
    const [wheels, setWheels] = useState({
      ...(Object.fromEntries(Object.values(WheelType).filter((key) => isNaN(Number(key))).map((key) => [key, false]))),
    });
    const [intake, setIntake] = useState({
      ...(Object.fromEntries(Object.values(IntakeType).filter((key) => isNaN(Number(key))).map((key) => [key, false]))),
    });

    const [groundCoralEnabled, setGroundCoralEnabled] = useState<boolean>(false);
    const [lollipopCoralEnabled, setLollipopCoralEnabled] = useState<boolean>(false);
    const [stationCoralEnabled, setStationCoralEnabled] = useState<boolean>(false);
    const [groundAlgaeEnabled, setGroundAlgaeEnabled] = useState<boolean>(false);
    const [lollipopAlgaeEnabled, setLollipopAlgaeEnabled] = useState<boolean>(false);
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

    const drivetrainFilter =  useCallback((ranking: Ranking) => {
      if (Object.values(drivetrain).some(value => value === true)){
        return ranking.drivetrain !== undefined &&
          ranking.drivetrain !== null &&
          drivetrain[ranking.drivetrain] === true;
      } else return true;
    }, [drivetrain]);

    const wheelFilter = useCallback((ranking: Ranking) => {
      if (Object.values(wheels).some(value => value === true)){
        return ranking.wheels !== undefined &&
          ranking.wheels !== null &&
          wheels[ranking.wheels] === true;
      } else return true;
    }, [wheels]);

    const intakeFilter = useCallback((ranking: Ranking) => {
      if (Object.values(intake).some(value => value === true)){
        return ranking.intake !== undefined &&
          ranking.intake !== null &&
          intake[ranking.intake] === true;
      } else return true;
    }, [intake]);

    // Sorting function
    const sortedRankings = useMemo(() => {
      let newRankings = JSON.parse(JSON.stringify(rankings as Ranking[])).filter((ranking:Ranking)=>ranking.pitsubmitted==true).filter(drivetrainFilter).filter(wheelFilter).filter(intakeFilter);
      if (groundCoralEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canintakegroundcoral);
      if (lollipopCoralEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canintakelollipopcoral);
      if (stationCoralEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canintakestationcoral);
      if (groundAlgaeEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canintakegroundalgae);
      if (lollipopAlgaeEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canintakelollipopalgae);
      if (reefAlgaeEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canintakereefalgae);
      if (reefAlgaeNoIntakeEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canremovereefalgaewithoutintake);
      if (reefL1Enabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canscorereefl1);
      if (reefL2Enabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canscorereefl2);
      if (reefL3Enabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canscorereefl3);
      if (reefL4Enabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canscorereefl4);
      if (netEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canscorenet);
      if (processorEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canscoreprocessor);
      if (parkEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canpark);
      if (shallowEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.canshallow);
      if (deepEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.candeep);
      if (autonEnabled) newRankings=newRankings.filter((ranking:Ranking)=>ranking.hasauton);
      if (!sortField) return [...newRankings].sort((a, b) => {
        if(a.firstpicklist&&!b.firstpicklist) return -1;
          else if(!a.firstpicklist&&b.firstpicklist) return 1;
          else if(a.secondpicklist&&!b.secondpicklist) return -1;
          else if(!a.secondpicklist&&b.secondpicklist) return 1;
          else if(a.teamnumber<b.teamnumber) return -1;
          else if(a.teamnumber>b.teamnumber) return 1;
          else return 0;
      });
  
      return [...newRankings].sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];
        console.log(valueA+", "+valueB)
        if (valueA==undefined||valueA==null) return 1;
      else if (valueB==undefined||valueB==null) return -1;
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
    }, [rankings, drivetrainFilter, wheelFilter, intakeFilter, groundCoralEnabled, lollipopCoralEnabled, stationCoralEnabled, groundAlgaeEnabled, lollipopAlgaeEnabled, reefAlgaeEnabled, reefAlgaeNoIntakeEnabled, reefL1Enabled, reefL2Enabled, reefL3Enabled, reefL4Enabled, netEnabled, processorEnabled, parkEnabled, shallowEnabled, deepEnabled, autonEnabled, sortField, sortDirection]);
  
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
        setSortDirection("desc");
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
    
        const intensity = value / maxValue;
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
        <h1>Pit Scouting Data</h1>
        <Table
          bordered
          variant="dark"
          className="table-responsive"
          style={{width: "calc(225vw - 2*24px)"}}
        >
          <thead>
            <tr>
            <th
                key="Team Number"
                onClick={() =>
                  handleSort(
                    "teamnumber" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                Team Number
                <i className={` bi ${(sortField!="teamnumber") ? "bi-chevron-bar-contract" : sortDirection=="asc" ? "bi-chevron-bar-down" : "bi-chevron-bar-up"}`} />
              </th>
              <th
                key="firstpicklist"
                onClick={() =>
                  handleSort(
                    "firstpicklist" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                First Picklist
                <i className={` bi ${(sortField!="firstpicklist") ? "bi-chevron-bar-contract" : sortDirection=="asc" ? "bi-chevron-bar-down" : "bi-chevron-bar-up"}`} />
              </th>
              <th
                key="secondpicklist"
                onClick={() =>
                  handleSort(
                    "secondpicklist" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                Second Picklist
                <i className={` bi ${(sortField!="secondpicklist") ? "bi-chevron-bar-contract" : sortDirection=="asc" ? "bi-chevron-bar-down" : "bi-chevron-bar-up"}`} />
              </th>
              <th
                style={{ cursor: "pointer" }}
                colSpan={4}
              >
                Structure
              </th>
              <th
                style={{ cursor: "pointer" }}
                colSpan={7}
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
                <i className={` bi ${(sortField!="weight") ? "bi-chevron-bar-contract" : sortDirection=="asc" ? "bi-chevron-bar-down" : "bi-chevron-bar-up"}`} />
              </th>
              <th
                style={{ cursor: "pointer" }}
                rowSpan={2}
              >
                Comments
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
                {Object.keys(DrivetrainType).map((type) => {
                  return(
                    <Form.Check
                      key={type}
                      type="checkbox"
                      label={type}
                      checked={drivetrain[type]}
                      onChange={() => {setDrivetrain((prev) => ({...prev, [type]: !prev[type],}))}}
                    />
                  )
                })}
                <u>Drivetrain Type</u>
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
                {Object.keys(WheelType).map((type) => {
                  return(
                    <Form.Check
                      key={type}
                      type="checkbox"
                      label={type}
                      checked={wheels[type]}
                      onChange={() => {setWheels((prev) => ({...prev, [type]: !prev[type],}))}}
                    />
                  )
                })}
                <u>Wheel Type</u>
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
                {Object.keys(IntakeType).map((type) => {
                  return(
                    <Form.Check
                      key={type}
                      type="checkbox"
                      label={type}
                      checked={intake[type]}
                      onChange={() => {setIntake((prev) => ({...prev, [type]: !prev[type],}))}}
                    />
                  )
                })}
                <u>Intake Type</u>
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
                key="Intake Lollipop Coral"
                onClick={() =>
                  handleSort(
                    "intakelollipopcoral" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={lollipopCoralEnabled}
                  onChange={() => {setLollipopCoralEnabled(!lollipopCoralEnabled)}}
                />
                Intake Lollipop Coral
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
                key="Intake Lollipop Algae"
                onClick={() =>
                  handleSort(
                    "intakelollipopalgae" as keyof Ranking
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Form.Check
                  type="checkbox"
                  checked={lollipopAlgaeEnabled}
                  onChange={() => {setLollipopAlgaeEnabled(!lollipopAlgaeEnabled)}}
                />
                Intake Lollipop Algae
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
              <tr key={r.teamnumber}>
                <td>{r.teamnumber}</td>
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
                <td>
                  {r.robotimage &&
                    <img className="" alt="" src={r.robotimage} width={85} />
                  }
                </td>
                <td>{r.drivetrain}</td>
                <td>{r.wheels}</td>
                <td>{r.intake}</td>
                <td style={r.canintakegroundcoral?{backgroundColor: "blue"}:{}}>{r.canintakegroundcoral?"yes":"no"}</td>
                <td style={r.canintakelollipopcoral?{backgroundColor: "blue"}:{}}>{r.canintakelollipopcoral?"yes":"no"}</td>
                <td style={r.canintakestationcoral?{backgroundColor: "blue"}:{}}>{r.canintakestationcoral?"yes":"no"}</td>
                <td style={r.canintakegroundalgae?{backgroundColor: "blue"}:{}}>{r.canintakegroundalgae?"yes":"no"}</td>
                <td style={r.canintakelollipopalgae?{backgroundColor: "blue"}:{}}>{r.canintakelollipopalgae?"yes":"no"}</td>
                <td style={r.canintakereefalgae?{backgroundColor: "blue"}:{}}>{r.canintakereefalgae?"yes":"no"}</td>
                <td style={r.canremovereefalgaewithoutintake?{backgroundColor: "blue"}:{}}>{r.canremovereefalgaewithoutintake?"yes":"no"}</td>
                <td style={r.canscorereefl1?{backgroundColor: "blue"}:{}}>{r.canscorereefl1?"yes":"no"}</td>
                <td style={r.canscorereefl2?{backgroundColor: "blue"}:{}}>{r.canscorereefl2?"yes":"no"}</td>
                <td style={r.canscorereefl3?{backgroundColor: "blue"}:{}}>{r.canscorereefl3?"yes":"no"}</td>
                <td style={r.canscorereefl4?{backgroundColor: "blue"}:{}}>{r.canscorereefl4?"yes":"no"}</td>
                <td style={r.canscorenet?{backgroundColor: "blue"}:{}}>{r.canscorenet?"yes":"no"}</td>
                <td style={r.canscoreprocessor?{backgroundColor: "blue"}:{}}>{r.canscoreprocessor?"yes":"no"}</td>
                <td style={r.canpark?{backgroundColor: "blue"}:{}}>{r.canpark?"yes":"no"}</td>
                <td style={r.canshallow?{backgroundColor: "blue"}:{}}>{r.canshallow?"yes":"no"}</td>
                <td style={r.candeep?{backgroundColor: "blue"}:{}}>{r.candeep?"yes":"no"}</td>
                <td style={r.hasauton?{backgroundColor: "blue"}:{}}>{r.hasauton?"yes":"no"}</td>
                <td>{Number(r.weight)}</td>
                <td style={{fontSize: "12px"}}>{r.comments}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  );
}
