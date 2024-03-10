interface Props {
  active: boolean;
  handleClick: () => void;
  className?: string;
}

export default function ScoreButton({ active, handleClick, className }: Props) {
  return (
    <div className={className || ""}>
      <div
        className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
          active
            ? "bg-success-subtle border-success text-success"
            : "bg-secondary-subtle border-secondary text-secondary"
        }`}
        style={{
          width: "110px",
          height: "110px",
          fontSize: "90pt",
        }}
        onMouseDown={handleClick}
      >
        <i className="bi bi-check" />
      </div>
    </div>
  );
}
