/* eslint-disable @next/next/no-img-element */

interface Props {
  active: boolean
  selected: boolean;
  handleSelection: () => void;
  className?: string;
  text: string;
}

//A picture of the game piece used to indicate an intake location in teleop.
export default function LocationButton({
  active,
  selected,
  handleSelection,
  className,
  text,
}: Props) {
  return (
    <div className={className || ""}>
      <div
        className={`mx-2 grow d-flex justify-content-center align-items-center border border-5 rounded-4 ${
          selected
           ? `location-area-selected border-primary`
           : active
             ? `location-active border-secondary`
             : `bg-secondary-subtle border-secondary`
        }`}
        style={{ width: "110px", height: "75px" }}
        onMouseDown={handleSelection}
      >
        <h3>{text}</h3>
      </div>
    </div>
  );
}
