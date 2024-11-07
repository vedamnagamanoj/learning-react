import { useState } from "react";

const items = [
  { id: 1, question: "What language is React based on?", answer: "Javascript" },
  {
    id: 2,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 3,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 4,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 5,
    question: "How to give components memory?",
    answer: "useState Hook",
  },
  {
    id: 6,
    question:
      "What do we call an input element that is completely synchrionised with state?",
    answer: "Controlled element",
  },
];

export default function App() {
  return (
    <div className="app">
      <FlashCards />
    </div>
  );
}

function FlashCards() {
  const [activeID, setActiveID] = useState(null);

  function handleClick(id) {
    setActiveID(id !== activeID ? id : null);
  }

  return (
    <div className="flash-cards">
      {items.map((item) => (
        <div
          className={`card ${item.id === activeID ? "active" : ""}`}
          onClick={() => handleClick(item.id)}
          key={item.id}
        >
          <p>{item.id === activeID ? item.answer : item.question}</p>
        </div>
      ))}
    </div>
  );
}
