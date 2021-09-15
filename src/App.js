import { useSelector } from "react-redux";
import Canvas from "./components/Canvas/Canvas";
import Loading from "./components/Loading/Loading";
import Paragraph from "./components/Paragraph";

function App() {
  const { isLoading } = useSelector(state => state.loading);

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    background: "black",
  };
  return (
    <>
      {isLoading && <Loading />}
      <Paragraph />
      <div style={style}>
        <Canvas />
      </div>
    </>
  );
}

export default App;
