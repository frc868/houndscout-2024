/* eslint-disable @next/next/no-img-element */
// A map of the field used as a reference for the data viewer.
// UPDATE CYCLE (Client): Make sure this matches the new fields; reuse the images from before.
export default function FieldMap() {
  return (
    <>
      <p>S: Coral Station<br />G: Ground<br />R: Reef Side</p>
      <div className="position-relative mt-4" style={{width: "100%"}}>
          <img
              alt=""
              style={{
                  width: "40%",
                  height: "auto",
                  left: "60%",
              }}
              src={"/assets/blue_side.png"}
          />
          <p 
            className="position-absolute"
            style={{ top: "22%", left: "33%" }}
          >
            R1
          </p>
          <p 
            className="position-absolute"
            style={{ top: "22%", left: "44%" }}
          >
            R2
          </p>
          <p 
            className="position-absolute"
            style={{ top: "46%", left: "48%" }}
          >
            R3
          </p>
          <p 
            className="position-absolute"
            style={{ top: "70%", left: "44%" }}
          >
            R4
          </p>
          <p 
            className="position-absolute"
            style={{ top: "70%", left: "33%" }}
          >
            R5
          </p>
          <p 
            className="position-absolute"
            style={{ top: "46%", left: "29%" }}
          >
            R6
          </p>
          <p 
            className="position-absolute"
            style={{ top: "22%", left: "22%" }}
          >
            G1
          </p>
          <p 
            className="position-absolute"
            style={{ top: "46%", left: "22%" }}
          >
            G2
          </p>
          <p 
            className="position-absolute"
            style={{ top: "70%", left: "22%" }}
          >
            G3
          </p>
          <p 
            className="position-absolute"
            style={{ top: "12%", left: "15%" }}
          >
            S1
          </p>
          <p 
            className="position-absolute"
            style={{ top: "80%", left: "15%" }}
          >
            S2
          </p>
      </div>
    </>
  );
}
