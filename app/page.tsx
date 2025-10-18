"use client";

import { useState } from "react";
import Image from "next/image";

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

// ✅ Përdor URL të fotove nga interneti
const products: Product[] = [
  {
    id: 1,
    name: "Patike te punes navy",
    price: 45,
    image: "https://via.placeholder.com/200x200/3498db/ffffff?text=Patike+1",
    description: "patike 949"
  },
  {
    id: 2,
    name: "patike per futboll",
    price: 35, 
    image: "https://via.placeholder.com/200x200/e74c3c/ffffff?text=Patike+2",
    description: "patike 120"
  }
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function addToCart(product: Product) {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price
    };
    setCart([...cart, cartItem]);
    alert(`${product.name} u shtua në shportë!`);
  }

  function handleLogin() {
    setIsLoggedIn(true);
    alert('Ju jeni loguar me sukses!');
  }

  return (
    <main>
      {/* ✅ Shto Login Section */}
      <div style={{background: '#f0f0f0', padding: '15px', marginBottom: '20px', borderRadius: '10px'}}>
        <h3>🔐 Hyrje në Llogari</h3>
        {isLoggedIn ? (
          <p>✅ Ju jeni loguar! Mirësevini!</p>
        ) : (
          <button 
            onClick={handleLogin}
            style={{background: '#2ecc71', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px'}}
          >
            Hyr në Llogari
          </button>
        )}
      </div>

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
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
          {products.map((product) => (
            <div key={product.id} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '10px', textAlign: 'center'}}>
              <Image 
                src={product.image} 
                alt={product.name}
                width={200}
                height={200}
                style={{borderRadius: '5px'}}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p style={{fontSize: '1.2em', fontWeight: 'bold', color: '#2ecc71'}}>{product.price}€</p>
              <button 
                onClick={() => addToCart(product)}
                style={{background: '#3498db', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px'}}
              >
                🛒 Shto në Shportë
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
