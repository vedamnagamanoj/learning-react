import { click } from "@testing-library/user-event/dist/click";
import { Children, useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

function Steps() {
  // let step = 2;
  const [step, updateStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = () => {
    if (step > 1) updateStep((currStep) => currStep - 1);
  };
  const handleNext = () => {
    if (step < 3) updateStep((currStep) => currStep + 1);
  };

  const handleClose = () => {
    setIsOpen((currIsOpen) => !currIsOpen);
    updateStep(1);
  };

  return (
    <div>
      <button className="close" onClick={handleClose}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button
              handleOnClick={handlePrevious}
              color={"#ffffff"}
              backgroundColor={"#7950f2"}
            >
              <span>⬅️</span> Previous
            </Button>
            <Button
              handleOnClick={handleNext}
              color={"#ffffff"}
              backgroundColor={"#7950f2"}
            >
              Next <span>➡️</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3> Step {step}</h3>
      {children}
    </div>
  );
}

function Button({ handleOnClick, backgroundColor, color, children }) {
  return (
    <button style={{ backgroundColor, color }} onClick={handleOnClick}>
      {children}
    </button>
  );
}
