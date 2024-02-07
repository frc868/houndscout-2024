interface Props {
  name: string;
  enabled: boolean;
  handleClick: () => void;
  className?: string;
}

export default function ToggleBox({
  name,
  enabled,
  handleClick,
  className,
}: Props) {
  return (
    <div className={`d-flex align-items-center flex-column ${className || ""}`}>
      <h6 className="text-center">{name}</h6>

      <div
        className={`d-flex justify-content-center align-items-center rounded-4 mt-3 ${
          enabled ? "text-success bg-success-subtle" : "bg-dark-subtle"
        }`}
        style={{
          width: "60px",
          height: "60px",
          fontSize: "30pt",
        }}
        onMouseDown={handleClick}
      >
        {enabled && <i className="bi bi-check-lg" />}
      </div>
    </div>
  );
}
