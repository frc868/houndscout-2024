/* eslint-disable @next/next/no-img-element */

import { Button } from "react-bootstrap";

interface Props {
  handleClick: () => void;
}

export default function SubmitButton({ handleClick }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <Button
        className="submit-button fs-3 rounded-4 fw-bold"
        variant="success"
        onClick={handleClick}
      >
        Submit
      </Button>
    </div>
  );
}
