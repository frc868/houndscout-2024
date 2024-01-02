/* eslint-disable @next/next/no-img-element */

interface Props {
  selected: ("CONE" | "CUBE")[];
  handleSelection: (selected: ("CONE" | "CUBE")[]) => void;
}

export default function PresetSelector({ selected, handleSelection }: Props) {
  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center mb-3">Preset Pieces</h1>

      {selected.map((item, idx) => (
        <img
          key={idx}
          className="mx-auto my-2"
          alt=""
          src={`/assets/${item.toLowerCase()}.png`}
          width={65}
          onMouseDown={() => {
            handleSelection(
              selected.map((value, index) =>
                index === idx ? (value === "CONE" ? "CUBE" : "CONE") : value
              )
            );
          }}
        />
      ))}
    </div>
  );
}
