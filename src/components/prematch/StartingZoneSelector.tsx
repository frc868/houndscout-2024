/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";
interface Props {
  selected: number | undefined;
  handleSelection: (selected: number) => void;
}

export default function StartingZoneSelector({
  selected,
  handleSelection,
}: Props) {
  const mainData = useSelector((state: ReduxState) => state.mainData);
  return (
    <div className="d-flex justify-content-center">
      <div className="position-relative">
        <div className="d-flex flex-column">
          <h1 className="text-center mb-3">Starting Position</h1>
          <img
            className="ml-auto my-auto"
            alt=""
            src={mainData.station?.includes("red") ? `/assets/speaker.png` : `/assets/speaker.png`}
            width={150}
            height={300}
          />
          {/* When the red speaker is ready replace the first img option here with it. */}
        </div>
        <div
          style={mainData.station?.includes("red") ? {
            position: "absolute",
            top: "75px",
            right: "125px",
          } : {
            position: "absolute",
            top: "75px",
            left: "125px",
          }}
        >
          <Button
            variant={selected == 3 ? "primary" : "secondary"}
            className="fw-bold"
            style={{ width: "70px" }}
            onMouseDown={() => handleSelection(3)}
          >
            3
          </Button>
        </div>
        <div
          style={mainData.station?.includes("red") ? {
            position: "absolute",
            top: "200px",
            right: "200px",
          } : {
            position: "absolute",
            top: "200px",
            left: "200px",
          }}
        >
          <Button
            variant={selected == 2 ? "primary" : "secondary"}
            className="fw-bold"
            style={{ width: "70px" }}
            onMouseDown={() => handleSelection(2)}
          >
            2
          </Button>
        </div>
        <div
          style={mainData.station?.includes("red") ? {
            position: "absolute",
            top: "325px",
            right: "125px",
          } : {
            position: "absolute",
            top: "325px",
            left: "125px",
          }}
        >
          <Button
            variant={selected == 1 ? "primary" : "secondary"}
            className="fw-bold"
            style={{ width: "70px" }}
            onMouseDown={() => handleSelection(1)}
          >
            1
          </Button>
        </div>
      </div>
    </div>
  );
}
