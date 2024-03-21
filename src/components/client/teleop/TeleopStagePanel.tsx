import { ListGroup, Row } from "react-bootstrap";
import ClimbButton from "../mini/ClimbButton";
import MiniToggleBox from "../mini/MiniToggleBox";
import { ClimbType } from "@prisma/client";

interface Props {
  climbType?: ClimbType;
  numRobots?: number;
  scoredInTrap: boolean;
  spotlit: boolean;
  handleClimbTypeSelection: (climbType: ClimbType) => void;
  handleNumRobotsSelection: (numRobots: number) => void;
  handleScoredInTrapSelection: (scoredInTrap: boolean) => void;
  handleSpotlitSelection: (spotlit: boolean) => void;
}

export default function TeleopStagePanel({
  climbType,
  numRobots,
  scoredInTrap,
  spotlit,
  handleClimbTypeSelection,
  handleNumRobotsSelection,
  handleScoredInTrapSelection,
  handleSpotlitSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3 w-100">Endgame</h1>
      <Row className="my-3">
        <ListGroup className="stage-selector text-center fs-5">
          {[ClimbType.NONE, ClimbType.PARKED, ClimbType.CLIMBED].map((item) => (
            <ListGroup.Item
              key={item}
              className={`px-3 py-2 ${
                climbType !== item ? "bg-dark-subtle" : ""
              }`}
              active={climbType === item}
              onMouseDown={() => handleClimbTypeSelection(item)}
            >
              {item[0].toUpperCase()}
              {item.substring(1).toLowerCase()}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
      <Row className="my-4">
        <div className="d-flex">
          <div className="d-flex align-items-center flex-column mx-1">
            <h3 className="mb-3 text-center ">
              # Robots<br></br>On Same Chain
            </h3>
            <ListGroup horizontal className="stage-selector text-center fs-5">
              {[0, 1, 2, 3].map((item) => (
                <ListGroup.Item
                  key={item}
                  className={`px-3 py-2 ${
                    numRobots !== item ? "bg-dark-subtle" : ""
                  }`}
                  active={numRobots === item}
                  onMouseDown={() => handleNumRobotsSelection(item)}
                >
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <MiniToggleBox
            className="mx-2"
            name="Scored in Trap"
            enabled={scoredInTrap}
            handleClick={() => handleScoredInTrapSelection(!scoredInTrap)}
          />
          <MiniToggleBox
            className="mx-2"
            name="Spotlit"
            enabled={spotlit}
            handleClick={() => handleSpotlitSelection(!spotlit)}
          />
        </div>
      </Row>
    </div>
  );
}

{
  /*  */
}
