"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import "./app.css";

interface Produkt {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Produkt[] = [
  { id: 1, name: "Patike Futboll", price: 35, image: "/images/futboll.jpg" },
  { id: 2, name: "Patike Work", price: 45, image: "/images/work.jpg" },
];

export default function HomePage() {
  // Login/Register state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // User & Orders
  const [user, setUser] = useState<any>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Firebase login/register
  const handleAuth = async () => {
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setUser(auth.currentUser);
      alert("Success!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  // Place order
  const handleOrder = async () => {
    if (!user) return alert("Login first");
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      products: selected,
      createdAt: new Date(),
    });
    alert("Order placed!");
    setSelected([]);
  };

  // Fetch orders (for admin)
  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    // Auto fetch orders if admin
    if (user?.email === "admin@example.com") fetchOrders();
  }, [user]);

  return (
    <div className="container">
      {!user ? (
        <div className="login-box">
          <h2>{isRegister ? "Register" : "Login"}</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleAuth}>{isRegister ? "Register" : "Login"}</button>
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Have an account? Login" : "No account? Register"}
          </button>
        </div>
      ) : (
        <div>
          <h1>Welcome {user.email}</h1>

          <h2>Products</h2>
          {products.map((p) => (
            <div key={p.id} className="product">
              <h3>{p.name}</h3>
              <p>{p.price} €</p>
              <Image src={p.image} width={200} height={200} alt={p.name} />
              <button onClick={() => setSelected([...selected, p.id])}>Add to Order</button>
            </div>
          ))}

          <button onClick={handleOrder} disabled={selected.length === 0}>
            Place Order ({selected.length})
          </button>

          {user.email === "admin@example.com" && (
            <div className="admin-panel">
              <h2>All Orders</h2>
              {orders.map((o) => (
                <div key={o.id}>
                  <p>User ID: {o.userId}</p>
                  <p>Products: {o.products.join(", ")}</p>
                  <p>Date: {o.createdAt.toDate().toString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
