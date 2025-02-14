import { LegacyRef } from "react";

interface Props {
  active: boolean;
  handleClick: () => void;
  className?: string;
  ref: LegacyRef<HTMLDivElement>;
}

//Big fat fail button for when the robot fails to score.
export default function FailButton({ active, handleClick, className, ref }: Props) {
  return (
    <div className={className || ""}>
      <div
        className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
          active
            ? "bg-danger-subtle border-danger text-danger"
            : "bg-secondary-subtle border-secondary text-secondary"
        }`}
        style={{
          width: "100px",
          height: "100px",
          fontSize: "70pt",
          WebkitTextStroke: "4px",
        }}
        onMouseDown={handleClick}
        ref={ref}
      >
        <i className="bi bi-x" />
      </div>
    </div>
  );
}
