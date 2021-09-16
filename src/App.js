import { useState } from "react";
import { useSelector } from "react-redux";
import Canvas from "./components/Canvas/Canvas";
import Loading from "./components/Loading/Loading";
import Paragraph from "./components/Paragraph/Paragraph";
import styles from "./App.module.css";
function App() {
  const { isLoading } = useSelector(state => state.loading);
  const [start, setStart] = useState(false);

  return (
    <>
      {!start && (
        <div className={styles.home}>
          <button onClick={() => setStart(true)}>Start</button>
        </div>
      )}
      {start && (
        <>
          {isLoading && <Loading />}
          <Paragraph />
          <div className={styles.home}>
            <Canvas />
          </div>
        </>
      )}
    </>
  );
}

export default App;
