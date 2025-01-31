/* eslint-disable @next/next/no-img-element */

interface Props {
  selected: boolean;
  top: string;
  left: string;
  // handleSelection: () => void;
  className?: string;
  gamePiece: string;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function IntakeButton({
  selected,
  top,
  left,
  // handleSelection,
  className,
  gamePiece,
}: Props) {
  return (
    <div className={className || ""} style={{
      position: "absolute",
      top: top,
      left: left,
    }}>
      <div
        className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4 ${
          selected ? `intake-note-selected` : ""
        }`}
        style={{ width: "75px", height: "75px"}}
        //onMouseDown={handleSelection}
      >
        <img className="" alt="" src={gamePiece=="coral"?`/assets/coral_object.png`:`/assets/algae_object.png`} width={75} />
      </div>
    </div>
  );
}
