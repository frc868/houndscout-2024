/* eslint-disable @next/next/no-img-element */

import { Button } from "react-bootstrap";

interface Props {
  active: boolean;
  handleClick: () => void;
  className?: string;
}

export default function ClimbButton({ active, handleClick, className }: Props) {
  return (
    <div className={`d-flex justify-content-center w-100 ${className || ""}`}>
      <Button
        className="secondary-button fs-5 rounded-4 fw-bold w-100 px-4 py-2"
        variant="primary"
        onClick={handleClick}
      >
        {!active ? "Start" : "End"} Climb Attempt
      </Button>
    </div>
  );
}
