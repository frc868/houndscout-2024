import { ListGroup, Row } from "react-bootstrap";
import ClimbButton from "../mini/ClimbButton";
import MiniToggleBox from "../mini/MiniToggleBox";
import { ClimbType } from "@prisma/client";

interface Props {
  active: boolean;
  climbType?: ClimbType;
  numRobots?: number;
  scoredInTrap: boolean;
  spotlit: boolean;
  handleStart: () => void;
  handleClimbTypeSelection: (climbType: ClimbType) => void;
  handleNumRobotsSelection: (numRobots: number) => void;
  handleScoredInTrapSelection: (scoredInTrap: boolean) => void;
  handleSpotlitSelection: (spotlit: boolean) => void;
}

export default function TeleopStagePanel({
  active,
  climbType,
  numRobots,
  scoredInTrap,
  spotlit,
  handleStart,
  handleClimbTypeSelection,
  handleNumRobotsSelection,
  handleScoredInTrapSelection,
  handleSpotlitSelection,
}: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-1">Stage</h1>
      {!active && (
        <div
          className="position-absolute bg-dark bg-opacity-25 rounded-5"
          style={{ top: "330px", width: "500px", height: "330px", zIndex: "5" }}
        ></div>
      )}
      <Row className="my-3">
        <ClimbButton active={active} handleClick={handleStart} />
      </Row>
      <Row className="my-3">
        <ListGroup className="stage-selector text-center fs-5">
          {[ClimbType.FAILED, ClimbType.PARKED, ClimbType.CLIMBED].map(
            (item) => (
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
            )
          )}
        </ListGroup>
      </Row>
      <Row className="my-3">
        <div className="d-flex">
          <div className="d-flex align-items-center flex-column mx-2">
            <h3 className="mb-3"># Robots</h3>
            <ListGroup horizontal className="stage-selector text-center fs-5">
              {[1, 2, 3].map((item) => (
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
