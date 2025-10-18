"use client";

import { useState } from "react";
import Image from "next/image";

// Definimi i type-ve
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
}

// PRODUKTET
const products: Product[] = [
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
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price
    };
    setCart([...cart, cartItem]);
    alert(`${product.name} u shtua në shportë!`);
  }

  return (
    <main>
      <h1>🏪 Dyqani Im i Patikave</h1>
      
      <div>
        <h2>🛒 Shporta ({cart.length})</h2>
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - {item.price}€</li>
            ))}
          </ul>
        ) : (
          <p>Shporta është e zbrazët</p>
        )}
      </div>

      <div>
        <h2>👟 Këpucët Tona</h2>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              {/* Zëvendësoi img me Image nga Next.js */}
              <Image 
                src={product.image} 
                alt={product.name}
                width={200}
                height={200}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}€</p>
              <button onClick={() => addToCart(product)}>
                🛒 Shto në Shportë
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
