/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { AutoStartingZone } from "@prisma/client";
import { Button } from "react-bootstrap";

interface Props {
  alliance: Alliance;
  blueOnLeft: boolean;
  selected: AutoStartingZone | undefined;
  handleSelection: (selected: AutoStartingZone) => void;
}

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
            src={
              alliance === Alliance.BLUE
                ? blueOnLeft
                  ? "/assets/blue_auto_left.png"
                  : "/assets/blue_auto_right.png"
                : blueOnLeft
                ? "/assets/red_auto_right.png"
                : "/assets/red_auto_left.png"
            }
            width={400}
          />
          {}
        </div>
        <div
          style={
            alliance === Alliance.BLUE
              ? blueOnLeft
                ? {
                    position: "absolute",
                    top: "120px",
                    left: "55px",
                  }
                : {
                    position: "absolute",
                    top: "450px",
                    left: "295px",
                  }
              : blueOnLeft
              ? {
                  position: "absolute",
                  top: "120px",
                  left: "295px",
                }
              : {
                  position: "absolute",
                  top: "450px",
                  left: "55px",
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
                ? {
                    position: "absolute",
                    top: "208px",
                    left: "85px",
                  }
                : {
                    position: "absolute",
                    top: "372px",
                    left: "275px",
                  }
              : blueOnLeft
              ? {
                  position: "absolute",
                  top: "203px",
                  left: "274px",
                }
              : {
                  position: "absolute",
                  top: "372px",
                  left: "87px",
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
              ? blueOnLeft
                ? {
                    position: "absolute",
                    top: "350px",
                    left: "55px",
                  }
                : {
                    position: "absolute",
                    top: "220px",
                    left: "295px",
                  }
              : blueOnLeft
              ? {
                  position: "absolute",
                  top: "350px",
                  left: "295px",
                }
              : {
                  position: "absolute",
                  top: "220px",
                  left: "55px",
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
