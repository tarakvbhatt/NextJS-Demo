"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function addProduct() {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price }),
    });

    setName("");
    setPrice("");
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Product List</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={addProduct}>Add</button>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}