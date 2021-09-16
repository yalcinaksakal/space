import styles from "./p.module.css";

const Paragraph = () => (
  <p className={styles.p}>
    Left click (touch) rotates the camera.
    <br />
    Right click (a pair of touches) pans the camera.
    <br />
    Zoom in out enabled.
  </p>
);
export default Paragraph;
