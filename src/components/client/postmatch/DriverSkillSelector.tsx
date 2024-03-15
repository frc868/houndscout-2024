/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";

interface Props {
  selected: number;
  handleSelection: (selection: number) => void;
}

export default function AutoScoringPanel({ selected, handleSelection }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center">Driver Skill</h1>

      <ListGroup horizontal className="mt-3 fs-4 ">
        {[1, 2, 3, 4, 5].map((item, idx) => (
          <ListGroup.Item
            key={item}
            className={`driver-skill-selector px-3 py-2 border-0 ${
              !(selected === item) ? "bg-dark-subtle" : ""
            }`}
            active={selected === item}
            onMouseDown={() => handleSelection(item)}
          >
            {item}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
