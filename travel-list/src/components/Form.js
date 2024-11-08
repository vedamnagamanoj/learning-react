import { useState } from "react";

export default function Function({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(evnt) {
    evnt.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😻 trip?</h3>
      <select
        value={quantity}
        onChange={(evnt) => setQuantity(Number(evnt.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(evnt) => setDescription(evnt.target.value)}
      ></input>
      <button type="submit">Add</button>
    </form>
  );
}
