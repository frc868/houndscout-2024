export default function HomeContent() {
  return (
    <div
      style={{
        height: "calc(100% - 2*24px)",
        width: "calc(100% - 2*24px)",
        color: "white",
      }}
      className="m-4 bg-dark rounded-3 font-monospace text-center"
    >
      <h1>Autos</h1>
      <p>WIP</p>
      <div className="position-relative mt-4" style={{width: "100%"}}>
          <img
              alt=""
              style={{
                  width: "60%",
                  height: "auto",
                  left: "20%",
              }}
              src={"/assets/blue_side.png"}
          />
      </div>
    </div>
  );
}
