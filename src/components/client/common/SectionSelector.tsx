import { Section } from "@prisma/client";
import { Button } from "react-bootstrap";

interface Props {
  selected: Section;
  handleSelection: (selection: Section) => void;
}

export default function SectionSelector({ selected, handleSelection }: Props) {
  return (
    <div className="d-flex justify-content-evenly mx-5 py-4">
      {[Section.PREMATCH, Section.AUTO, Section.TELEOP, Section.POSTMATCH].map(
        (item) => (
          <Button
            key={item}
            variant="secondary"
            className={`state-button fs-4 rounded-4 fw-bold ${
              selected === item && `${item.toLowerCase()}-button`
            }`}
            onClick={() => handleSelection(item)}
          >
            {item.toUpperCase()}
          </Button>
        )
      )}
    </div>
  );
}
