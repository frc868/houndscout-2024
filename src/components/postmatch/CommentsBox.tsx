import { Form } from "react-bootstrap";

interface Props {
  contents: string;
  handleChange: (contents: string) => void;
  className?: string;
}

export default function CommentsBox({
  contents,
  handleChange,
  className,
}: Props) {
  return (
    <div className={`d-flex align-items-center flex-column ${className || ""}`}>
      <h1 className="text-center">Comments</h1>
      <Form className="w-100 mb-3">
        <Form.Group controlId="comments">
          <Form.Control
            className="bg-dark-subtle"
            as="textarea"
            rows={3}
            value={contents}
            onChange={(e) => handleChange(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
}
