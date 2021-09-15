import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import setScene from "../../lib/setScene";
import { loadingActions } from "../../store/loading-slice";

const Canvas = () => {
  const canvasRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const appender = () => canvasRef.current.appendChild(domElement);

    const { domElement, onResize, animate } = setScene(
      appender,
      dispatch,
      loadingActions
    );

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
  }, [dispatch]);

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
