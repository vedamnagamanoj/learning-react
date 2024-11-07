import { useState } from "react";

export default function App() {
  const [step, updateStep] = useState(1);
  const [count, updateCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count * step);

  return (
    <div className="container">
      <div className="controls step">
        <button
          className="btn"
          onClick={() => updateStep((currStep) => currStep - 1)}
        >
          -
        </button>

        <span> Step:{step}</span>

        <button
          className="btn"
          onClick={() => updateStep((currStep) => currStep + 1)}
        >
          +
        </button>
      </div>
      <div className=" controls count">
        <button
          className="btn"
          onClick={() => updateCount((currCount) => currCount - 1)}
        >
          -
        </button>

        <span> Count: {count}</span>

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
    </div>
  );
}
