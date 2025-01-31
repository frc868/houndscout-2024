/* eslint-disable @next/next/no-img-element */
import { Col, ListGroup, Row } from "react-bootstrap";
import { Result } from "@prisma/client";
import ScoreButton from "../mini/ScoreButton";
import FailButton from "../mini/FailButton";

interface Props {
  selected: Result;
  handleSelection: (selection: Result) => void;
}

//Allows rating of driver skill.
export default function ResultSelector({ selected, handleSelection }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center">Driver Skill</h1>

      <ListGroup horizontal className="mt-3 fs-4 ">
        {[Result.WIN, Result.TIE, Result.LOSS].map((item, idx) => (
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
