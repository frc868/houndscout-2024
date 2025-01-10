/* eslint-disable @next/next/no-img-element */

import { Button } from "react-bootstrap";

interface Props {
  enabled: boolean;
  handleClick: () => void;
}

export default function StartButton({ enabled, handleClick }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <Button
        className="secondary-button fs-5 rounded-4 fw-bold"
        variant="success"
        onClick={handleClick}
        disabled={!enabled}
      >
        Waiting for lead scouter...
      </Button>
    </div>
  );
}
