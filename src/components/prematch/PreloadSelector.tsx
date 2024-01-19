//THIS WILL NOT BE USED AS THERE IS ONLY ONE POSSIBLE PRELOAD.

// /* eslint-disable @next/next/no-img-element */

// interface Props {
//   selected: "CONE" | "CUBE";
//   handleSelection: (selected: "CONE" | "CUBE") => void;
//   className?: string;
// }

// export default function PreloadSelector({
//   selected,
//   handleSelection,
//   className,
// }: Props) {
//   return (
//     <div className={`d-flex flex-column align-items-center ${className || ""}`}>
//       <h1 className="text-center mb-3">Preload</h1>

//       <img
//         className="mx-auto my-2"
//         alt=""
//         src={`/assets/${selected.toLowerCase()}.png`}
//         width={65}
//         onMouseDown={() => {
//           handleSelection(selected === "CONE" ? "CUBE" : "CONE");
//         }}
//       />
//     </div>
//   );
// }
