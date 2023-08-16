import { useState } from "react";
import Counter from "./Components/Counter";

const App = () => {
  console.log("APp");
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prevData) => prevData + 1);
  };

  const dercreaseCount = () => {
    setCount((prevData) => prevData - 1);
  };

  return (
    <>
      <Counter
        count={count}
        increaseCount={increaseCount}
        dercreaseCount={dercreaseCount}
        obj={{ name: "mahdi" }}
      />
    </>
  );
};

export default App;
