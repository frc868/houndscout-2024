/* eslint-disable @next/next/no-img-element */
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ReduxState } from "@/redux/store";

interface Props {
  selected: number | null;
  handleSelection: (selection: number) => void;
  presets: string[];
}

export default function AutoIntakePanel({
  selected,
  handleSelection,
  presets,
}: Props) {
  const mainData = useSelector((state: ReduxState) => state.mainData);
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-1">Intake</h1>

      <Row className={mainData.station?.includes("red")?"flex-row-reverse":"flex-row"}>
        <Col>
          <h3>Preload:</h3>
          <div
            key={0}
            className={`my-1 grow d-flex justify-content-center align-items-center rounded-4 ${selected === 0
                ? `intake-ring-selected`
                : ""
              }`}
            style={{ width: "75px", height: "75px" }}
            onMouseDown={() => handleSelection(0)}
          >
            <img
              className="mx-auto my-1"
              alt=""
              src={`/assets/ring.jpeg`}
              width={60}
            />
          </div>
        </Col>
        <Col>
          <img
            className="mx-auto my-1"
            alt=""
            src={mainData.station?.includes("red")?`/assets/speaker.png`:`/assets/speaker.png`}
            width={125}
          />
          {/* When the red speaker is ready replace the first img option here with it. */}
        </Col>
        <Col className="me-3">
          <div className="d-flex flex-column align-items-center">
            {presets.map((item, idx) => (
              <div
                key={idx}
                className={`my-1 grow d-flex justify-content-center align-items-center rounded-4 ${selected === idx
                    ? `intake-${item.toLowerCase()}-selected`
                    : ""
                  }`}
                style={{ width: "90px", height: "100px" }}
                onMouseDown={() => handleSelection(idx)}
              >
                <img
                  className="mx-auto my-1"
                  alt=""
                  src={`/assets/ring.jpeg`}
                  width={60}
                />
              </div>
            ))}
          </div>
        </Col>
        <Col className="me-5">
          <div className="d-flex flex-column align-items-center">
            {["RING", "RING", "RING", "RING", "RING"].map((item, idx) => (
              <div
                key={idx}
                className={`my-1 grow d-flex justify-content-center align-items-center rounded-4 ${selected === idx
                    ? `intake-${item.toLowerCase()}-selected`
                    : ""
                  }`}
                style={{ width: "90px", height: "70px" }}
                onMouseDown={() => handleSelection(idx)}
              >
                <img
                  className="mx-auto my-1"
                  alt=""
                  src={`/assets/ring.jpeg`}
                  width={60}
                />
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
