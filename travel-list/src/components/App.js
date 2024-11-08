import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((currItems) => [...currItems, item]);
  }
  function handleDeleteItems(id) {
    setItems((currItems) => currItems.filter((currItem) => currItem.id !== id));
  }

  function handleToggleItem(id) {
    setItems((currItems) =>
      currItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    const confirmed = window.confirm("Do you want to clear your list?");

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItems={handleDeleteItems}
        handleToggleItem={handleToggleItem}
        handleClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
