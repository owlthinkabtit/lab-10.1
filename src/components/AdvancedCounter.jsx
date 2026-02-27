import React, { useState, useEffect } from "react";

function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(1);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        increment();
      } else if (event.key === "ArrowDown") {
        decrement();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count, step]);

  useEffect(() => {
    setHistory(prevHistory => [...prevHistory, count]);
  }, [count]);

  const handleReset = () => {
    setCount(0);
    setHistory([]);
  };

  return (
    <div>
      <h1>Current Count: {count}</h1>
      <label>Step:</label>
      <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} />
      <br />
      <button onClick={increment}>Plus</button>
      <button onClick={decrement}>Minus</button>
      <button></button>
      <p>History: {history.join(", ")}</p>
    </div>
  );
};

export default AdvancedCounter;