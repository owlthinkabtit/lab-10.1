import React, { useState, useEffect } from "react";

function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

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
  }, [increment, decrement]);

  useEffect(() => {
    setHistory(prevHistory => [...prevHistory, count]);
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Plus</button>
      <p>History: {history.join(", ")}</p>
    </div>
  );
};

export default AdvancedCounter;