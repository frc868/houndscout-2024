import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

interface Props {
  variant: string;
  handleDelete: () => void;
}

//This button is used to delete matches, scouters, teams and events.
//As a safety measure, delete buttons open a confirmation alert before actually going through with it.
export default function DeleteButton({ variant, handleDelete }: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const checkForDelete=()=>{
    if(confirm("Are you sure you want to delete this?")==true){
      handleDelete();
    }
  }

  return (
    <Button
      size="sm"
      className="mx-2"
      variant={variant}
      onClick={checkForDelete}
    >
      Delete
    </Button>
  );
}
