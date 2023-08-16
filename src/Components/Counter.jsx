import PropTypes from "prop-types";
import styles from "../Styles.module.css";
const Counter = ({ count, increaseCount, dercreaseCount, obj }) => {
  console.log("counter");
  return (
    <div className={styles.counter}>
      <h1>Mahdi Hasanzadeh {count}</h1>
      <button onClick={increaseCount}>Increase</button>
      <button
        onClick={dercreaseCount}
        disabled={count === 0}
        style={count === 0 ? { color: "red" } : { color: "blue" }}
      >
        Decrease
      </button>
    </div>
  );
};

Counter.propTypes = {
  count: PropTypes.number,
  obj: PropTypes.array,
};

export default Counter;
