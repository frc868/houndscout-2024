/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { Button } from "react-bootstrap";

interface Props {
  selected: number | undefined;
  handleSelection: (selected: number) => void;
}

export default function StartingZoneSelector({
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
            src={"/assets/blueStart.png"}
            width={400}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "102px",
            left: "137px",
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
          style={{
            position: "absolute",
            top: "230px",
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
          style={{
            position: "absolute",
            top: "358px",
            left: "195px",
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
