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
      <h1>Welcome to the HoundScout data viewer!</h1>
      <p>This is a built-in tool that contains _. Feel free to use any data collected to make the best possible decisions!</p>
    </div>
  );
}
