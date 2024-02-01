/* eslint-disable @next/next/no-img-element */

interface Props {
  name: string;
  selected: boolean;
  handleSelection: () => void;
  className?: string;
}

export default function IntakeGroup({
  name,
  selected,
  handleSelection,
  className,
}: Props) {
  return (
    <div className={`d-flex flex-column align-items-center ${className || ""}`}>
      <h5 className="text-center mb-3">{name}</h5>

      <div className="d-flex justify-content-center">
        <div
          className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4 ${
            selected ? `intake-cone-selected` : ""
          }`}
          style={{ width: "90px", height: "90px" }}
          onMouseDown={handleSelection}
        >
          <img className="" alt="" src={`/assets/ring.jpeg`} width={65} />
        </div>
        
      </div>
    </div>
  );
}
