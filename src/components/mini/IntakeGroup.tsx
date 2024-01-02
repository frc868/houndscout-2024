/* eslint-disable @next/next/no-img-element */

interface Props {
  name: string;
  coneSelected: boolean;
  cubeSelected: boolean;
  handleConeSelection: () => void;
  handleCubeSelection: () => void;
  className?: string;
}

export default function IntakeGroup({
  name,
  coneSelected,
  cubeSelected,
  handleConeSelection,
  handleCubeSelection,
  className,
}: Props) {
  return (
    <div className={`d-flex flex-column align-items-center ${className || ""}`}>
      <h5 className="text-center mb-3">{name}</h5>

      <div className="d-flex justify-content-center">
        <div
          className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4 ${
            coneSelected ? `intake-cone-selected` : ""
          }`}
          style={{ width: "90px", height: "90px" }}
          onMouseDown={handleConeSelection}
        >
          <img className="" alt="" src={`/assets/cone.png`} width={65} />
        </div>
        <div
          className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4 ${
            cubeSelected ? `intake-cube-selected` : ""
          }`}
          style={{ width: "90px", height: "90px" }}
          onMouseDown={handleCubeSelection}
        >
          <img className="" alt="" src={`/assets/cube.png`} width={65} />
        </div>
      </div>
    </div>
  );
}
