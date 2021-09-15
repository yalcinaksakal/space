import styles from "./SpinnerDots.module.css";

const SpinnerDots = ({ msg }) => {
  const text = "Loading " + msg;
  return (
    <div className={styles.spinner}>
      <h1> {text}</h1>
      <div className={styles.step1}></div>
      <div className={styles.step2}></div>
      <div className={styles.step3}></div>
    </div>
  );
};
export default SpinnerDots;
