"use client";

import { useState } from "react";
import Link from "next/link";
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function HomePage() {
  return (
    <main style={{padding: '20px', maxWidth: '1200px', margin: '0 auto'}}>
      <h1>🏪 Dyqani Im i Këpucëve</h1>
      
      {/* ✅ Kategoritë kryesore */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px'}}>
        
        {/* Këpucë */}
        <Link href="/kepuca" style={{textDecoration: 'none'}}>
          <div style={{
            border: '2px solid #3498db', 
            padding: '30px', 
            borderRadius: '15px', 
            textAlign: 'center',
            background: '#f8f9fa',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{fontSize: '3em', marginBottom: '15px'}}>👟</div>
            <h2 style={{color: '#2c3e50', margin: '0'}}>Këpucë</h2>
            <p style={{color: '#7f8c8d', margin: '10px 0 0 0'}}>Shiko të gjitha llojet e këpucëve</p>
          </div>
        </Link>

        {/* Opsionale: Kategori të tjera */}
        <div style={{
          border: '2px solid #95a5a6', 
          padding: '30px', 
          borderRadius: '15px', 
          textAlign: 'center',
          background: '#f8f9fa',
          opacity: 0.7
        }}>
          <div style={{fontSize: '3em', marginBottom: '15px'}}>👕</div>
          <h2 style={{color: '#2c3e50', margin: '0'}}>Veshje</h2>
          <p style={{color: '#7f8c8d', margin: '10px 0 0 0'}}>Së shpejti...</p>
        </div>

        <div style={{
          border: '2px solid #95a5a6', 
          padding: '30px', 
          borderRadius: '15px', 
          textAlign: 'center',
          background: '#f8f9fa',
          opacity: 0.7
        }}>
          <div style={{fontSize: '3em', marginBottom: '15px'}}>🎒</div>
          <h2 style={{color: '#2c3e50', margin: '0'}}>Aksesorë</h2>
          <p style={{color: '#7f8c8d', margin: '10px 0 0 0'}}>Së shpejti...</p>
        </div>

      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <div style={{background: '#2ecc71', color: 'white', padding: '15px', marginBottom: '20px'}}>
            <div style={{maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
                <h3 style={{margin: '0'}}>🔐 Mirësevini!</h3>
                <p style={{margin: '5px 0 0 0'}}>Ju jeni loguar si: <strong>{user?.username}</strong></p>
              </div>
              <div>
                <button 
                  onClick={signOut}
                  style={{background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px'}}
                >
                  Shkyçu
                </button>
              </div>
            </div>
          </div>
          <HomePage />
        </div>
      )}
    </Authenticator>
  );
}
