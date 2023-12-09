import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const startChallenge = () => {
    setCount(1);
  };

  const checkLink = () => {};

  return (
    <>
      <div>social 3ngage</div>
      <button onClick={startChallenge}>Start challenge</button>
      <br />
      <input type="textbox" />
      input
      <br />
      <button onclick={checkLink}>check link</button>
    </>
  );
}

export default App;
