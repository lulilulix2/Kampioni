"use client";

import { useState } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// ✅ KONFIGURIMI I COGNITO
Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_1cO6qPS04',
    userPoolWebClientId: '2m40rt16o2r9jhuj4sg66cns0i'
  }
});

// ✅ TË DHËNAT E FORCUARA (si më parë)
const categories = [
  { id: 1, name: "👞 Patika dhe Këpucë të Punës", slug: "punës" },
  { id: 2, name: "⚽ Patika të Sportit", slug: "sport" },
  { id: 3, name: "👟 Patika 36-40", slug: "36-40" },
  { id: 4, name: "🧒 Patika për Fëmijë", slug: "femije" }
];

const productsByCategory = {
  "punës": [
    {
      id: 1,
      name: "Patika të Punës Navy",
      price: 45,
      image: "https://via.placeholder.com/300x300/3498db/ffffff?text=Patika+Punës+1",
      description: "Patika të qëndrueshme për punë"
    }
  ],
  "sport": [
    {
      id: 2,
      name: "Patika Futboll",
      price: 35,
      image: "https://via.placeholder.com/300x300/e74c3c/ffffff?text=Patika+Sport+1",
      description: "Për futboll dhe sport"
    }
  ]
};

function MainApp() {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("punës");

  function addToCart(product: any) {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price
    };
    setCart([...cart, cartItem]);
    alert(`${product.name} u shtua në shportë!`);
  }

  const currentProducts = productsByCategory[selectedCategory as keyof typeof productsByCategory] || [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <div style={{ width: '280px', background: '#2c3e50', color: 'white', padding: '20px', height: '100vh', position: 'sticky', top: 0 }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#ecf0f1' }}>📁 Kategoritë</h2>
        
        <nav>
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              style={{
                padding: '12px 15px',
                margin: '5px 0',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedCategory === category.slug ? '#3498db' : 'transparent',
              }}
            >
              {category.name}
            </div>
          ))}
        </nav>

        {/* Shporta */}
        <div style={{ marginTop: '30px', padding: '15px', background: '#34495e', borderRadius: '8box' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>🛒 Shporta ({cart.length})</h3>
          {cart.length > 0 ? (
            <div style={{ fontSize: '14px' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ marginBottom: '5px' }}>
                  {item.name} - {item.price}€
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '14px', color: '#bdc3c7' }}>Shporta është e zbrazët</p>
          )}
        </div>
      </div>

      {/* PRODUKTET */}
      <div style={{ flex: 1, padding: '30px', background: '#ecf0f1' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>
          {categories.find(cat => cat.slug === selectedCategory)?.name}
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {currentProducts.map((product) => (
            <div key={product.id} style={{
              background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '20px', textAlign: 'center'
            }}>
              <img 
                src={product.image} 
                alt={product.name}
                width={250}
                height={250}
                style={{ borderRadius: '8px', marginBottom: '15px', objectFit: 'cover' }}
              />
              <h3 style={{ color: '#2c3e50', margin: '0 0 10px 0' }}>{product.name}</h3>
              <p style={{ color: '#7f8c8d', margin: '0 0 10px 0' }}>{product.description}</p>
              <p style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#27ae60', margin: '0 0 15px 0' }}>
                {product.price}€
              </p>
              <button 
                onClick={() => addToCart(product)}
                style={{
                  background: '#3498db', color: 'white', border: 'none', padding: '12px 20px', 
                  borderRadius: '6px', cursor: 'pointer', width: '100%', fontSize: '16px'
                }}
              >
                🛒 Shto në Shportë
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <div style={{ background: '#2ecc71', color: 'white', padding: '12px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0 }}>🏪 Dyqani Im i Këpucëve</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '14px' }}>
                  Mirësevini, <strong>{user?.username}</strong>
                </p>
              </div>
              <button 
                onClick={signOut}
                style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px' }}
              >
                Shkyçu
              </button>
            </div>
          </div>
          <MainApp />
        </div>
      )}
    </Authenticator>
  );
}
