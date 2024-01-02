import { Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

interface Props {
  selected: "prematch" | "auto" | "teleop" | "postmatch";
  handleSelection: (
    selection: "prematch" | "auto" | "teleop" | "postmatch"
  ) => void;
}

export default function SectionSelector({ selected, handleSelection }: Props) {
  return (
    <div className="d-flex justify-content-evenly mx-5 my-4">
      {["prematch", "auto", "teleop", "postmatch"].map((item) => (
        <Button
          key={item}
          variant="secondary"
          className={`state-button fs-4 rounded-4 fw-bold ${
            selected === item && `${item}-button`
          }`}
          onClick={() => handleSelection(item as any)}
        >
          {item.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
