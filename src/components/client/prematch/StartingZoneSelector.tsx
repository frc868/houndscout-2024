/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { AutoStartingZone } from "@prisma/client";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import { Button } from "react-bootstrap";

interface Props {
  alliance: Alliance;
  blueOnLeft: boolean;
  selected: AutoStartingZone | undefined;
  handleSelection: (selected: AutoStartingZone) => void;
}

//Three radio buttons over a depiction of the starting zone.
export default function StartingZoneSelector({
  alliance,
  blueOnLeft,
  selected,
  handleSelection,
}: Props) {
  return (
    <div className="d-flex justify-content-center">
      <div className="position-relative">
        <div className="d-flex flex-column">
          <h1 className="text-center mb-3">Starting Position</h1>
          <img
            className="mx-auto"
            alt=""
            style={!blueOnLeft?{
              transform: 'rotate(180deg)',
              width: "75%",
              height: "auto"
            }:{
              width: "75%",
              height: "auto"
            }}
            src={
              alliance === Alliance.BLUE
                ? "/assets/blue_start_prematch.png"
                : "/assets/red_start_prematch.png"
            }
            width={400}
          />
          {}
        </div>
        <div
          style={
            alliance === Alliance.BLUE
              ? blueOnLeft
                ? {// Blueside button #1
                    position: "absolute",
                    top: "183px",
                    left: "525px",
                  }
                : {//Blueside button reverse
                    position: "absolute",
                    top: "195px",
                    left: "335px",
                  }
              : blueOnLeft //Redside button #1
              ? {
                  position: "absolute",
                  top: "189px",
                  left: "305px",
                }
              : {//redside button reverse
                  position: "absolute",
                  top: "425px",
                  left: "565px",
                }
          }
        >
          <Button
            variant={
              selected === AutoStartingZone.ONE ? "primary" : "secondary"
            }
            className="fw-bold"
            style={{ width: "50px" }}
            onMouseDown={() => handleSelection(AutoStartingZone.ONE)}
          >
            1
          </Button>
        </div>
        <div
          style={
            alliance === Alliance.BLUE
              ? blueOnLeft
                ? {//Blueside button #2
                    position: "absolute",
                    top: "289px",
                    left: "525px",
                  }
                : {//blueside button reverse
                    position: "absolute",
                    top: "314px",
                    left: "335px",
                  }
              : blueOnLeft //redside button #2
              ? {
                  position: "absolute",
                  top: "297px",
                  left: "305px",
                }
              : {//redside button reverse
                  position: "absolute",
                  top: "309px",
                  left: "565px",
                }
          }
        >
          <Button
            variant={
              selected === AutoStartingZone.TWO ? "primary" : "secondary"
            }
            className="fw-bold"
            style={{ width: "40px" }}
            onMouseDown={() => handleSelection(AutoStartingZone.TWO)}
          >
            2
          </Button>
        </div>
        <div
          style={
            alliance === Alliance.BLUE
              ? blueOnLeft //Blueside button #3
                ? {
                    position: "absolute",
                    top: "400px",
                    left: "525px",
                  }
                : { // Blueside button reverse 
                    position: "absolute",
                    top: "425px",
                    left: "335px",
                  }
              : blueOnLeft //Redside button #3
              ? {
                  position: "absolute",
                  top: "409px",
                  left: "305px",
                }
              : { //redside button reverse
                  position: "absolute",
                  top: "195px",
                  left: "565px",
                }
          }
        >
          <Button
            variant={
              selected == AutoStartingZone.THREE ? "primary" : "secondary"
            }
            className="fw-bold"
            style={{ width: "50px" }}
            onMouseDown={() => handleSelection(AutoStartingZone.THREE)}
          >
            3
          </Button>
        </div>
      </div>
    </div>
  );
}
