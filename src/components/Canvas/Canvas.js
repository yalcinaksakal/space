import { useEffect, useRef } from "react";

import Spinner from "../Spinner/SpinnerDots";
import setScene from "../../lib/setScene";

const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const appender = () => canvasRef.current.appendChild(domElement);

    const { domElement, onResize, animate } = setScene(appender);

    let frameId;

    const RAF = () => {
      animate();
      frameId = requestAnimationFrame(RAF);
    };

    //resize
    window.addEventListener("resize", onResize);

    //start animation
    RAF();

    //cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      domElement.remove();
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};

export default Canvas;
