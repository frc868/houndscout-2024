import ScoreButton from "./ScoreButton";
import FailButton from "./FailButton";
import { Row } from "react-bootstrap";

interface Props {
    name: string;
    successActive: boolean;
    handleSuccess: () => void;
    failActive: boolean;
    handleFail: () => void;
    className?: string;
}

export default function ScoreGroup({
    name,
    successActive,
    failActive,
    handleSuccess,
    handleFail,
    className,
}: Props) {
    return (
        <div className={`d-flex flex-column ${className || ""}`}>
            <h5 className="text-center">{name}</h5>
            <Row className="d-flex flex-row justify-content-around">
                <ScoreButton
                    active={successActive}
                    handleClick={() => handleSuccess()}
                />
                <FailButton
                    active={failActive}
                    handleClick={() => handleFail()}
                />
            </Row>
        </div>
    );
}
