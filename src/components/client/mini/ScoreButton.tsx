import { LegacyRef } from "react";

interface Props {
  active: boolean;
  handleClick: () => void;
  className?: string;
  ref: LegacyRef<HTMLDivElement>;
}

//Button that indicates the robot scored!
export default function ScoreButton({ active, handleClick, className, ref }: Props) {
  return (
    <div className={className || ""}>
      <div
        className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
          active
            ? "bg-success-subtle border-success text-success"
            : "bg-secondary-subtle border-secondary text-secondary"
        }`}
        style={{
          width: "100px",
          height: "100px",
          fontSize: "90pt",
        }}
        onMouseDown={handleClick}
        ref={ref}
      >
        <i className="bi bi-check" />
      </div>
    </div>
  );
}
