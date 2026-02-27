import React, { useState, useEffect } from "react";

function AdvancedCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("myCount");
    return saved !== null && !isNaN(saved) ? Number(saved) : 0;
  });

  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(1);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);

  const handleReset = () => {
    setCount(0);
    setHistory([]);
    localStorage.removeItem("myCount");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp") {
        setCount((prev) => prev + step);
      } else if (event.key === "ArrowDown") {
        setCount((prev) => prev - step);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [step]);

  useEffect(() => {
    if (!isNaN(count)) {
      setHistory((prevHistory) => [...prevHistory, count]);
    }
  }, [count]);

  useEffect(() => {
    if (isNaN(count)) return;

    const timer = setTimeout(() => {
      localStorage.setItem("myCount", count);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <div>
      <h1>Current Count: {count}</h1>
      <label>Step: </label>
      <input
        type="number"
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <br />
      <button onClick={increment}>Plus</button>
      <button onClick={decrement}>Minus</button>
      <button onClick={handleReset}>Reset</button>
      <p>History: {history.join(", ")}</p>
    </div>
  );
}

export default AdvancedCounter;
