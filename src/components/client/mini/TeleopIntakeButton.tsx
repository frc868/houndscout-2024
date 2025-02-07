/* eslint-disable @next/next/no-img-element */

interface Props {
  active: boolean;
  selected: boolean;
  handleSelection: () => void;
  className?: string;
  gamePiece: string;
  number?: string;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function IntakeButton({
  active,
  selected,
  handleSelection,
  className,
  gamePiece,
  number,
}: Props) {
  return (
    <div className={className || ""}>
      <div
        className={`grow d-flex justify-content-center align-items-center rounded-4 ${
          selected
           ? `intake-note-selected border border-5 border-warning`
           : active
             ? `intake-note-selected`
             : ``
        }`}
        style={{ width: "75px", height: "75px", position: "relative" }}
        onMouseDown={handleSelection}
      >
        <img className="" alt="" src={gamePiece=="coral"?`/assets/coral_object.png`:`/assets/algae_object.png`} width={85} />
        <p style={{position: "absolute", top: "25px"}}>{number}</p>
      </div>
    </div>
  );
}
