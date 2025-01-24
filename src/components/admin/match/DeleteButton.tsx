import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

interface Props {
  variant: string;
  handleDelete: () => void;
}

//If you see DeleteButton in common, I copied it over here because I wasn't sure how to connecct to that from admin.
export default function DeleteButton({ variant, handleDelete }: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  //This button will ask you to click a second time to actually go thorough with the process.
  //The window for the second click is 1.5 seconds.
  useEffect(() => {
    if (deleteConfirm) {
      const timeout = setTimeout(async () => {
        setDeleteConfirm(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [deleteConfirm]);

  return (
    <Button
      size="sm"
      className="mx-2"
      variant={variant}
      onClick={deleteConfirm ? handleDelete : () => setDeleteConfirm(true)}
    >
      {deleteConfirm ? "Confirm" : "Delete"}
    </Button>
  );
}
