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

// ✅ TË DHËNAT
const products = [
  { id: 1, name: "Patika Navy", price: 45, image: "https://via.placeholder.com/200" },
  { id: 2, name: "Patika Futboll", price: 35, image: "https://via.placeholder.com/200" }
];

const orders = [
  { id: 1, user: "banana_sh", products: "Patika Navy x2", total: 90 }
];

// ✅ KOMPONENTI KRYESOR
function AppContent({ user, signOut }: { user: any; signOut: any }) {
  const [cart, setCart] = useState<any[]>([]);
  const [isAdmin] = useState(user.username === "admin");

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    alert(`${product.name} u shtua në shportë!`);
  };

  const createOrder = () => {
    if (cart.length === 0) return alert("Shporta është e zbrazët!");
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Porosia u krye! Totali: ${total}€`);
    setCart([]);
  };

  const userOrders = orders.filter(order => order.user === user.username);

  // ✅ ADMIN VIEW
  if (isAdmin) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>👑 Admin Panel</h1>
          <button onClick={signOut} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px' }}>
            Shkyçu
          </button>
        </div>
        
        <h2>📦 Të Gjitha Porositë</h2>
        <div style={{ background: 'white', padding: '15px', borderRadius: '8px' }}>
          {orders.map(order => (
            <div key={order.id} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
              <strong>#{order.id}</strong> - {order.user}: {order.products} - {order.total}€
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ CLIENT VIEW
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>🏪 Dyqani Im i Këpucëve</h1>
        <button onClick={signOut} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px' }}>
          Shkyçu
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* PRODUKTET */}
        <div style={{ flex: 2 }}>
          <h2>Produktet</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            {products.map(product => (
              <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
                <img src={product.image} alt={product.name} width="150" height="150" />
                <h3>{product.name}</h3>
                <p style={{ fontWeight: 'bold', color: '#27ae60' }}>{product.price}€</p>
                <button 
                  onClick={() => addToCart(product)}
                  style={{ background: '#3498db', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', width: '100%' }}
                >
                  🛒 Shto në Shportë
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SHPORTA */}
        <div style={{ flex: 1 }}>
          <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
            <h2>🛒 Shporta ({cart.length})</h2>
            {cart.length > 0 ? (
              <div>
                {cart.map((item, index) => (
                  <div key={index} style={{ marginBottom: '5px' }}>
                    {item.name} - {item.price}€
                  </div>
                ))}
                <button 
                  onClick={createOrder}
                  style={{ background: '#27ae60', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', width: '100%', marginTop: '10px' }}
                >
                  ✅ Bëj Porosinë
                </button>
              </div>
            ) : (
              <p>Shporta është e zbrazët</p>
            )}
          </div>

          {/* POROSIT E KLIENTIT */}
          {userOrders.length > 0 && (
            <div style={{ background: '#e8f6f3', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
              <h3>📦 Porositë e Mia</h3>
              {userOrders.map(order => (
                <div key={order.id} style={{ marginBottom: '5px' }}>
                  #{order.id}: {order.products} - {order.total}€
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ EKSPORTI KRYESOR
export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <AppContent user={user} signOut={signOut} />
      )}
    </Authenticator>
  );
}
