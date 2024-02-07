/* eslint-disable @next/next/no-img-element */

import { Button } from "react-bootstrap";

interface Props {
  active: boolean;
  handleClick: (selection: true | false) => void;
  className?: string;
}

export default function ChargeButton({
  active,
  handleClick,
  className,
}: Props) {
  return (
    <div className={`d-flex justify-content-center ${className || ""}`}>
      <Button
        className="secondary-button fs-5 rounded-4 fw-bold"
        variant="primary"
        onClick={()=>handleClick(!active)}
      >
        {!active ? "Start" : "Cancel"} Climb Attempt
      </Button>
    </div>
  );
}
