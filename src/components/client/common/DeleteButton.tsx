import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";

interface Props {
  variant: string;
  handleDelete: () => void;
}

export default function DeleteButton({ variant, handleDelete }: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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
      className="mt-1"
      variant={variant}
      onClick={deleteConfirm ? handleDelete : () => setDeleteConfirm(true)}
    >
      {deleteConfirm ? "Confirm" : "Delete"}
    </Button>
  );
}
