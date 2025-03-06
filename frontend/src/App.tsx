import { useEffect, useState } from "react";

type Item = { _id: string; name: string };

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const addItem = async () => {
    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newItem }),
    });
    const item = await res.json();
    setItems([...items, item]);
    setNewItem("");
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Liste des Items</h1>
      <input
        className="border p-2 m-2"
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Ajouter un item..."
      />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={addItem}>
        Ajouter
      </button>
      <ul className="mt-4">
        {items.map((item) => (
          <li key={item._id} className="p-2 border-b">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
