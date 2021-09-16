import { useSelector, useDispatch } from "react-redux";
import { loadingActions } from "../../store/loading-slice";

import styles from "./Loading.module.css";
import Spinner from "../Spinner/SpinnerDots";
const Loading = () => {
  const dispatch = useDispatch();
  const { loadingMsgs } = useSelector(state => state.loading);
  const isDone = loadingMsgs[loadingMsgs.length - 1] === "Loaded successfully";
  isDone &&
    setTimeout(() => dispatch(loadingActions.setIsLoading(false)), 1000);

  return (
    <div className={styles.loading}>
      {loadingMsgs.map((msg, i) => (
        <h6 key={i}>{msg}</h6>
      ))}
      {!isDone && <Spinner />}
    </div>
  );
};
export default Loading;
