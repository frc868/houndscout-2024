interface Props {
  name: string;
  active: boolean;
  handleClick: () => void;
  className?: string;
}

export default function ScoreButton({
  name,
  active,
  handleClick,
  className,
}: Props) {
  return (
    <div className={className || ""}>
      <h5 className="text-center">{name}</h5>
      <div
        className={`d-flex justify-content-center align-items-center border border-5 rounded-4 grow ${
          active
            ? "bg-success-subtle border-success text-success"
            : "bg-secondary-subtle border-secondary text-secondary"
        }`}
        style={{
          width: "80px",
          height: "80px",
          fontSize: "50pt",
        }}
        onMouseDown={handleClick}
      >
        <i className="bi bi-check-lg" />
      </div>
    </div>
  );
}
