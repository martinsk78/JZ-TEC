"use client";

import { useState, useEffect, useRef, RefObject } from "react";

interface AnimNumTypes {
  target: string,
  suffix: string;
}

const SERVICES = [
  {
    icon: "💻",
    title: "PC & Notebooks",
    desc: "Diagnóstico completo, limpieza, reemplazo de componentes y optimización de rendimiento.",
  },
  {
    icon: "⚡",
    title: "Upgrade a SSD",
    desc: "Cambio de disco rígido a SSD con migración de datos incluida. Tu equipo nuevo en horas.",
  },
  {
    icon: "🛡️",
    title: "Eliminación de Virus",
    desc: "Limpieza profunda de malware, ransomware y adware. Instalación de protección.",
  },
  {
    icon: "📺",
    title: "Smart TV",
    desc: "Reparación de pantallas, placas de imagen, audio y conectividad de todas las marcas.",
  },
  {
    icon: "🎮",
    title: "Consolas",
    desc: "PlayStation, Xbox, Nintendo Switch. Lectores, HDMI, cooling y más.",
  },
  {
    icon: "🔌",
    title: "Placas Electrónicas",
    desc: "Soldadura SMD, reballing de GPU/CPU, reparación a nivel componente.",
  },
];

const REASONS = [
  {
    num: "10+",
    label: "años de experiencia",
    detail: "en servicio técnico electrónico en Santa Fe Capital",
  },
  {
    num: "48h",
    label: "tiempo promedio",
    detail: "diagnóstico y reparación en menos de 48 horas",
  },
  {
    num: "100%",
    label: "garantía escrita",
    detail: "en todas las reparaciones realizadas",
  },
];

function useInView<T extends HTMLElement>(threshold = 0.15): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedNumber({ target, suffix = "" }: AnimNumTypes) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView<HTMLSpanElement>();
  const numTarget = parseInt(target);
  useEffect(() => {
    if (!inView || isNaN(numTarget)) return;
    let start = 0;
    const step = Math.ceil(numTarget / 40);
    const id = setInterval(() => {
      start += step;
      if (start >= numTarget) {
        setVal(numTarget);
        clearInterval(id);
      } else setVal(start);
    }, 30);
    return () => clearInterval(id);
  }, [inView, numTarget]);
  if (isNaN(numTarget)) return <span ref={ref}>{target}</span>;
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [heroRef, heroInView] = useInView<HTMLDivElement>(0.1);
  const [servRef, servInView] = useInView<HTMLDivElement>(0.1);
  const [whyRef, whyInView] = useInView<HTMLDivElement>(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main
      style={{
        fontFamily: "Roboto Slab",
        background: "#08090d",
        color: "#f0f0f0",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Libre+Franklin:ital,wght@0,100..900;1,100..900&family=Roboto+Slab:wght@100..900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');        
        *, *::before, *::after {scroll-behavior:smooth; box-sizing: border-box; margin: 0; padding: 0; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #08090d; }
        ::-webkit-scrollbar-thumb { background: #00e5ff; border-radius: 4px; }

        .nav-link {
          color: #aaa;
          text-decoration: none;
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #00e5ff; }

        .hero-title {
          font-size: clamp(2.8rem, 8vw, 6.5rem);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
        }

        .glow-text {
          background: linear-gradient(135deg, #00e5ff 0%, #0077ff 60%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .scan-line {
          position: relative;
          overflow: hidden;
        }
        .scan-line::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 50%, rgba(0,229,255,0.03) 50%);
          background-size: 100% 4px;
          pointer-events: none;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #00e5ff;
          color: #08090d;
          font-weight: 700;
          font-size: 1rem;
          padding: 16px 36px;
          border-radius: 4px;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
          font-family: 'Syne', sans-serif;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .btn-primary:hover::before { opacity: 0.15; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,229,255,0.35); }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(0,229,255,0.35);
          color: #00e5ff;
          font-weight: 600;
          font-size: 1rem;
          padding: 15px 36px;
          border-radius: 4px;
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: all 0.25s;
          font-family: 'Syne', sans-serif;
        }
        .btn-ghost:hover {
          background: rgba(0,229,255,0.08);
          border-color: #00e5ff;
          transform: translateY(-2px);
        }

        .service-card {
          background: #0e1017;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 36px 32px;
          transition: all 0.35s cubic-bezier(0.23,1,0.32,1);
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00e5ff, #0077ff);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1);
        }
        .service-card:hover { border-color: rgba(0,229,255,0.25); transform: translateY(-6px); background: #111420; }
        .service-card:hover::before { transform: scaleX(1); }

        .stat-card {
          border-left: 2px solid #00e5ff;
          padding-left: 28px;
        }

        .tag {
          display: inline-block;
          font-family: 'DM Mono', monospace;
          font-size: 0.89rem;
          color: #00e5ff;
          background: rgba(0,229,255,0.08);
          border: 1px solid rgba(0,229,255,0.2);
          padding: 4px 12px;
          border-radius: 2px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .noise-bg {
          position: relative;
        }
        .noise-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
          pointer-events: none;
          opacity: 0.4;
        }

        .float-anim {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .fade-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up.delay-1 { transition-delay: 0.1s; }
        .fade-up.delay-2 { transition-delay: 0.2s; }
        .fade-up.delay-3 { transition-delay: 0.3s; }
        .fade-up.delay-4 { transition-delay: 0.4s; }
        .fade-up.delay-5 { transition-delay: 0.5s; }
        .fade-up.delay-6 { transition-delay: 0.6s; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .cta-section {
          background: linear-gradient(135deg, #001a2e 0%, #08090d 50%, #0d0820 100%);
          position: relative;
        }
        .cta-section::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00e5ff, transparent);
        }

        .mono { font-family: 'DM Mono', monospace; }

        @media (max-width: 768px) {
          .hero-title { letter-spacing: -0.02em; }
          .hide-mobile { display: none; }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(8,9,13,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.35s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 42,
              height: 42,
              background: "#00e5ff",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1rem",
              color: "#08090d",
              letterSpacing: "-0.04em",
            }}
          >
            JZ
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "0.04em",
            }}
          >
            TEC
          </span>
        </div>
        <div
          style={{ display: "flex", gap: 36, alignItems: "center" }}
          className="hide-mobile"
        >
          <a href="#servicios" className="nav-link">
            Servicios
          </a>
          <a href="#nosotros" className="nav-link">
            Nosotros
          </a>
          <a
            href="https://wa.me/549XXXXXXXXXX"
            target="_blank"
            className="btn-primary"
            style={{ padding: "10px 22px" }}
          >
            WhatsApp
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="scan-line noise-bg grid-bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: 100,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10%",
              right: "-5%",
              width: "55vw",
              height: "55vw",
              background:
                "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "5%",
              left: "-10%",
              width: "45vw",
              height: "45vw",
              background:
                "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)",
              borderRadius: "50%",
            }}
          />
          {/* Decorative circuit lines */}
          <svg
            style={{
              position: "absolute",
              top: "20%",
              right: "8%",
              opacity: 0.12,
            }}
            width="220"
            height="220"
            viewBox="0 0 220 220"
          >
            <rect
              x="10"
              y="10"
              width="80"
              height="80"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="1"
            />
            <rect
              x="30"
              y="30"
              width="40"
              height="40"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="1"
            />
            <line
              x1="90"
              y1="50"
              x2="210"
              y2="50"
              stroke="#00e5ff"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <line
              x1="50"
              y1="90"
              x2="50"
              y2="210"
              stroke="#00e5ff"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle cx="210" cy="50" r="5" fill="#00e5ff" />
            <circle cx="50" cy="210" r="5" fill="#00e5ff" />
            <rect
              x="130"
              y="130"
              width="60"
              height="60"
              fill="none"
              stroke="#00e5ff"
              strokeWidth="1"
            />
          </svg>
        </div>

        <div
          ref={heroRef}
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 40px",
            width: "100%",
          }}
        >
          <div className={`fade-up ${heroInView ? "visible" : ""}`}>
            <div className="tag">// Santa Fe Capital · Arg</div>
          </div>

          <h1
            className={`hero-title fade-up ${heroInView ? "visible" : ""} delay-1`}
          >
            <span style={{ display: "block", color: "#f0f0f0" }}>Servicio</span>
            <span className="glow-text" style={{ display: "block" }}>
              Técnico
            </span>
            <span style={{ display: "block", color: "#f0f0f0" }}>
              Electrónico
            </span>
          </h1>

          <p
            className={`fade-up ${heroInView ? "visible" : ""} delay-2`}
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "#888",
              maxWidth: 540,
              lineHeight: 1.7,
              margin: "28px 0 44px",
            }}
          >
            Reparamos computadoras, notebooks, televisores, consolas y placas
            electrónicas. Diagnóstico rápido y garantía escrita en cada trabajo.
          </p>

          <div
            className={`fade-up ${heroInView ? "visible" : ""} delay-3`}
            style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
          >
            <a
              href="https://wa.me/549XXXXXXXXXX"
              target="_blank"
              className="btn-primary"
            >
              <span>💬</span> Consultar por WhatsApp
            </a>
            <a href="#servicios" className="btn-ghost">
              Ver servicios →
            </a>
          </div>

          <div
            className={`fade-up ${heroInView ? "visible" : ""} delay-4`}
            style={{
              marginTop: 72,
              display: "flex",
              gap: 48,
              flexWrap: "wrap",
            }}
          >
            {REASONS.map((r, i) => (
              <div key={i} className="stat-card">
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "#00e5ff",
                    lineHeight: 1,
                  }}
                >
                  <AnimatedNumber
                    target={r.num.replace(/\D/g, "")}
                    suffix={r.num.replace(/\d/g, "")}
                  />
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#aaa",
                    marginTop: 6,
                    lineHeight: 1.4,
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section
        id="servicios"
        style={{
          padding: "120px 40px",
          backgroundImage:
            "url('https://www.topconpositioning.com/content/dam/topconpositioning/es/products/heros/servicio-tecnico-web-hero.jpg')",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div ref={servRef} style={{ marginBottom: 64 }}>
            <div className={`fade-up ${servInView ? "visible" : ""}`}>
              <div className="tag">// Qué hacemos</div>
            </div>
            <h2
              className={`fade-up ${servInView ? "visible" : ""} delay-1`}
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Nuestros <span className="glow-text">Servicios</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className={`service-card fade-up ${servInView ? "visible" : ""} delay-${i + 1}`}
              >
                <div
                  style={{ fontSize: "2rem", marginBottom: 20 }}
                  className="float-anim"
                  style={{
                    animationDelay: `${i * 0.4}s`,
                    fontSize: "2rem",
                    marginBottom: 20,
                  }}
                >
                  {s.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    marginBottom: 12,
                    color: "#f0f0f0",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: "#eee", fontSize: "1rem", lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section
        id="nosotros"
        style={{
          padding: "120px 40px",
          background:
            "linear-gradient(90deg,rgba(3, 19, 38, 1) 12%, rgba(21, 50, 79, 1) 33%, rgba(2, 17, 31, 1) 76%, rgba(18, 49, 79, 1) 100%)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            ref={whyRef}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div>
              <div className={`fade-up ${whyInView ? "visible" : ""}`}>
                <div className="tag">// Por qué elegirnos</div>
              </div>
              <h2
                className={`fade-up ${whyInView ? "visible" : ""} delay-1`}
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  marginBottom: 28,
                }}
              >
                Trabajo serio.
                <br />
                <span className="glow-text">Resultados reales.</span>
              </h2>
              <p
                className={`fade-up ${whyInView ? "visible" : ""} delay-2`}
                style={{
                  color: "#aaa",
                  lineHeight: 1.8,
                  fontSize: "1.1rem",
                  marginBottom: 36,
                }}
              >
                En JZ-TEC no hay sorpresas. Antes de tocar tu equipo te
                explicamos qué tiene, qué necesita y cuánto va a costar. Sin
                letras chicas.
              </p>
              <a
                href="https://wa.me/549XXXXXXXXXX"
                target="_blank"
                className={`btn-primary fade-up ${whyInView ? "visible" : ""} delay-3`}
                style={{ display: "inline-flex" }}
              >
                Hacer una consulta gratis →
              </a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                {
                  icon: "🔍",
                  title: "Diagnóstico sin costo",
                  body: "Evaluamos tu equipo antes de comprometerte a nada. Si no tiene solución, te lo decimos.",
                },
                {
                  icon: "📋",
                  title: "Garantía por escrito",
                  body: "Todas las reparaciones incluyen garantía formal. Tu tranquilidad, documentada.",
                },
                {
                  icon: "⚙️",
                  title: "Repuestos de calidad",
                  body: "Trabajamos con componentes originales y compatibles de primera línea.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`fade-up ${whyInView ? "visible" : ""} delay-${i + 2}`}
                  style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      minWidth: 48,
                      background: "rgba(0,229,255,0.07)",
                      border: "1px solid rgba(0,229,255,0.15)",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.3rem",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        marginBottom: 6,
                        fontSize: "1.2rem",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        color: "#aaa",
                        fontSize: "1rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {item.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="cta-section"
        style={{
          padding: "120px 40px",
          textAlign: "center",
          backgroundImage:
            "url('https://www.gurugo.com.ar/_next/image?url=https%3A%2F%2Fwww.paginasamarillas.com.ar%2Fimagenes%2Fpipe%2FAVI15841%2F15841625%2Freparacion-de-placa-galeria02.jpg&w=3840&q=65')",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "600px",
              height: "300px",
            }}
          />
        </div>
        <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
          <div className="tag" style={{ margin: "0 auto 24px" }}>
            // ¿Necesitás ayuda?
          </div>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Tu equipo tiene
            <br />
            <span className="glow-text">solución.</span>
          </h2>
          <p
            style={{
              color: "#aaa",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: 48,
            }}
          >
            Contactanos ahora por WhatsApp y recibí respuesta en minutos.
          </p>
          <a
            href="https://wa.me/549XXXXXXXXXX"
            target="_blank"
            className="btn-primary"
            style={{ fontSize: "1.05rem", padding: "18px 48px" }}
          >
            <span>💬</span> Escribir por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#05060a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "36px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              background: "#00e5ff",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "0.75rem",
              color: "#08090d",
            }}
          >
            JZ
          </div>
          <span style={{ fontWeight: 700, color: "#f0f0f0" }}>TEC</span>
        </div>
        <p
          style={{
            color: "#444",
            fontSize: "0.8rem",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          © {new Date().getFullYear()} JZ-TEC · Servicio Técnico en Santa Fe
          Capital
        </p>
        <a
          href="https://wa.me/549XXXXXXXXXX"
          target="_blank"
          style={{
            color: "#00e5ff",
            fontSize: "0.85rem",
            textDecoration: "none",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          WhatsApp →
        </a>
      </footer>
    </main>
  );
}
