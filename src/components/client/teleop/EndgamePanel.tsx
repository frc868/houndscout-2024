import { ListGroup, Row, Col } from "react-bootstrap";
import MiniToggleBox from "../mini/MiniToggleBox";
import { EndgameType } from "@prisma/client";

interface Props {
  endgameType?: EndgameType;
  endgameSuccess: boolean;
  handleEndgameTypeSelection: (endgameType: EndgameType) => void;
  handleSuccessSelection: (scoredInTrap: boolean) => void;
}

//Endgame stuff.
export default function EndgamePanel({
  endgameType,
  endgameSuccess,
  handleEndgameTypeSelection,
  handleSuccessSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3 w-100">Endgame</h1>
      <Col className="mx-3">
        <ListGroup className="stage-selector text-center fs-5 ">
          {[EndgameType.NONE, EndgameType.PARKED, EndgameType.SHALLOW, EndgameType.DEEP].map((item) => (
            <ListGroup.Item
              key={item}
              className={`px-3 py-2 border-0 ${
                endgameType !== item ? "bg-dark-subtle" : ""
              }`}
              active={endgameType === item}
              onMouseDown={() => {
                handleEndgameTypeSelection(item);
                if(item==EndgameType.NONE) handleSuccessSelection(!endgameSuccess);
              }}
            >
              {item[0].toUpperCase()}
              {item.substring(1).toLowerCase()}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col className="my-4">
        <div className="d-flex">
          <MiniToggleBox
            className="mx-2"
            name="Success?"
            enabled={endgameSuccess}
            handleClick={() => {
              if (endgameType != EndgameType.NONE) handleSuccessSelection(!endgameSuccess)
            }}
          />
        </div>
      </Col>
    </div>
  );
}
