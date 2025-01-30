/* eslint-disable @next/next/no-img-element */

interface Props {
  selected: boolean;
  // handleSelection: () => void;
  className?: string;
  gamePiece: string;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function IntakeButton({
  selected,
  // handleSelection,
  className,
  gamePiece,
}: Props) {
  return (
    <div className={className || ""}>
      <div
        className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4 ${
          selected ? `intake-note-selected` : ""
        }`}
        style={{ width: "110px", height: "110px" }}
        //onMouseDown={handleSelection}
      >
        <img className="" alt="" src={gamePiece=="coral"?`/assets/coral_object.png`:`/assets/algae_object.png`} width={85} />
      </div>
    </div>
  );
}
