//Feel free to use this page to create boilerplates for the app without relying on data.

"use client"
/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { Button, Col, Row } from "react-bootstrap";
import ReefSideButton from "@/components/sandbox/SandboxReefSideButton";
import AutoIntakeButton from "@/components/sandbox/SandboxAutoIntakeButton";
import TeleopIntakeButton from "@/components/sandbox/SandboxTeleopIntakeButton";
import FailButton from "@/components/sandbox/SandboxFailButton";
import ScoreButton from "@/components/sandbox/SandboxScoreButton";
import LocationButton from "@/components/sandbox/SandboxLocationButton";
import DroppedButton from "@/components/sandbox/SandboxDroppedButton";
import { useState } from "react";

export default function Sandbox() {
    //Update these variables to change certain aspects of the boilerplate.
    const [allianceIsBlue, setAllianceIsBlue] = useState(true); //If running blue or red client
    const [blueOnLeft, setBlueOnLeft] = useState(true); //If blueOnLeft is enabled in database

    const [active, setActive] = useState(true); //If the scoring sections are to be highlighted due to intake piece being selected
    const [selected, setSelected] = useState(true); //If the piece was selected in the intake section

    return(
        <>
            <div className="d-flex flex-row justify-content-center">
                <Button
                    className="fw-bold"
                    onMouseDown={() => setAllianceIsBlue(!allianceIsBlue)}
                >
                    Change Alliance 
                </Button>
                <Button
                    className="fw-bold"
                    onMouseDown={() => setBlueOnLeft(!blueOnLeft)}
                >
                    Change Field Orientation 
                </Button>
            </div>
            {/* StartingPositionSelector */}
            <div className="d-flex justify-content-center">
                <div className="position-relative">
                    <div className="d-flex flex-column">
                        <h1 className="text-center">Starting Position</h1>
                        <img
                            className="mx-auto"
                            alt=""
                            style={{
                                width: "65%",
                                height: "auto",
                                transform: !blueOnLeft?'rotate(180deg)':"",
                            }}
                            src={
                                allianceIsBlue //replace with "alliance === Alliance.BLUE"
                                ? "/assets/blue_start_prematch.png"
                                : "/assets/red_start_prematch.png"
                            }
                            />
                            {}
                    </div>
                    <div
                        //Position 1
                        style={
                        allianceIsBlue //replace with "alliance === Alliance.BLUE"
                            ? blueOnLeft 
                            ? { position: "absolute", top: "26%", left: "60%" } // Blueside button
                            : { position: "absolute", top: "80%", left: "35%" } // Blueside button reverse
                            : blueOnLeft 
                            ? { position: "absolute", top: "27%", left: "30%" } // Redside button
                            : { position: "absolute", top: "79%", left: "65%" } // Redside button reverse
                        }
                    >
                        <Button
                        variant="primary"// replace with "variant={ selected === AutoStartingZone.ONE ? "primary" : "secondary" }"
                        className="fw-bold"
                        style={{ width: "40px" }}
                        // onMouseDown={() => handleSelection(AutoStartingZone.ONE)}
                        >
                        1
                        </Button>
                    </div>
                    <div
                        //Position 2
                        style={
                        allianceIsBlue //replace with "alliance === Alliance.BLUE"
                            ? blueOnLeft 
                            ? { position: "absolute", top: "51%", left: "60%" } // Blueside button
                            : { position: "absolute", top: "55%", left: "35%" } // Blueside button reverse
                            : blueOnLeft 
                            ? { position: "absolute", top: "52%", left: "30%" } // Redside button
                            : { position: "absolute", top: "54%", left: "65%" } // Redside button reverse
                        }
                    >
                        <Button
                        variant="primary"// replace with "variant={ selected === AutoStartingZone.ONE ? "primary" : "secondary" }"
                        className="fw-bold"
                        style={{ width: "40px" }}
                        // onMouseDown={() => handleSelection(AutoStartingZone.TWO)}
                        >
                        2
                        </Button>
                    </div>
                    <div
                        //Position 3
                        style={
                        allianceIsBlue //replace with "alliance === Alliance.BLUE"
                            ? blueOnLeft 
                            ? { position: "absolute", top: "76%", left: "60%" } // Blueside button
                            : { position: "absolute", top: "30%", left: "35%" } // Blueside button reverse
                            : blueOnLeft 
                            ? { position: "absolute", top: "77%", left: "30%" } // Redside button
                            : { position: "absolute", top: "29%", left: "65%" } // Redside button reverse
                        }
                    >
                        <Button
                        variant="primary"// replace with "variant={ selected === AutoStartingZone.ONE ? "primary" : "secondary" }"
                        className="fw-bold"
                        style={{ width: "40px" }}
                        // onMouseDown={() => handleSelection(AutoStartingZone.THREE)}
                        >
                        3
                        </Button>
                    </div>
                </div>
            </div>

            <div className="d-flex flex-row justify-content-center pt-5">
                <Button
                    className="fw-bold"
                    onMouseDown={() => setActive(!active)}
                >
                    Toggle Active Button Highlights
                </Button>
                <Button
                    className="fw-bold"
                    onMouseDown={() => setSelected(!selected)}
                >
                    Toggle Selected Button Highlights 
                </Button>
            </div>
            {/* TeleopIntakePanel */}
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center mb-3">Intake</h1>
                <div className="d-flex justify-content-center flex-column">
                    <div className="d-flex flex-column my-2">
                        <h3 className="text-center">Coral</h3>
                        {/* AlgaeButton */}
                        <div className="mt-2">{/* Replace with <div className={className || ""}> */}
                            <div
                                className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4
                                ${selected ? `intake-note-selected` : ""}
                                `}
                                style={{ width: "110px", height: "110px" }}
                                // onMouseDown={handleSelection}
                            >
                                <img className="" alt="" src={`/assets/algae_object.png`} width={85} />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column my-2">
                        <h3 className="text-center">Algae</h3>
                        {/* CoralButton */}
                        <div className=""
                            // {className || ""}
                            >
                            <div
                                className={`mx-2 grow d-flex justify-content-center align-items-center rounded-4
                                ${selected ? `intake-note-selected` : ""}
                                `}
                                style={{ width: "110px", height: "110px" }}
                                // onMouseDown={handleSelection}
                            >
                                <img className="" alt="" src={`/assets/coral_object.png`} width={85} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TeleopScoringPanel */}
            <div className="d-flex flex-column align-items-center">
                <h1 className="text-center mb-1">Scoring</h1>
                <Row>
                    <Col>
                        <div className="d-flex flex-column my-3">
                            <h3 className="text-center">Speaker</h3>
                            <div className="d-flex justify-content-center">
                                {/* scoreButton */}
                                <div className="mx-3 my-2">{/* Replace with <div className={className || ""}> */}
                                    <div
                                        className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
                                        active
                                            ? "bg-success-subtle border-success text-success"
                                            : "bg-secondary-subtle border-secondary text-secondary"
                                        }`}
                                        style={{
                                        width: "110px",
                                        height: "110px",
                                        fontSize: "90pt",
                                        }}
                                        // onMouseDown={handleClick}
                                    >
                                        <i className="bi bi-check" />
                                    </div>
                                </div>
                                {/* FailButton */}
                                <div className="mx-3 my-2">{/* Replace with <div className={className || ""}> */}
                                    <div
                                        className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
                                        active
                                            ? "bg-danger-subtle border-danger text-danger"
                                            : "bg-secondary-subtle border-secondary text-secondary"
                                        }`}
                                        style={{
                                        width: "110px",
                                        height: "110px",
                                        fontSize: "70pt",
                                        WebkitTextStroke: "4px",
                                        }}
                                        // onMouseDown={handleClick}
                                    >
                                        <i className="bi bi-x" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column my-3">
                            <h3 className="text-center">Amp</h3>
                            <div className="d-flex justify-content-center">
                                {/* scoreButton */}
                                <div className="mx-3 my-2">{/* Replace with <div className={className || ""}> */}
                                    <div
                                        className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
                                        active
                                            ? "bg-success-subtle border-success text-success"
                                            : "bg-secondary-subtle border-secondary text-secondary"
                                        }`}
                                        style={{
                                        width: "110px",
                                        height: "110px",
                                        fontSize: "90pt",
                                        }}
                                        // onMouseDown={handleClick}
                                    >
                                        <i className="bi bi-check" />
                                    </div>
                                </div>
                                {/* FailButton */}
                                <div className="mx-3 my-2">{/* Replace with <div className={className || ""}> */}
                                    <div
                                        className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
                                        active
                                            ? "bg-danger-subtle border-danger text-danger"
                                            : "bg-secondary-subtle border-secondary text-secondary"
                                        }`}
                                        style={{
                                        width: "110px",
                                        height: "110px",
                                        fontSize: "70pt",
                                        WebkitTextStroke: "4px",
                                        }}
                                        // onMouseDown={handleClick}
                                    >
                                        <i className="bi bi-x" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center align-items-center my-3">
                        <h3 className="text-center">Dropped</h3>
                        {/* FailButton */}
                        <div className="mx-3 my-2">{/* Replace with <div className={className || ""}> */}
                            <div
                                className={`d-flex justify-content-center align-items-center border border-5 score-button rounded-4 grow ${
                                active
                                    ? "bg-danger-subtle border-danger text-danger"
                                    : "bg-secondary-subtle border-secondary text-secondary"
                                }`}
                                style={{
                                width: "110px",
                                height: "110px",
                                fontSize: "70pt",
                                WebkitTextStroke: "4px",
                                }}
                                // onMouseDown={handleClick}
                            >
                                <i className="bi bi-x" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            {/* New Teleop Tab */}
            <div className="d-flex flex-column align-items-center">
                <h1>Teleop</h1>
                <Row className="d-flex justify-content-center" style={{backgroundColor:"yellow"}}>
                    <Col className="d-flex" style={{backgroundColor:"purple"}}>
                        <h1 className="text-center mb-1">Coral</h1>
                        {/* Coral here */}
                    </Col>
                    <Col className="d-flex" style={{backgroundColor:"green"}}>
                        <h1 className="text-center mb-1">Algae</h1>
                        {/* Algae here */}
                    </Col>
                </Row>
                <Row className="d-flex flex-row" style={{backgroundColor:"red"}}>
                    {/* Failed and Dropped buttons here */}
                    <div className="d-flex justify-content-center">
                        <DroppedButton
                        className="mx-3 my-2"
                        active={active}
                        gamePiece="coral"
                        //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                        />
                        <DroppedButton
                        className="mx-3 my-2"
                        active={active}
                        gamePiece="algae"
                        //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                        />
                    </div>
                </Row>
            </div>

            <Row className="d-flex flex-row">
                
                
                
            </Row>

            {/* Auto Coral Game Piece Selector */}
            <div className="d-flex flex-column align-items-center" style={{width: "50vw"}}>
                <h1>Auto Coral Game Piece Selector</h1>
                <Row className="d-flex justify-content-center">
                    <Col className="d-flex flex-column flex-grow-1" style={{backgroundColor:"orange"}}>
                        <h1 className="text-center mb-1">Intake</h1>
                        {/* Copy everything in this div. */}
                            <div className="d-flex flex-column">
                                <h3 className="text-center">G1</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
                                    active={active}
                                    selected={selected}
                                    //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                    gamePiece="coral"
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <h3 className="text-center">G2</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
                                    active={active}
                                    selected={selected}
                                    //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                    gamePiece="coral"
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <h3 className="text-center">G3</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
                                    active={active}
                                    selected={selected}
                                    //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                    gamePiece="coral"
                                />
                            </div>
                    </Col>
                    <Col className="d-flex flex-column flex-shrink-1" style={{backgroundColor:"purple"}}>
                        <h1 className="text-center mb-1">Scoring</h1>
                        <Row>
                            <Col>
                                <div className="d-flex flex-column">
                                    <LocationButton
                                        className="mt-2"
                                        active={active}
                                        selected={selected}
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        text="L1"
                                    />
                                    <LocationButton
                                        className="mt-2"
                                        active={active}
                                        selected={selected}
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        text="L2"
                                    />
                                    <LocationButton
                                        className="mt-2"
                                        active={active}
                                        selected={selected}
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        text="L3"
                                    />
                                    <LocationButton
                                        className="mt-2"
                                        active={active}
                                        selected={selected}
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        text="L4"
                                    />
                                </div>
                            </Col>
                            <Col className="flex-grow-1">
                                {/* Coral Reef in Auto */}
                                <div className="position-relative" style={{width: "100%"}}>
                                    <img
                                        className="mx-auto my-2"
                                        alt=""
                                        style={{
                                            width: "65%",
                                            height: "auto",
                                            transform: !blueOnLeft?'rotate(180deg)':"",
                                        }}
                                        src={
                                            allianceIsBlue //replace with "alliance === Alliance.BLUE"
                                            ? "/assets/blue_start_prematch.png"
                                            : "/assets/red_start_prematch.png"
                                        }
                                    />

                                    <ReefSideButton
                                        active={active}
                                        selected={selected}
                                        top="24%"
                                        left="13%"
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        text="1"
                                    />
                                    <ReefSideButton
                                        active={active}
                                        selected = {selected}
                                        top = "15%"
                                        left = "37%"
                                        text="2"
                                    />
                                    <ReefSideButton
                                        active={active}
                                        selected = {selected}
                                        top = "24%"
                                        left = "61%"
                                        text="3"
                                    />
                                    <ReefSideButton
                                        active={active}
                                        selected = {selected}
                                        top = "48%"
                                        left = "61%"
                                        text="4"
                                    />
                                    <ReefSideButton
                                        active={active}
                                        selected = {selected}
                                        top = "56%"
                                        left = "37%"
                                        text="5"
                                    />
                                    <ReefSideButton
                                        active={active}
                                        selected = {selected}
                                        top = "48%"
                                        left = "13%"
                                        text="6"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-flex flex-column flex-shrink-1" style={{backgroundColor:"gray"}}>
                        <h1 className="text-center mb-1">Result</h1>
                        <div className="d-flex flex-column">
                            <ScoreButton
                                className="mt-2"
                                active={active}
                                //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                            />
                            <FailButton
                                className="mt-2"
                                active={active}
                                //handleClick={() => {handleSelection(ScoringLocation.SPEAKER, true);}}
                            />
                        </div>
                    </Col>
                </Row>
                
            </div>

            {/* Algae Game Piece Selector */}
            <div className="d-flex flex-column align-items-center">
                <h1>Auto Algae Game Piece Selector</h1>
                <Row className="d-flex justify-content-center">
                    <Col className="d-flex flex-column" style={{backgroundColor:"orange"}}>
                        <h1 className="text-center mb-1">Intake</h1>
                        {/* Copy everything in this div. */}
                        <Row>
                            <Col>
                                <div className="d-flex flex-column">
                                <h3 className="text-center">G1</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
                                    active={active}
                                    selected={selected}
                                    //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                    gamePiece="algae"
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <h3 className = "text-center">G2</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
                                    active={active}
                                    selected={selected}
                                    //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                    gamePiece="algae"
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <h3 className = "text-center">G3</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
                                    active={active}
                                    selected={selected}
                                    //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                    gamePiece="algae"
                                />
                            </div>
                            </Col>
                            <Col>
                                {/* Algae Reef in Auto */}
                                <div className="position-relative" style={{width: "25%"}}>
                                    <img
                                        className="mx-auto my-2"
                                        alt=""
                                        style={{
                                            width: "65%",
                                            height: "auto",
                                            transform: !blueOnLeft?'rotate(180deg)':"",
                                        }}
                                        src={
                                            allianceIsBlue //replace with "alliance === Alliance.BLUE"
                                            ? "/assets/blue_start_prematch.png"
                                            : "/assets/red_start_prematch.png"
                                        }
                                    />
                                        
                                    <AutoIntakeButton
                                        active={active}
                                        selected={selected}
                                        top="20%"
                                        left="5%"
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        gamePiece="algae"
                                    />
                                    <AutoIntakeButton
                                        active={active}
                                        selected={selected}
                                        top="5%"
                                        left="37%"
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        gamePiece="algae"
                                    />
                                    <AutoIntakeButton
                                        active={active}
                                        selected={selected}
                                        top="20%"
                                        left="70%"
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        gamePiece="algae"
                                    />
                                    <AutoIntakeButton
                                        active={active}
                                        selected={selected}
                                        top="55%"
                                        left="70%"
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        gamePiece="algae"
                                    />
                                    <AutoIntakeButton
                                        active={active}
                                        selected={selected}
                                        top="71%"
                                        left="37%"
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        gamePiece="algae"
                                    />
                                    <AutoIntakeButton
                                        active={active}
                                        selected={selected}
                                        top="55%"
                                        left="5%"
                                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                        gamePiece="algae"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="d-flex flex-column" style={{backgroundColor:"purple"}}>
                        <h1 className="text-center mb-1">Scoring</h1>
                        <div className="d-flex flex-column">
                            <LocationButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                text="Net"
                            />
                            <LocationButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                text="Proc."
                            />
                        </div>
                    </Col>
                    <Col className="d-flex flex-column" style={{backgroundColor:"gray"}}>
                        <h1 className="text-center mb-1">Result</h1>
                        <div className="d-flex flex-column">
                            <ScoreButton
                                className="mt-2"
                                active={active}
                                //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                            />
                            <FailButton
                                className="mt-2"
                                active={active}
                                //handleClick={() => {handleSelection(ScoringLocation.SPEAKER, true);}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row className="d-flex flex-row" style={{backgroundColor:"red"}}>
                    <h1 className="d-flex justify-content-center">Dropped:</h1>
                    <div className="d-flex justify-content-center">
                        <DroppedButton
                        className="mx-3 my-2"
                        active={active}
                        gamePiece="coral"
                        //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                        />
                        <DroppedButton
                        className="mx-3 my-2"
                        active={active}
                        gamePiece="algae"
                        //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                        />
                    </div>
                </Row>
            </div>

            {/* Coral Game Piece Selector */}
            <div className="d-flex flex-column align-items-center">
                <h1>Teleop Coral Game Piece Selector</h1>
                <Row className="d-flex justify-content-center">
                    <Col className="d-flex flex-column" style={{backgroundColor:"orange"}}>
                        <h1 className="text-center mb-1">Intake</h1>
                        {/* Copy everything in this div. */}
                        <div className="d-flex flex-column">
                            <h3 className="text-center">Ground</h3>
                            <TeleopIntakeButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                gamePiece="coral"
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <h3 className = "text-center">Station</h3>
                            <TeleopIntakeButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                gamePiece="coral"
                            />
                        </div>
                    </Col>
                    <Col className="d-flex flex-column" style={{backgroundColor:"purple"}}>
                        <h1 className="text-center mb-1">Scoring</h1>
                        <div className="d-flex flex-column">
                            <LocationButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                text="L1"
                            />
                            <LocationButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                text="L2"
                            />
                            <LocationButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                text="L3"
                            />
                            <LocationButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                text="L4"
                            />
                        </div>
                    </Col>
                    <Col className="d-flex flex-column" style={{backgroundColor:"gray"}}>
                        <h1 className="text-center mb-1">Result</h1>
                        <div className="d-flex flex-column">
                            <ScoreButton
                                className="mt-2"
                                active={active}
                                //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                            />
                            <FailButton
                                className="mt-2"
                                active={active}
                                //handleClick={() => {handleSelection(ScoringLocation.SPEAKER, true);}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row className="d-flex flex-row" style={{backgroundColor:"red"}}>
                    <h1 className="d-flex justify-content-center">Dropped:</h1>
                    <div className="d-flex justify-content-center">
                        <DroppedButton
                        className="mx-3 my-2"
                        active={active}
                        gamePiece="coral"
                        //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                        />
                        <DroppedButton
                        className="mx-3 my-2"
                        active={active}
                        gamePiece="algae"
                        //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                        />
                    </div>
                </Row>
            </div>

            {/* Algae Game Piece Selector */}
            <div className="d-flex flex-column align-items-center">
                <h1>Teleop Algae Game Piece Selector</h1>
                <Row className="d-flex justify-content-center">
                    <Col className="d-flex flex-column" style={{backgroundColor:"orange"}}>
                        <h1 className="text-center mb-1">Intake</h1>
                        {/* Copy everything in this div. */}
                        <div className="d-flex flex-column">
                            <h3 className="text-center">Ground</h3>
                            <TeleopIntakeButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                gamePiece="algae"
                            />
                        </div>
                        <div className="d-flex flex-column">
                            <h3 className = "text-center">Reef</h3>
                            <TeleopIntakeButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                gamePiece="algae"
                            />
                        </div>
                    </Col>
                    <Col className="d-flex flex-column" style={{backgroundColor:"purple"}}>
                        <h1 className="text-center mb-1">Scoring</h1>
                        <div className="d-flex flex-column">
                            <LocationButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                text="Net"
                            />
                            <LocationButton
                                className="mt-2"
                                active={active}
                                selected={selected}
                                //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                text="Proc."
                            />
                        </div>
                    </Col>
                    <Col className="d-flex flex-column" style={{backgroundColor:"gray"}}>
                        <h1 className="text-center mb-1">Result</h1>
                        <div className="d-flex flex-column">
                            <ScoreButton
                                className="mt-2"
                                active={active}
                                //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                            />
                            <FailButton
                                className="mt-2"
                                active={active}
                                //handleClick={() => {handleSelection(ScoringLocation.SPEAKER, true);}}
                            />
                        </div>
                    </Col>
                </Row>
                <Row className="d-flex flex-row" style={{backgroundColor:"red"}}>
                    <h1 className="d-flex justify-content-center">Dropped:</h1>
                    <div className="d-flex justify-content-center">
                        <DroppedButton
                        className="mx-3 my-2"
                        active={active}
                        gamePiece="coral"
                        //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                        />
                        <DroppedButton
                        className="mx-3 my-2"
                        active={active}
                        gamePiece="algae"
                        //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                        />
                    </div>
                </Row>
            </div>
        </>
    )
}
