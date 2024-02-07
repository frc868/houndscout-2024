/* eslint-disable @next/next/no-img-element */

import { Button } from "react-bootstrap";

interface Props {
  handleClick: () => void;
  className?: string;
}

export default function UndoButton({ handleClick, className }: Props) {
  return (
    <div className={`${className || ""}`}>
      <Button
        className="secondary-button fs-5 rounded-4 fw-bold"
        variant="danger"
        onClick={()=>handleClick()}
      >
        Undo
      </Button>
    </div>
  );
}
