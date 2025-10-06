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
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList data={data} onToggleItem={onToggleItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your 🧳 trip?</h3>
      <select>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input></input>
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
      <span className="line-through">
        {count} -{item}
      </span>
      <button>❌</button>
    </li>
  );
}
