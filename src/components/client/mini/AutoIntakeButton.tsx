/* eslint-disable @next/next/no-img-element */

interface Props {
  active: boolean;
  selected: boolean;
  top?: string;
  left?: string;
  handleSelection: () => void;
  className?: string;
  gamePiece: string;
  number: string;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function IntakeButton({
  active,
  selected,
  top,
  left,
  handleSelection,
  className,
  gamePiece,
  number,
}: Props) {
  function checkForSelection(){
    if(active){
      handleSelection();
    }
  }
  return (
    <div className={className || ""} style={{
      position: "absolute",
      top: top,
      left: left,
    }}>
      <div
        className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4 ${
          selected
           ? `intake-note-selected border border-5 border-warning`
           : active
             ? `intake-note-selected`
             : ``
        }`}
        style={{ width: "50px", height: "50px", position: "relative"}}
        onMouseDown={checkForSelection}
      >
        <img className="" alt="" src={gamePiece=="coral"?`/assets/coral_object.png`:`/assets/algae_object.png`} width={75} />
        <p style={{position: "absolute", top: "13px"}}>{number}</p>
      </div>
    </div>
  );
}
