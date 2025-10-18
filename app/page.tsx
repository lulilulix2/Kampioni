import { useState } from "react";
import "./../app/app.css";

// PRODUKTET
const products = [
  {
    id: 1,
    name: "Patike te punes navy",
    price: 45,
    image: "/images/20180413_150958.jpg",
    description: "patike 949"
  }
];

export default function App() {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(product: any) {
    setCart([...cart, product]);
    alert(`${product.name} u shtua në shportë!`);
  }

  return (
    <main>
      <h1>🏪 Dyqani Im i Patikave</h1>
      
      <div className="cart">
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
    </main>
  );
}
