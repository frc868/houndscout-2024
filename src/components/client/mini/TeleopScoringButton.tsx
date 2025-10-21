/* eslint-disable @next/next/no-img-element */

interface Props {
  active: boolean
  selected: boolean;
  handleSelection: () => void;
  handleCancel: () => void;
  className?: string;
  text: string;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function LocationButton({
  active,
  selected,
  handleSelection,
  handleCancel,
  className,
  text,
}: Props) {
  function checkForSelection(){
    if(active){
      handleSelection();
    } else if (selected){
      handleCancel();
    }
  }
  return (
    <div className={className || ""}>
      <div
        className={`grow d-flex justify-content-center align-items-center rounded-4 ${
          selected
           ? `location-area-selected border border-5 border-primary`
           : active
             ? `location-active`
             : `bg-secondary-subtle`
        }`}
        style={{ width: "75px", height: "55px" }}
        onMouseDown={checkForSelection}
      >
        <h4 className="text-center mt-2">{text}</h4>
      </div>
    </div>
  );
}
