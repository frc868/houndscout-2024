/* eslint-disable @next/next/no-img-element */
import { Col, Row } from "react-bootstrap";

interface Props {
  selected: number | null;
  handleSelection: (selection: number) => void;
}

//We could probably just divide intakes into the loading station and the field.
export default function AutoIntakePanel({
  selected,
  handleSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Intake</h1>

      <Row>
        <Col className="me-5">
          <div className="d-flex flex-column align-items-center">
            
          </div>
        </Col>
        <Col>
          <img
            className="mx-auto my-2"
            alt=""
            src={`/assets/blueAuto.png`}
            width={200}
          />
        </Col>
      </Row>
    </div>
  );
}
