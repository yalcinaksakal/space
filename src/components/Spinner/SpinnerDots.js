import styles from "./SpinnerDots.module.css";

const SpinnerDots = () => (
  <div className={styles.spinner}>
    <div className={styles.step1}></div>
    <div className={styles.step2}></div>
    <div className={styles.step3}></div>
  </div>
);

export default SpinnerDots;
