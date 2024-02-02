/* eslint-disable @next/next/no-img-element */
import { Col, Row } from "react-bootstrap";

interface Props {
  selected: number | null;
  handleSelection: (selection: number) => void;
  presets: ("CONE" | "CUBE")[];
}

export default function AutoIntakePanel({
  selected,
  handleSelection,
  presets,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-1">Intake</h1>

      <Row>
        <Col>
          <img
            className="mx-auto my-1"
            alt=""
            src={`/assets/speaker.png`}
            width={150}
          />
        </Col>
        <Col className="me-5">
          <div className="d-flex flex-column align-items-center">
            {presets.map((item, idx) => (
              <div
                key={idx}
                className={`my-1 grow d-flex justify-content-center align-items-center rounded-4 ${
                  selected === idx
                    ? `intake-${item.toLowerCase()}-selected`
                    : ""
                }`}
                style={{ width: "100px", height: "120px" }}
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
