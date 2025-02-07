/* eslint-disable @next/next/no-img-element */

interface Props {
  active: boolean;
  // handleSelection: () => void;
  className?: string;
  gamePiece: string;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function DroppedButton({
  active,
  // handleSelection,
  className,
  gamePiece,
}: Props) {
  return (
    <div className={className || ""}>
      <div
        className={`mx-2 grow d-flex justify-content-center align-items-center border border-5 rounded-4 ${
          active
            ? "bg-danger-subtle border-danger"
            : "bg-secondary-subtle border-secondary"
        }`}
        style={{ width: "75px", height: "75px" }}
        //onMouseDown={handleSelection}
      >
        <img className="" alt="" src={gamePiece=="coral"?`/assets/coral_object.png`:`/assets/algae_object.png`} width={85} />
      </div>
    </div>
  );
}
