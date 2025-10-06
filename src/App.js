import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState([
    { id: 1, count: 1, itemName: "passport", packed: false },
    { id: 2, count: 2, itemName: "book", packed: true },
  ]);
  const onToggleItem = function (id) {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const onAddItem = function (newItem) {
    setData((prevData) => [...prevData, newItem]);
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={onAddItem} />
      <PackingList data={data} onToggleItem={onToggleItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      id: new Date(),
      count: quantity,
      itemName: description,
      packed: false,
    };

    onAddItem(newItem);
  }
  return (
    <div className="add-form">
      <h3>What do you need for your 🧳 trip?</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <input
          placeholder="what do you need?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

function PackingList({ data, onToggleItem }) {
  return (
    <div className="packing-list">
      <ul className="list">
        {data.map((item) => (
          <Item
            id={item.id}
            key={item.id}
            count={item.count}
            item={item.itemName}
            packed={item.packed}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer>
      <em>🧳 You have X items on your list, and you already packed X (%)</em>
    </footer>
  );
}
function Item({ item, count, packed, onToggleItem, id }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={packed}
        onChange={() => onToggleItem(id)}
      />
      <span className={packed === true ? "line-through" : ""}>
        {count} -{item}
      </span>
      <button>❌</button>
    </li>
  );
}
