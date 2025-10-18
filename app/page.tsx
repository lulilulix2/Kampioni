"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

// PRODUKTET E PATIKAVE DHE KËPUCËVE
const products = [
  {
    id: 1,
    name: "Patike te punes navy",
    price: 45,
    image: "/images/20180413_150958.jpg",
    description: "patike 949"
  },
  {
    id: 2,
    name: "patike per futboll", 
    price: 35,
    image: "/images/20180413_151040.jpg",
    description: "patike 120"
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Shto në shportë
  function addToCart(product) {
    setCart([...cart, product]);
    alert(`${product.name} u shtua në shportë!`);
  }

  // Bëj porosi
  function createOrder() {
    if (cart.length === 0) {
      alert("Shporta juaj është e zbrazët!");
      return;
    }
    
    const orderDetails = cart.map(item => item.name).join(", ");
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    client.models.Todo.create({
      content: `POROSI: ${orderDetails} - TOTAL: ${total}€`
    });
    
    alert(`Porosia u krye! Totali: ${total}€`);
    setCart([]);
  }

  return (
    <main>
      <h1>🏪 Dyqani Im i Patikave</h1>
      
      {/* SHPORTA */}
      <div className="cart">
        <h2>🛒 Shporta ({cart.length})</h2>
        {cart.length > 0 ? (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item.name} - {item.price}€</li>
              ))}
            </ul>
            <button onClick={createOrder} className="order-btn">
              ✅ Bëj Porosinë
            </button>
          </div>
        ) : (
          <p>Shporta është e zbrazët</p>
        )}
      </div>

      {/* PRODUKTET */}
      <div className="products-grid">
        <h2>👟 Këpucët Tona</h2>
        <div className="products">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              <p className="price">{product.price}€</p>
              <button 
                onClick={() => addToCart(product)}
                className="add-to-cart-btn"
              >
                🛒 Shto në Shportë
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MENAXHIMI I POROSIVE (Për ty) */}
      <div className="admin-section">
        <h2>📊 Menaxhimi i Porosive</h2>
        <button onClick={() => client.models.Todo.observeQuery().subscribe({
          next: (data) => setOrders([...data.items]),
        })}>
          Shiko Porositë
        </button>
        
        <ul>
          {orders.map((order) => (
            <li key={order.id}>📦 {order.content}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
