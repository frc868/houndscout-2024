import { Form } from "react-bootstrap";

interface Props {
    contents: string;
    handleChange: (contents: string) => void;
    className?: string;
}

// Text input box.
export default function CommentsBox({
    contents,
    handleChange,
    className,
}: Props) {
    const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleChange(e.target.value);
    };

    return (
        <div className={`d-flex align-items-center flex-column ${className || ""}`}>
            <h1 className="text-center mb-3">Comments</h1>
            <Form className="w-100 mb-3">
                <Form.Group controlId="comments">
                    <Form.Control
                        className="bg-light"
                        as="textarea"
                        rows={5}
                        value={contents}
                        onChange={onTextChange}
                        placeholder="Add your comments here..."
                        style={{ resize: "vertical" }}
                    />
                </Form.Group>
            </Form>
        </div>
    );
}
