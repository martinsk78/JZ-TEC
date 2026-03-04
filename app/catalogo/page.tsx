"use client";

import Link from "next/link";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  emoji: string;
  desc: string;
}

interface CartItem extends Product {
  qty: number;
}

const PRODUCTS: Product[] = [
  // RAM
  { id: 1, name: "RAM DDR4 8GB", category: "RAM", price: 18000, emoji: "🧠", desc: "Memoria DDR4 2666MHz compatible con la mayoría de PCs de escritorio." },
  { id: 2, name: "RAM DDR4 16GB", category: "RAM", price: 32000, emoji: "🧠", desc: "Memoria DDR4 3200MHz ideal para trabajo y gaming." },
  { id: 3, name: "RAM DDR3 4GB", category: "RAM", price: 8000, emoji: "🧠", desc: "Memoria DDR3 1600MHz para equipos más antiguos." },
  // SSD
  { id: 4, name: "SSD 240GB SATA", category: "SSD", price: 22000, emoji: "💾", desc: "SSD SATA 2.5\" para reemplazar disco rígido. Velocidad de lectura 500MB/s." },
  { id: 5, name: "SSD 480GB SATA", category: "SSD", price: 38000, emoji: "💾", desc: "SSD SATA 2.5\" con mayor capacidad. Ideal para notebooks." },
  { id: 6, name: "SSD M.2 NVMe 256GB", category: "SSD", price: 35000, emoji: "💾", desc: "SSD NVMe M.2 ultra rápido para PCs modernas." },
  { id: 7, name: "SSD M.2 NVMe 512GB", category: "SSD", price: 58000, emoji: "💾", desc: "SSD NVMe M.2 512GB. Velocidad de lectura 3200MB/s." },
  // Cables
  { id: 8, name: "Cable HDMI 2.0 1.5m", category: "Cables", price: 4500, emoji: "🔌", desc: "Cable HDMI 2.0 soporte 4K@60Hz. 1.5 metros." },
  { id: 9, name: "Cable USB-C a USB-A", category: "Cables", price: 3200, emoji: "🔌", desc: "Cable de datos y carga USB-C. 1 metro." },
  { id: 10, name: "Cable SATA datos", category: "Cables", price: 1800, emoji: "🔌", desc: "Cable SATA para disco o SSD interno." },
  // Pasta térmica
  { id: 11, name: "Pasta Térmica Cooler Master", category: "Accesorios", price: 3500, emoji: "🧴", desc: "Pasta térmica de alta conductividad. 1.5g." },
  { id: 12, name: "Pasta Térmica Arctic MX-4", category: "Accesorios", price: 5500, emoji: "🧴", desc: "Pasta térmica premium. 4g. Referencia del mercado." },
  // Ventiladores
  { id: 13, name: "Fan 120mm RGB", category: "Accesorios", price: 8500, emoji: "🌀", desc: "Ventilador 120mm con iluminación RGB para gabinete." },
  { id: 14, name: "Cooler CPU Universal", category: "Accesorios", price: 14000, emoji: "🌀", desc: "Cooler para procesador compatible con Intel y AMD." },
  // Adaptadores
  { id: 15, name: "Adaptador HDMI a VGA", category: "Adaptadores", price: 5000, emoji: "🔄", desc: "Convierte señal HDMI a VGA. Plug & play." },
  { id: 16, name: "Hub USB 4 puertos", category: "Adaptadores", price: 7500, emoji: "🔄", desc: "Hub USB 3.0 con 4 puertos. Alimentado por USB." },
];

const CATEGORIES = ["Todos", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
const WA_NUMBER = "543624854094"; // Reemplazar con número real

export default function Catalogo() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = activeCategory === "Todos" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);
  const totalItems = cart.reduce((a, b) => a + b.qty, 0);
  const totalPrice = cart.reduce((a, b) => a + b.price * b.qty, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const sendWhatsApp = () => {
    const lines = cart.map(i => `• ${i.name} x${i.qty} — $${(i.price * i.qty).toLocaleString("es-AR")}`).join("\n");
    const msg = `Hola Alonso Informática! Quiero consultar por los siguientes repuestos:\n\n${lines}\n\n*Total: $${totalPrice.toLocaleString("es-AR")}*\n\n¿Tienen stock disponible?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inCart = (id: number) => cart.find(i => i.id === id);

  return (
    <main style={{ fontFamily: "'Roboto Slab', serif", backgroundImage: "linear-gradient(135deg, #020d1a 0%, #08090d 40%, #011824 70%, #08090d 100%), radial-gradient(ellipse at 20% 50%, rgba(0,229,255,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,119,255,0.05) 0%, transparent 60%)", color: "#f0f0f0", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=DM+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #08090d; }
        ::-webkit-scrollbar-thumb { background: #00e5ff; border-radius: 4px; }

        .cat-btn {
          font-family: 'DM Mono', monospace; font-size: 0.78rem; letter-spacing: 0.08em;
          text-transform: uppercase; padding: 8px 18px; border-radius: 3px; cursor: pointer;
          border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #666;
          transition: all 0.2s;
        }
        .cat-btn:hover { border-color: #00e5ff; color: #00e5ff; }
        .cat-btn.active { background: #00e5ff; color: #08090d; border-color: #00e5ff; font-weight: 700; }

        .product-card {
          background: #0e1017; border: 1px solid rgba(255,255,255,0.07); border-radius: 8px;
          overflow: hidden; transition: all 0.3s cubic-bezier(0.23,1,0.32,1); display: flex; flex-direction: column;
        }
        .product-card:hover { border-color: rgba(0,229,255,0.3); transform: translateY(-4px); }

        .add-btn {
          width: 100%; padding: 12px; border: none; border-radius: 4px; cursor: pointer;
          font-family: 'Roboto Slab', serif; font-weight: 700; font-size: 0.9rem;
          transition: all 0.2s; letter-spacing: 0.03em;
        }
        .add-btn.not-in { background: #00e5ff; color: #08090d; }
        .add-btn.not-in:hover { background: #33edff; }
        .add-btn.in-cart { background: rgba(0,229,255,0.12); color: #00e5ff; border: 1px solid rgba(0,229,255,0.3); }

        .cart-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; width: 420px; max-width: 100vw;
          background: #0e1017; border-left: 1px solid rgba(0,229,255,0.15);
          z-index: 200; display: flex; flex-direction: column;
          transform: translateX(100%); transition: transform 0.35s cubic-bezier(0.23,1,0.32,1);
        }
        .cart-drawer.open { transform: translateX(0); }

        .cart-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 199;
          opacity: 0; pointer-events: none; transition: opacity 0.3s;
        }
        .cart-overlay.open { opacity: 1; pointer-events: all; }

        .qty-btn {
          width: 28px; height: 28px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1);
          background: transparent; color: #f0f0f0; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center; transition: all 0.15s;
        }
        .qty-btn:hover { border-color: #00e5ff; color: #00e5ff; }

        .wa-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: #25D366; color: white; font-weight: 700; font-size: 1rem;
          padding: 16px; border: none; border-radius: 6px; cursor: pointer;
          font-family: 'Roboto Slab', serif; transition: all 0.2s; width: 100%;
        }
        .wa-btn:hover { background: #20bd5a; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,211,102,0.3); }
        .wa-btn:disabled { background: #1a3324; color: #2d6e45; cursor: not-allowed; transform: none; box-shadow: none; }

        .tag { display: inline-block; font-family: 'DM Mono', monospace; font-size: 0.75rem; color: #00e5ff; background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.2); padding: 3px 10px; border-radius: 2px; letter-spacing: 0.1em; text-transform: uppercase; }

        .glow-text { background: linear-gradient(135deg, #00e5ff 0%, #0077ff 60%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        .emoji-box {
          height: 140px; display: flex; align-items: center; justify-content: center;
          font-size: 3.5rem; background: #13151f;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        @media (max-width: 768px) {
          .cart-drawer { width: 100vw; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "16px 32px", background: "rgba(8,9,13,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "#f0f0f0" }}>
            <div style={{ width: 36, height: 36, background: "#00e5ff", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.7rem", color: "#08090d" }}>AI</div>
            <span style={{ fontWeight: 700 }}>Alonso Informática</span>
          </Link>
          <span style={{ color: "#333", fontSize: "1.2rem" }}>/</span>
          <span style={{ color: "#666", fontSize: "0.9rem", fontFamily: "'DM Mono', monospace" }}>catálogo</span>
        </div>

        <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.25)", borderRadius: 6, padding: "10px 20px", cursor: "pointer", color: "#00e5ff", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}>
          🛒 Carrito
          {totalItems > 0 && (
            <span style={{ background: "#00e5ff", color: "#08090d", borderRadius: "50%", width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 800 }}>{totalItems}</span>
          )}
        </button>
      </nav>

      {/* HEADER */}
      <div style={{ padding: "60px 32px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div className="tag" style={{ marginBottom: 16 }}>// Repuestos y accesorios</div>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 12 }}>
          <span className="glow-text">Catálogo</span> de Repuestos
        </h1>
        <p style={{ color: "#666", fontSize: "1rem", fontFamily: "'DM Mono', monospace" }}>
          Agregá productos al carrito y consultá disponibilidad por WhatsApp
        </p>
      </div>

      {/* CATEGORÍAS */}
      <div style={{ padding: "0 32px 32px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} className={`cat-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRILLA */}
      <div style={{ padding: "0 32px 80px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {filtered.map(product => {
            const cartItem = inCart(product.id);
            return (
              <div key={product.id} className="product-card">
                <div className="emoji-box">{product.emoji}</div>
                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="tag">{product.category}</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f0f0f0", lineHeight: 1.3 }}>{product.name}</h3>
                  <p style={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.6, flex: 1 }}>{product.desc}</p>
                  <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#00e5ff", fontFamily: "'DM Mono', monospace", marginTop: 4 }}>
                    ${product.price.toLocaleString("es-AR")}
                  </div>
                  <button className={`add-btn ${cartItem ? "in-cart" : "not-in"}`} onClick={() => addToCart(product)}>
                    {cartItem ? `✓ En carrito (${cartItem.qty})` : "+ Agregar"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CART OVERLAY */}
      <div className={`cart-overlay ${cartOpen ? "open" : ""}`} onClick={() => setCartOpen(false)} />

      {/* CART DRAWER */}
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        {/* Header */}
        <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 800 }}>Tu Carrito</h2>
            <p style={{ color: "#555", fontSize: "0.8rem", fontFamily: "'DM Mono', monospace", marginTop: 2 }}>{totalItems} producto{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => setCartOpen(false)} style={{ background: "rgba(255,255,255,0.05)", border: "none", color: "#aaa", cursor: "pointer", width: 36, height: 36, borderRadius: 6, fontSize: "1.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#333" }}>
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>🛒</div>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.85rem" }}>El carrito está vacío</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cart.map(item => (
                <div key={item.id} style={{ background: "#13151f", borderRadius: 8, padding: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 2 }}>{item.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "#555", fontFamily: "'DM Mono', monospace" }}>${item.price.toLocaleString("es-AR")} c/u</div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: "1rem", padding: "0 4px" }}>✕</button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.9rem", minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <div style={{ fontWeight: 800, color: "#00e5ff", fontFamily: "'DM Mono', monospace" }}>
                      ${(item.price * item.qty).toLocaleString("es-AR")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {cart.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ color: "#aaa", fontFamily: "'DM Mono', monospace", fontSize: "0.85rem" }}>Total estimado</span>
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#00e5ff", fontFamily: "'DM Mono', monospace" }}>
                ${totalPrice.toLocaleString("es-AR")}
              </span>
            </div>
          )}
          <button className="wa-btn" disabled={cart.length === 0} onClick={sendWhatsApp}>
            <span style={{ fontSize: "1.2rem" }}>💬</span>
            Consultar por WhatsApp
          </button>
          <p style={{ textAlign: "center", color: "#333", fontSize: "0.75rem", fontFamily: "'DM Mono', monospace", marginTop: 10 }}>
            Se enviará el detalle completo del pedido
          </p>
        </div>
      </div>
    </main>
  );
}