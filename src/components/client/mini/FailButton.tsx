interface Props {
  active: boolean;
  handleClick: () => void;
  className?: string;
}

export default function FailButton({ active, handleClick, className }: Props) {
  return (
    <div className={className || ""}>
      <div
        className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
          active
            ? "bg-danger-subtle border-danger text-danger"
            : "bg-secondary-subtle border-secondary text-secondary"
        }`}
        style={{
          width: "110px",
          height: "110px",
          fontSize: "70pt",
          WebkitTextStroke: "4px",
        }}
        onMouseDown={handleClick}
      >
        <i className="bi bi-x" />
      </div>
    </div>
  );
}
