import { useState } from "react";

export default function App() {
  const [step, updateStep] = useState(1);
  const [count, updateCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count * step);

  function handleReset() {
    updateStep(1);
    updateCount(0);
  }

  return (
    <div className="container">
      <div className="controls count">
        <input
          type="range"
          min="1"
          max="9"
          value={step}
          step="1"
          id="count-slider"
          name="count-slider"
          onChange={(evnt) => updateStep(evnt.target.value)}
        />
        <span>{step}</span>
      </div>
      <div className="controls count">
        <button
          className="btn"
          onClick={() => updateCount((currCount) => currCount - 1)}
        >
          -
        </button>

        <input
          type="number"
          id="count-input"
          value={count}
          onChange={(evnt) => updateCount(evnt.target.value)}
        />

        <button
          className="btn"
          onClick={() => updateCount((currCount) => currCount + 1)}
        >
          +
        </button>
      </div>
      <p className="message">
        <span>
          {count === 0
            ? `Today `
            : `${Math.abs(count * step)} day${count > 1 ? "s" : ""} ${
                count > 0 ? "from today is" : "ago was"
              } `}
          {date.toDateString()}
        </span>
      </p>
      {count !== 0 || step !== 1 ? (
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      ) : null}
    </div>
  );
}
