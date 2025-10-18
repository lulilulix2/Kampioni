"use client";

import { useState } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_1cO6qPS04', 
    userPoolWebClientId: '2m40rt16o2r9jhuj4sg66cns0i'
  }
});

// ✅ TË DHËNAT
const allOrders = [
  { id: 1, user: "banana_sh", products: "Patika Navy x2", total: 90, date: "2025-10-18" },
  { id: 2, user: "banana_store", products: "Patika Futboll x1", total: 35, date: "2025-10-18" },
];

const categories = [
  { id: 1, name: "👞 Patika të Punës", slug: "punes" },
  { id: 2, name: "⚽ Patika Sporti", slug: "sport" },
];

const productsByCategory = {
  "punes": [
    { id: 1, name: "Patika Punës Navy", price: 45, image: "https://via.placeholder.com/300x300/3498db/ffffff?text=Patika+1", description: "Patika të qëndrueshme" }
  ],
  "sport": [
    { id: 2, name: "Patika Futboll", price: 35, image: "https://via.placeholder.com/300x300/e74c3c/ffffff?text=Patika+2", description: "Për futboll" }
  ]
};

function MainApp({ user, isAdmin }: { user: any; isAdmin: boolean }) {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("punes");
  const [currentView, setCurrentView] = useState<"products" | "orders">("products");

  function addToCart(product: any) {
    const cartItem = { id: product.id, name: product.name, price: product.price };
    setCart([...cart, cartItem]);
    alert(`${product.name} u shtua në shportë!`);
  }

  function createOrder() {
    if (cart.length === 0) return alert("Shporta është e zbrazët!");
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Porosia u krye! Totali: ${total}€`);
    setCart([]);
  }

  const currentProducts = productsByCategory[selectedCategory as keyof typeof productsByCategory] || [];
  const userOrders = allOrders.filter(order => order.user === user.username);

  // ✅ ADMIN PANEL
  if (isAdmin) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* SIDEBAR ADMIN */}
        <div style={{ width: '250px', background: '#8e44ad', color: 'white', padding: '20px' }}>
          <h2>👑 Admin</h2>
          <div onClick={() => setCurrentView("orders")} style={{padding: '10px', cursor: 'pointer', background: currentView === "orders" ? '#9b59b6' : 'transparent'}}>
            📦 Porositë
          </div>
          <div onClick={() => setCurrentView("products")} style={{padding: '10px', cursor: 'pointer', background: currentView === "products" ? '#9b59b6' : 'transparent'}}>
            🏪 Dyqani
          </div>
        </div>

        {/* PËRMBLEDHJA ADMIN */}
        <div style={{ flex: 1, padding: '20px', background: '#f8f9fa' }}>
          {currentView === "orders" ? (
            <div>
              <h1>📦 Të Gjitha Porositë</h1>
              <div style={{background: 'white', padding: '20px', borderRadius: '10px'}}>
                <table style={{width: '100%'}}>
                  <thead>
                    <tr style={{background: '#f8f9fa'}}>
                      <th style={{padding: '10px', textAlign: 'left'}}>ID</th>
                      <th style={{padding: '10px', textAlign: 'left'}}>Klienti</th>
                      <th style={{padding: '10px', textAlign: 'left'}}>Produktet</th>
                      <th style={{padding: '10px', textAlign: 'left'}}>Totali</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map((order) => (
                      <tr key={order.id}>
                        <td style={{padding: '10px'}}>#{order.id}</td>
                        <td style={{padding: '10px'}}>{order.user}</td>
                        <td style={{padding: '10px'}}>{order.products}</td>
                        <td style={{padding: '10px'}}>{order.total}€</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h1>🏪 Shiko Dyqanin</h1>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px'}}>
                {Object.values(productsByCategory).flat().map((product) => (
                  <div key={product.id} style={{background: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center'}}>
                    <img src={product.image} alt={product.name} width={200} height={200} style={{borderRadius: '8px'}} />
                    <h3>{product.name}</h3>
                    <p>{product.price}€</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ✅ MODE KLIENT
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* SIDEBAR KLIENT */}
      <div style={{ width: '250px', background: '#2c3e50', color: 'white', padding: '20px' }}>
        <h2>📁 Kategoritë</h2>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.slug)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              background: selectedCategory === category.slug ? '#3498db' : 'transparent',
            }}
          >
            {category.name}
          </div>
        ))}

        {/* SHPORTA */}
        <div style={{ marginTop: '20px', padding: '15px', background: '#34495e', borderRadius: '8px' }}>
          <h3>🛒 Shporta ({cart.length})</h3>
          {cart.length > 0 ? (
            <div>
              {cart.map((item, index) => (
                <div key={index} style={{marginBottom: '5px'}}>
                  {item.name} - {item.price}€
                </div>
              ))}
              <button onClick={createOrder} style={{background: '#27ae60', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', width: '100%', marginTop: '10px'}}>
                ✅ Bëj Porosinë
              </button>
            </div>
          ) : (
            <p>Shporta është e zbrazët</p>
          )}
        </div>
      </div>

      {/* PRODUKTET */}
      <div style={{ flex: 1, padding: '20px', background: '#ecf0f1' }}>
        <h1>{categories.find(cat => cat.slug === selectedCategory)?.name}</h1>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px'}}>
          {currentProducts.map((product) => (
            <div key={product.id} style={{background: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center'}}>
              <img src={product.image} alt={product.name} width={200} height={200} style={{borderRadius: '8px'}} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p style={{fontSize: '1.2em', fontWeight: 'bold', color: '#27ae60'}}>{product.price}€</p>
              <button 
                onClick={() => addToCart(product)}
                style={{background: '#3498db', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', width: '100%'}}
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

// ✅ KOMPONENTI KRYESOR
export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => {
        const adminUsers = ["admin"];
        const isAdmin = adminUsers.includes(user?.username || "");

        return (
          <div>
            <div style={{ 
              background: isAdmin ? '#8e44ad' : '#2ecc71', 
              color: 'white', 
              padding: '15px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ margin: 0 }}>
                  {isAdmin ? '👑 Admin Panel' : '🏪 Dyqani Im'}
                </h3>
                <p style={{ margin: 0 }}>
                  {isAdmin ? 'Mirësevini, Admin!' : `Mirësevini, ${user?.username}`}
                </p>
              </div>
              <button 
                onClick={signOut}
                style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px' }}
              >
                Shkyçu
              </button>
            </div>
            
            <MainApp user={user} isAdmin={isAdmin} />
          </div>
        );
      }}
    </Authenticator>
  );
}
