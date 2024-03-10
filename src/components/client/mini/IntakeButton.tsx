/* eslint-disable @next/next/no-img-element */

interface Props {
  selected: boolean;
  handleSelection: () => void;
  className?: string;
}

export default function IntakeButton({
  selected,
  handleSelection,
  className,
}: Props) {
  return (
    <div className={className || ""}>
      <div
        className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4 ${
          selected ? `intake-note-selected` : ""
        }`}
        style={{ width: "110px", height: "110px" }}
        onMouseDown={handleSelection}
      >
        <img className="" alt="" src={`/assets/note.png`} width={85} />
      </div>
    </div>
  );
}
