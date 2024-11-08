import { useState } from "react";

const items = [
  {
    id: "01",
    question: "Where are these chairs assembled?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: "02",
    question: "How long do I have to return my chair?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: "03",
    question: "Do you ship to countries ourside the EU?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export default function App() {
  return (
    <div className="App">
      <FaqList />
    </div>
  );
}

function FaqList() {
  const [active, setActive] = useState("");

  function handleClick(id) {
    setActive((currActive) => (currActive === id ? "" : id));
  }

  return (
    <div className="faq">
      {items.map((item) => (
        <FaqItem
          item={item}
          key={item.id}
          handleClick={handleClick}
          active={active}
        />
      ))}
    </div>
  );
}

function FaqItem({ item, active, handleClick }) {
  return (
    <div className={`faq-item ${active === item.id ? "active" : ""}`}>
      <div className="faq-question" id={item.id}>
        <span>{item.id}</span>
        <h3>{item.question}</h3>
        <button onClick={() => handleClick(item.id)}>
          {active === item.id ? "-" : "+"}
        </button>
      </div>
      <div className={`faq-answer ${active !== item.id ? "hidden" : ""}`}>
        <p>{item.answer}</p>
      </div>
    </div>
  );
}
