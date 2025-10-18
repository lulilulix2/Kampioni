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

// ✅ POROSIT E TË GJITHË KLIENTËVE
const allOrders = [
  { id: 1, user: "banana_sh", products: "Patika Navy x2", total: 90, date: "2025-10-18", status: "Completed" },
  { id: 2, user: "banana_store", products: "Patika Futboll x1", total: 35, date: "2025-10-18", status: "Processing" },
  { id: 3, user: "banana_center", products: "Patika Fëmijë x1", total: 25, date: "2025-10-17", status: "Completed" },
  { id: 4, user: "banana_sh", products: "Patika Size 38 x1", total: 30, date: "2025-10-16", status: "Shipped" }
];

// ✅ KATEGORITË DHE PRODUKTET
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
    },
    { 
      id: 2, 
      name: "Këpucë Sigurie", 
      price: 55, 
      image: "https://via.placeholder.com/300x300/2980b9/ffffff?text=Këpucë+Sigurie", 
      description: "Me majë çeliku" 
    }
  ],
  "sport": [
    { 
      id: 3, 
      name: "Patika Futboll", 
      price: 35, 
      image: "https://via.placeholder.com/300x300/e74c3c/ffffff?text=Patika+Futboll", 
      description: "Për futboll dhe sport" 
    },
    { 
      id: 4, 
      name: "Patika Vrapimi", 
      price: 40, 
      image: "https://via.placeholder.com/300x300/c0392b/ffffff?text=Patika+Vrapimi", 
      description: "Të lehta dhe komode" 
    }
  ],
  "36-40": [
    { 
      id: 5, 
      name: "Patika Size 38", 
      price: 30, 
      image: "https://via.placeholder.com/300x300/27ae60/ffffff?text=Size+38", 
      description: "Madhësi 38" 
    },
    { 
      id: 6, 
      name: "Patika Size 40", 
      price: 32, 
      image: "https://via.placeholder.com/300x300/229954/ffffff?text=Size+40", 
      description: "Madhësi 40" 
    }
  ],
  "femije": [
    { 
      id: 7, 
      name: "Patika Fëmijë Vogël", 
      price: 25, 
      image: "https://via.placeholder.com/300x300/9b59b6/ffffff?text=Fëmijë+Vogël", 
      description: "Për fëmijë të vegjël" 
    },
    { 
      id: 8, 
      name: "Patika Fëmijë Të Mëdhenj", 
      price: 28, 
      image: "https://via.placeholder.com/300x300/8e44ad/ffffff?text=Fëmijë+Të+Mëdhenj", 
      description: "Për fëmijë të mëdhenj" 
    }
  ]
};

// ✅ KOMPONENTI KRYESOR
function MainApp({ user, isAdmin }: { user: any; isAdmin: boolean }) {
  const [cart, setCart] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("punës");
  const [currentView, setCurrentView] = useState<"products" | "orders" | "stats">("products");

  // ✅ FUNKSIONET PËR KLIENTËT
  function addToCart(product: any) {
    const cartItem = { 
      id: product.id, 
      name: product.name, 
      price: product.price 
    };
    setCart([...cart, cartItem]);
    alert(`${product.name} u shtua në shportë!`);
  }

  function createOrder() {
    if (cart.length === 0) {
      alert("Shporta është e zbrazët!");
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const orderDetails = cart.map(item => item.name).join(", ");
    
    alert(`✅ Porosia u krye me sukses!\n\nKlienti: ${user.username}\nProduktet: ${orderDetails}\nTotali: ${total}€`);
    setCart([]);
  }

  const currentProducts = productsByCategory[selectedCategory as keyof typeof productsByCategory] || [];
  const userOrders = allOrders.filter(order => order.user === user.username);

  // ✅ LLOGARITJE STATISTIKASH PËR ADMIN
  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = allOrders.length;
  const completedOrders = allOrders.filter(order => order.status === "Completed").length;

  // ✅ NËSE ËSHTË ADMIN, SHFAQ ADMIN PANEL
  if (isAdmin) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* SIDEBAR ADMIN */}
        <div style={{ 
          width: '300px', 
          background: 'linear-gradient(180deg, #8e44ad 0%, #6c3483 100%)', 
          color: 'white', 
          padding: '25px', 
          height: '100vh', 
          position: 'sticky', 
          top: 0,
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ fontSize: '2.5em', marginBottom: '10px' }}>👑</div>
            <h2 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>Admin Panel</h2>
            <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>Dyqani Im i Këpucëve</p>
          </div>
          
          <nav>
            <div
              onClick={() => setCurrentView("stats")}
              style={{
                padding: '15px',
                margin: '8px 0',
                borderRadius: '10px',
                cursor: 'pointer',
                background: currentView === "stats" ? '#9b59b6' : 'transparent',
                border: currentView === "stats" ? '1px solid #8e44ad' : '1px solid transparent',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>📊</span>
              <span>Dashboard</span>
            </div>
            <div
              onClick={() => setCurrentView("orders")}
              style={{
                padding: '15px',
                margin: '8px 0',
                borderRadius: '10px',
                cursor: 'pointer',
                background: currentView === "orders" ? '#9b59b6' : 'transparent',
                border: currentView === "orders" ? '1px solid #8e44ad' : '1px solid transparent',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>📦</span>
              <span>Të Gjitha Porositë</span>
            </div>
            <div
              onClick={() => setCurrentView("products")}
              style={{
                padding: '15px',
                margin: '8px 0',
                borderRadius: '10px',
                cursor: 'pointer',
                background: currentView === "products" ? '#9b59b6' : 'transparent',
                border: currentView === "products" ? '1px solid #8e44ad' : '1px solid transparent',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>🏪</span>
              <span>Shiko Dyqanin</span>
            </div>
          </nav>

          {/* STATISTIKAT E SHPEJTA */}
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>📈 Përmbledhje</h3>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              <div>🛒 Total Porosi: <strong>{totalOrders}</strong></div>
              <div>💰 Të Ardhura: <strong>{totalRevenue}€</strong></div>
              <div>✅ të Përfunduara: <strong>{completedOrders}</strong></div>
            </div>
          </div>
        </div>

        {/* PËRMBLEDHJA ADMIN */}
        <div style={{ flex: 1, padding: '30px', background: '#f8f9fa' }}>
          {currentView === "stats" && (
            <div>
              <h1 style={{ color: '#8e44ad', marginBottom: '10px' }}>📊 Dashboard Admin</h1>
              <p style={{ color: '#7f8c8d', marginBottom: '30px' }}>Përmbledhje e plotë e dyqanit tuaj</p>
              
              {/* STATISTIKAT */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '2em', marginBottom: '10px' }}>🛒</div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Total Porosi</h3>
                  <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#8e44ad' }}>{totalOrders}</div>
                </div>
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '2em', marginBottom: '10px' }}>💰</div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Të Ardhura</h3>
                  <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#27ae60' }}>{totalRevenue}€</div>
                </div>
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                  <div style={{ fontSize: '2em', marginBottom: '10px' }}>👥</div>
                  <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Klientët</h3>
                  <div style={{ fontSize: '2em', fontWeight: 'bold', color: '#3498db' }}>3</div>
                </div>
              </div>

              {/* POROSITË E FUNDIT */}
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>📦 Porositë e Fundit</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>ID</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Klienti</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Produktet</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Totali</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Statusi</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders.slice(0, 5).map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                          <td style={{ padding: '12px' }}>#{order.id}</td>
                          <td style={{ padding: '12px', fontWeight: '500' }}>{order.user}</td>
                          <td style={{ padding: '12px' }}>{order.products}</td>
                          <td style={{ padding: '12px', fontWeight: 'bold', color: '#27ae60' }}>{order.total}€</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              background: 
                                order.status === 'Completed' ? '#27ae60' :
                                order.status === 'Processing' ? '#f39c12' :
                                order.status === 'Shipped' ? '#3498db' : '#95a5a6',
                              color: 'white'
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px', color: '#7f8c8d' }}>{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentView === "orders" && (
            <div>
              <h1 style={{ color: '#8e44ad', marginBottom: '20px' }}>📦 Të Gjitha Porositë</h1>
              
              <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>ID</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Klienti</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Produktet</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Totali</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Statusi</th>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #8e44ad', color: '#8e44ad' }}>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: '1px solid #ecf0f1' }}>
                          <td style={{ padding: '12px' }}>#{order.id}</td>
                          <td style={{ padding: '12px', fontWeight: '500' }}>{order.user}</td>
                          <td style={{ padding: '12px' }}>{order.products}</td>
                          <td style={{ padding: '12px', fontWeight: 'bold', color: '#27ae60' }}>{order.total}€</td>
                          <td style={{ padding: '12px' }}>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              background: 
                                order.status === 'Completed' ? '#27ae60' :
                                order.status === 'Processing' ? '#f39c12' :
                                order.status === 'Shipped' ? '#3498db' : '#95a5a6',
                              color: 'white'
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px', color: '#7f8c8d' }}>{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentView === "products" && (
            <div>
              <h1 style={{ color: '#8e44ad', marginBottom: '20px' }}>🏪 Shiko Dyqanin si Klient</h1>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
                {Object.values(productsByCategory).flat().map((product) => (
                  <div key={product.id} style={{ 
                    background: 'white', 
                    border: '1px solid #e0e0e0', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    textAlign: 'center',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease'
                  }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      width={250}
                      height={250}
                      style={{ 
                        borderRadius: '8px', 
                        marginBottom: '15px', 
                        objectFit: 'cover',
                        border: '1px solid #f0f0f0'
                      }} 
                    />
                    <h3 style={{ color: '#2c3e50', margin: '0 0 10px 0', fontSize: '18px' }}>{product.name}</h3>
                    <p style={{ color: '#7f8c8d', margin: '0 0 10px 0', fontSize: '14px' }}>{product.description}</p>
                    <p style={{ 
                      fontSize: '1.4em', 
                      fontWeight: 'bold', 
                      color: '#27ae60', 
                      margin: '0 0 15px 0' 
                    }}>
                      {product.price}€
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ✅ MODE KLIENT (si më parë)
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* SIDEBAR KLIENT */}
      <div style={{ 
        width: '280px', 
        background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)', 
        color: 'white', 
        padding: '20px', 
        height: '100vh', 
        position: 'sticky', 
        top: 0 
      }}>
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
                transition: 'all 0.3s ease',
                border: selectedCategory === category.slug ? '1px solid #2980b9' : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.slug) {
                  e.currentTarget.style.background = '#34495e';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.slug) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {category.name}
            </div>
          ))}
        </nav>

        {/* SHPORTA KLIENT */}
        <div style={{ 
          marginTop: '30px', 
          padding: '15px', 
          background: 'rgba(52, 73, 94, 0.8)', 
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ margin: '0 0 10px 0' }}>🛒 Shporta ({cart.length})</h3>
          {cart.length > 0 ? (
            <div>
              <div style={{ fontSize: '14px', marginBottom: '10px', maxHeight: '150px', overflowY: 'auto' }}>
                {cart.map((item, index) => (
                  <div key={index} style={{ 
                    marginBottom: '5px', 
                    padding: '5px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px'
                  }}>
                    {item.name} - {item.price}€
                  </div>
                ))}
              </div>
              <div style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                marginBottom: '10px',
                padding: '8px',
                background: '#27ae60',
                borderRadius: '5px',
                textAlign: 'center'
              }}>
                Total: {cart.reduce((sum, item) => sum + item.price, 0)}€
              </div>
              <button 
                onClick={createOrder}
                style={{
                  background: '#27ae60', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 15px', 
                  borderRadius: '6px', 
                  cursor: 'pointer', 
                  width: '100%',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#229954'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#27ae60'}
              >
                ✅ Bëj Porosinë
              </button>
            </div>
          ) : (
            <p style={{ fontSize: '14px', color: '#bdc3c7', textAlign: 'center' }}>Shporta është e zbrazët</p>
          )}
        </div>

        {/* POROSIT E KLIENTIT */}
        {userOrders.length > 0 && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            background: 'rgba(22, 160, 133, 0.8)', 
            borderRadius: '8px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>📦 Porositë e Mia</h3>
            <div style={{ fontSize: '14px', maxHeight: '120px', overflowY: 'auto' }}>
              {userOrders.map((order) => (
                <div key={order.id} style={{ 
                  marginBottom: '5px', 
                  padding: '5px',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '4px'
                }}>
                  <div>#{order.id}: {order.products}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{order.total}€ - {order.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PRODUKTET KLIENT */}
      <div style={{ flex: 1, padding: '30px', background: '#ecf0f1' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>
          {categories.find(cat => cat.slug === selectedCategory)?.name}
        </h1>
        <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>Zgjidhni nga produktet tona të cilësisë së lartë</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {currentProducts.map((product) => (
            <div key={product.id} style={{ 
              background: 'white', 
              border: '1px solid #e0e0e0', 
              borderRadius: '12px', 
              padding: '20px', 
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} 
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }}>
              <img 
                src={product.image} 
                alt={product.name}
                width={250}
                height={250}
                style={{ 
                  borderRadius: '8px', 
                  marginBottom: '15px', 
                  objectFit: 'cover',
                  border: '1px solid #f0f0f0'
                }} 
              />
              <h3 style={{ color: '#2c3e50', margin: '0 0 10px 0', fontSize: '18px' }}>{product.name}</h3>
              <p style={{ color: '#7f8c8d', margin: '0 0 10px 0', fontSize: '14px', minHeight: '40px' }}>{product.description}</p>
              <p style={{ 
                fontSize: '1.4em', 
                fontWeight: 'bold', 
                color: '#27ae60', 
                margin: '0 0 15px 0' 
              }}>
                {product.price}€
              </p>
              <button 
                onClick={() => addToCart(product)}
                style={{
                  background: '#3498db', 
                  color: 'white', 
                  border: 'none', 
                  padding: '12px 20px', 
                  borderRadius: '6px', 
                  cursor: 'pointer', 
                  width: '100%', 
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#2980b9'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#3498db'}
              >
                🛒 Shto në Shportë
              </button>
            </div>
          ))}
        </div>

        {currentProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#7f8c8d' }}>
            <h3>Nuk ka produkte në këtë kategori</h3>
            <p>Zgjidh një kategori tjetër nga sidebar-i</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ KOMPONENTI KRYESOR EKSPORT
export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => {
        // ✅ PËRCAKTIMI I ADMINIT
        const adminUsers = ["admin"]; // VENDOS KËTU USERNAME-IN E ADMINIT TËND
        const isAdmin = adminUsers.includes(user?.username || "");

        return (
          <div>
            <div style={{ 
              background: isAdmin ? 
                'linear-gradient(90deg, #8e44ad 0%, #6c3483 100%)' : 
                'linear-gradient(90deg, #2ecc71 0%, #27ae60 100%)', 
              color: 'white', 
              padding: '15px 20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: 0,
              zIndex: 1000
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto'
              }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '20px' }}>
                    {isAdmin ? '👑 Admin Panel - Dyqani Im' : '🏪 Dyqani Im i Këpucëve'}
                  </h3>
                  <p style={{ margin: '2px 0 0 0', fontSize: '14px', opacity: 0.9 }}>
                    {isAdmin ? 'Mirësevini, Admin!' : `Mirësevini, ${user?.username}`}
                  </p>
                </div>
                <button 
                  onClick={signOut}
                  style={{ 
                    background: 'rgba(255,255,255,0.2)', 
                    color: 'white', 
                    border: '1px solid rgba(255,255,255,0.3)', 
                    padding: '8px 15px', 
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Shkyçu
                </button>
              </div>
            </div>
            
            <MainApp user={user} isAdmin={isAdmin} />
          </div>
        );
      }}
    </Authenticator>
  );
}
