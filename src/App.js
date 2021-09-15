import Canvas from "./components/Canvas/Canvas";
import Paragraph from "./components/Paragraph";

function App() {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: "whitesmoke",
  };
  return (
    <>
      <Paragraph />
      <div style={style}>
        <Canvas />
      </div>
    </>
  );
}

export default App;
