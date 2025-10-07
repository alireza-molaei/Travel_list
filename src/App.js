import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
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
  const onDeleteItem = function (id) {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={onAddItem} />
      <PackingList
        data={data}
        onToggleItem={onToggleItem}
        onDeleteItem={onDeleteItem}
      />
      <Stats data={data} />
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
      id: Date.now() + Math.random(),
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

function PackingList({ data, onToggleItem, onDeleteItem }) {
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
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Stats({ data }) {
  if (data.length === 0)
    return (
      <footer>
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );
  const numPacked = data.filter((item) => item.packed === true);
  const percentage = Math.round((numPacked.length / data.length) * 100);
  return (
    <footer>
      <em>
        {percentage === 100
          ? "good work"
          : ` 🧳 You have ${data.length} items on your list, and you already packed
        ${percentage}%`}
      </em>
    </footer>
  );
}
function Item({ item, count, packed, onToggleItem, id, onDeleteItem }) {
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
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}
