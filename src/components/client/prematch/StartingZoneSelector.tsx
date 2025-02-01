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
          <h1 className="text-center">Starting Position</h1>
          <img
            className="mx-auto"
            alt=""
            style={{
              width: "65%",
              height: "auto",
              transform: !blueOnLeft?'rotate(180deg)':"",
            }}
            src={
              alliance === Alliance.BLUE
                ? "/assets/blue_start_prematch.png"
                : "/assets/red_start_prematch.png"
            }
          />
        </div>
        <div
          //Position 1
          style={
            alliance === Alliance.BLUE
              ? blueOnLeft 
                ? { position: "absolute", top: "26%", left: "60%" } // Blueside button
                : { position: "absolute", top: "80%", left: "35%" } // Blueside button reverse
              : blueOnLeft 
                ? { position: "absolute", top: "27%", left: "30%" } // Redside button
                : { position: "absolute", top: "79%", left: "65%" } // Redside button reverse
          }
        >
          <Button
            variant={ selected === AutoStartingZone.TWO ? "primary" : "secondary" }
            className="fw-bold"
            style={{ width: "40px" }}
            onMouseDown={() => handleSelection(AutoStartingZone.ONE)}
          >
            1
          </Button>
        </div>
        <div
          //Position 2
          style={
            alliance === Alliance.BLUE
              ? blueOnLeft 
                ? { position: "absolute", top: "51%", left: "60%" } // Blueside button
                : { position: "absolute", top: "55%", left: "35%" } // Blueside button reverse
              : blueOnLeft 
                ? { position: "absolute", top: "52%", left: "30%" } // Redside button
                : { position: "absolute", top: "54%", left: "65%" } // Redside button reverse
          }
        >
          <Button
            variant={ selected === AutoStartingZone.TWO ? "primary" : "secondary" }
            className="fw-bold"
            style={{ width: "40px" }}
            onMouseDown={() => handleSelection(AutoStartingZone.TWO)}
          >
            2
          </Button>
        </div>
        <div
          //Position 3
          style={
            alliance === Alliance.BLUE
              ? blueOnLeft 
                ? { position: "absolute", top: "76%", left: "60%" } // Blueside button
                : { position: "absolute", top: "30%", left: "35%" } // Blueside button reverse
              : blueOnLeft 
                ? { position: "absolute", top: "77%", left: "30%" } // Redside button
                : { position: "absolute", top: "29%", left: "65%" } // Redside button reverse
          }
        >
          <Button
            variant={ selected === AutoStartingZone.TWO ? "primary" : "secondary" }
            className="fw-bold"
            style={{ width: "40px" }}
            onMouseDown={() => handleSelection(AutoStartingZone.THREE)}
          >
            3
          </Button>
        </div>
      </div>
    </div>
  );
}
