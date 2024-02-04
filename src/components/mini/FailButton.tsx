interface Props {
  active: boolean;
  handleClick: () => void;
}

export default function FailButton({
  active,
  handleClick,
}: Props) {
  return (
    <div
      className={`d-flex justify-content-center align-items-center border border-5 rounded-4 grow ${active
          ? "bg-danger-subtle border-danger text-danger"
          : "bg-secondary-subtle border-secondary text-secondary"
        }`}
      style={{
        width: "80px",
        height: "80px",
        fontSize: "50pt",
      }}
      onMouseDown={handleClick}
    >
      <i className="bi bi-x" />
    </div>
  );
}
