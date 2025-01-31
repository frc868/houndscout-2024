//Feel free to use this page to create boilerplates for the app without relying on data.

"use client"
/* eslint-disable @next/next/no-img-element */
import { Alliance } from "@/lib/enums";
import { Button, Col, Row } from "react-bootstrap";
import ReefSideButton from "@/components/sandbox/mini/ReefSideButton";
import AutoIntakeButton from "@/components/sandbox/mini/AutoIntakeButton";
import TeleopIntakeButton from "@/components/sandbox/mini/TeleopIntakeButton";
import FailButton from "@/components/sandbox/mini/FailButton";
import ScoreButton from "@/components/sandbox/mini/ScoreButton";
import LocationButton from "@/components/sandbox/mini/LocationButton";
import DroppedButton from "@/components/sandbox/mini/DroppedButton";
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
                        <h1 className="text-center mb-3">Starting Position</h1>
                            <img
                                className="mx-auto"
                                alt=""
                                style={!blueOnLeft?{
                                    transform: 'rotate(180deg)'
                                }:{}}
                                src={
                                allianceIsBlue//replace with alliance === Alliance.BLUE
                                    ? "/assets/blue_start_prematch.png"
                                    : "/assets/red_start_prematch.png"
                                }
                                width={400}
                            />
                        {}
                    </div>
                    <div
                        style={
                            allianceIsBlue//replace with alliance === Alliance.BLUE
                            ? blueOnLeft
                                ? {
                                    position: "absolute",
                                    top: "150px",//Position from the top of the div
                                    left: "55px",//Position from the left of the div
                                }
                                : {
                                    position: "absolute",
                                    top: "450px",
                                    left: "295px",
                                }
                            : blueOnLeft
                            ? {
                                position: "absolute",
                                top: "120px",
                                left: "295px",
                                }
                            : {
                                position: "absolute",
                                top: "450px",
                                left: "55px",
                                }
                        }
                    >
                        <Button
                            // variant={
                            //   selected === AutoStartingZone.ONE ? "primary" : "secondary"
                            // }
                            className="fw-bold"
                            style={{ width: "50px" }}
                            // onMouseDown={() => handleSelection(AutoStartingZone.ONE)}
                        >
                            1
                        </Button>
                    </div>
                    <div
                        style={
                            allianceIsBlue//replace with alliance === Alliance.BLUE
                            ? blueOnLeft
                                ? {
                                    position: "absolute",
                                    top: "208px",
                                    left: "85px",
                                }
                                : {
                                    position: "absolute",
                                    top: "372px",
                                    left: "275px",
                                }
                            : blueOnLeft
                            ? {
                                position: "absolute",
                                top: "203px",
                                left: "274px",
                                }
                            : {
                                position: "absolute",
                                top: "372px",
                                left: "87px",
                                }
                        }
                    >
                        <Button
                            // variant={
                            //   selected === AutoStartingZone.TWO ? "primary" : "secondary"
                            // }
                            className="fw-bold"
                            style={{ width: "40px" }}
                            // onMouseDown={() => handleSelection(AutoStartingZone.TWO)}
                        >
                            2
                        </Button>
                    </div>
                    <div
                        style={
                            allianceIsBlue//replace with alliance === Alliance.BLUE
                            ? blueOnLeft
                                ? {
                                    position: "absolute",
                                    top: "350px",
                                    left: "55px",
                                }
                                : {
                                    position: "absolute",
                                    top: "220px",
                                    left: "295px",
                                }
                            : blueOnLeft
                            ? {
                                position: "absolute",
                                top: "350px",
                                left: "295px",
                                }
                            : {
                                position: "absolute",
                                top: "220px",
                                left: "55px",
                                }
                        }
                        >
                        <Button
                            // variant={
                            //   selected == AutoStartingZone.THREE ? "primary" : "secondary"
                            // }
                            className="fw-bold"
                            style={{ width: "50px" }}
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
                          <ScoreButton
                            className="mx-3 my-2"
                            active={active}
                            //handleClick={() => {handleSelection(ScoringLocation.SPEAKER);}}
                          />
                          <FailButton
                            className="mx-3 my-2"
                            active={active}
                            //handleClick={() => {handleSelection(ScoringLocation.SPEAKER, true);}}
                          />
                        </div>
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
                    <h1>Coral Game Piece Selector</h1>
                    <Row className="d-flex justify-content-center" style={{backgroundColor:"red"}}>
                        <Col className="d-flex flex-column" style={{backgroundColor:"orange"}}>
                            <h1 className="text-center mb-1">Intake</h1>
                            {/* Copy everything in this div. */}
                            <div className="d-flex flex-column">
                                <h3 className="text-center">Ground</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
                                    selected={selected}
                                    //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                    gamePiece="coral"
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <h3 className = "text-center">Station</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
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
                    </Row>
                </div>

                {/* Algae Game Piece Selector */}
                <div className="d-flex flex-column align-items-center">
                    <h1>Algae Game Piece Selector</h1>
                    <Row className="d-flex justify-content-center" style={{backgroundColor:"red"}}>
                        <Col className="d-flex flex-column" style={{backgroundColor:"orange"}}>
                            <h1 className="text-center mb-1">Intake</h1>
                            {/* Copy everything in this div. */}
                            <div className="d-flex flex-column">
                                <h3 className="text-center">Ground</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
                                    selected={selected}
                                    //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                                    gamePiece="algae"
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <h3 className = "text-center">Reef</h3>
                                <TeleopIntakeButton
                                    className="mt-2"
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
                    </Row>
                </div>

                <Row className="d-flex flex-row">
                    {/* Coral Reef in Auto */}
                <div className="position-relative" style={{width: "25%"}}>
                    <img
                    className="mx-auto my-2"
                    alt=""
                    src={
                        "/assets/coral_reef_auto.png"
                    }
                    width="100%"
                    />

                    <ReefSideButton
                        active={active}
                        className="mt-2"
                        selected={selected}
                        top="22%"
                        left="15%"
                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                        text="1"
                    />
                    <ReefSideButton
                        active={active}
                        className = "mt-2)"
                        selected = {selected}
                        top = "18%"
                        left = "39%"
                        text="2"
                    />
                    <ReefSideButton
                        active={active}
                        className = "mt-2)"
                        selected = {selected}
                        top = "24%"
                        left = "65%"
                        text="3"
                    />
                    <ReefSideButton
                        active={active}
                        className = "mt-2)"
                        selected = {selected}
                        top = "53%"
                        left = "65%"
                        text="4"
                    />
                    <ReefSideButton
                        active={active}
                        className = "mt-2)"
                        selected = {selected}
                        top = "53%"
                        left = "15%"
                        text="5"
                    />
                    <ReefSideButton
                        active={active}
                        className = "mt-2)"
                        selected = {selected}
                        top = "65%"
                        left = "39%"
                        text="6"
                    />
                </div>
                
                {/* Algae Reef in Auto */}
                <div className="position-relative" style={{width: "25%"}}>
                    <img
                        className="mx-auto my-2"
                        alt=""
                        src={
                            "/assets/algae_reef_auto.png"
                        }
                        width="100%"
                    />
                        
                    <AutoIntakeButton
                        className="mt-2"
                        selected={selected}
                        top="20%"
                        left="5%"
                        //handleSelection={() => handleSelection(CoralIntakeLocation.TELEOPGROUND)}
                        gamePiece="algae"
                    />
                    </div>
                </Row>
                
        </>
    )
}
