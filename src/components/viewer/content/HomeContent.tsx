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
      <p>This is a built-in tool that provides easy access to the collected data. Feel free to use this page to make the best possible decisions!</p>
    </div>
  );
}
