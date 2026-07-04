"use client";

import { useEffect, useState } from "react";
import { Manrope, JetBrains_Mono } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
});

const LOGS = [
  { time: "14:20:36", color: "oklch(0.85 0.005 40)", text: "terraform apply — 4 resources added" },
  { time: "14:21:04", color: "oklch(0.85 0.005 40)", text: "Provisioning server on Hetzner…" },
  { time: "14:22:41", color: "oklch(0.72 0.12 155)", text: "Node reachable at 65.108.4.21" },
  { time: "14:24:19", color: "oklch(0.85 0.005 40)", text: "ansible-playbook validator.yml — 31 tasks" },
  { time: "14:28:02", color: "oklch(0.72 0.12 155)", text: "Validator syncing — head 21,004,113" },
];

const STEPS = [
  {
    n: "01",
    title: "Choose chain and provider",
    body: "Ethereum, Solana or Polkadot; Hetzner or Contabo servers in the region you prefer. Your cloud credentials stay yours.",
  },
  {
    n: "02",
    title: "Deploy with one click",
    body: "Terraform creates the server, Ansible installs and configures the validator client. Follow every task live from the log.",
  },
  {
    n: "03",
    title: "Monitor and forget",
    body: "Sync status, uptime and alerts from the dashboard. Auto-restart on failure, notifications via WebSocket.",
  },
];

const FEATURES = [
  {
    tag: "Provisioning",
    title: "Terraform, idempotent",
    body: "Tracked state, automatic rollback if the deploy fails.",
    borderRight: true,
    borderBottom: true,
  },
  {
    tag: "Configuration",
    title: "Ansible, reproducible",
    body: "Versioned playbooks: firewall, client, keys, systemd.",
    borderRight: false,
    borderBottom: true,
  },
  {
    tag: "Monitoring",
    title: "Live via WebSocket",
    body: "Sync, uptime and logs in real time, no refresh needed.",
    borderRight: true,
    borderBottom: false,
  },
  {
    tag: "Recovery",
    title: "Auto-restart",
    body: "If the node goes down, it restarts itself, with an instant alert.",
    borderRight: false,
    borderBottom: false,
  },
];

// palette
const ink = "oklch(0.21 0.015 20)";
const muted = "oklch(0.45 0.012 20)";
const wine = "oklch(0.38 0.13 15)";
const wineDeep = "oklch(0.28 0.09 15)";
const dashed = "oklch(0.72 0.04 15)";
const dashSoft = "oklch(0.60 0.06 15)";
const mono = "var(--font-jetbrains), monospace";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.maronnodes.xyz";

export default function HomePage() {
  const [count, setCount] = useState(LOGS.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => (c >= LOGS.length + 2 ? 1 : c + 1));
    }, 1300);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).animate(
              [
                { opacity: 0, transform: "translateY(12px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 500, easing: "cubic-bezier(0.2,0,0,1)", fill: "backwards" }
            );
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.9) io.observe(el);
    });

    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const visibleLogs = LOGS.slice(0, Math.min(count, LOGS.length));

  return (
    <div
      className={`${manrope.variable} ${jetbrains.variable}`}
      style={{
        fontFamily: "var(--font-manrope), sans-serif",
        color: ink,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "oklch(0.985 0.003 40)",
      }}
    >
      <style>{`
        @keyframes mn-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }
        @keyframes mn-caret { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        @keyframes mn-march { to { stroke-dashoffset: -24; } }
        @keyframes mn-drift { from { background-position: 0 0; } to { background-position: 0 -28px; } }
        .mn-navlink { color: ${muted}; text-decoration: none; transition: color .15s; }
        .mn-navlink:hover { color: ${ink}; }
        .mn-btn-primary { background: ${wine}; border: 1px solid ${wine}; color: #fff; cursor: pointer; transition: background .15s, border-color .15s; font-family: var(--font-manrope), sans-serif; }
        .mn-btn-primary:hover { background: ${wineDeep}; border-color: ${wineDeep}; }
        .mn-btn-ghost { background: #fff; color: ${ink}; border: 1px dashed ${dashSoft}; cursor: pointer; transition: background .15s; font-family: var(--font-manrope), sans-serif; }
        .mn-btn-ghost:hover { background: oklch(0.97 0.012 15); }
      `}</style>

      {/* Nav */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: 64,
          borderBottom: `1px dashed ${dashed}`,
          background: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.01em" }}>MARON</span>
          <span
            style={{
              fontFamily: mono,
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.14em",
              color: wine,
            }}
          >
            NODES
          </span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <a href="#how" className="mn-navlink" style={{ fontSize: 13, fontWeight: 600 }}>
            How it works
          </a>
          <a href="#chains" className="mn-navlink" style={{ fontSize: 13, fontWeight: 600 }}>
            Chains
          </a>
          <a href="#features" className="mn-navlink" style={{ fontSize: 13, fontWeight: 600 }}>
            Infrastructure
          </a>
          <a
            href={`${APP_URL}/login`}
            className="mn-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 34,
              padding: "0 16px",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: `3px 3px 0 oklch(0.38 0.13 15 / 0.20)`,
            }}
          >
            Log in
          </a>
        </nav>
      </header>

      {/* Hero */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: "radial-gradient(oklch(0.60 0.06 15 / 0.22) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            animation: "mn-drift 6s linear infinite",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 90% at 60% 40%, black 30%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 75% 90% at 60% 40%, black 30%, transparent 100%)",
          }}
        />
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1160 560"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="0" y1="110" x2="1160" y2="110" stroke="oklch(0.60 0.06 15 / 0.30)" strokeWidth="1" strokeDasharray="8 8" style={{ animation: "mn-march 2.8s linear infinite" }} />
          <line x1="0" y1="470" x2="1160" y2="470" stroke="oklch(0.60 0.06 15 / 0.25)" strokeWidth="1" strokeDasharray="8 8" style={{ animation: "mn-march 4.5s linear infinite reverse" }} />
          <line x1="620" y1="0" x2="620" y2="560" stroke="oklch(0.60 0.06 15 / 0.18)" strokeWidth="1" strokeDasharray="6 10" style={{ animation: "mn-march 5.5s linear infinite" }} />
          <circle cx="620" cy="110" r="3" fill="oklch(0.38 0.13 15 / 0.5)" style={{ animation: "mn-pulse 2.4s ease-in-out infinite" }} />
          <circle cx="620" cy="470" r="3" fill="oklch(0.38 0.13 15 / 0.35)" style={{ animation: "mn-pulse 2.4s ease-in-out infinite 1.2s" }} />
        </svg>

        <section
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr 460px",
            gap: 56,
            alignItems: "center",
            padding: "88px 48px 96px",
            maxWidth: 1160,
            margin: "0 auto",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <span
              style={{
                fontFamily: mono,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: wine,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ width: 24, borderTop: "1px dashed currentColor" }} />
              Validator infrastructure, automated
            </span>
            <h1
              style={{
                margin: 0,
                fontSize: 52,
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                textWrap: "balance",
              }}
            >
              Your validator node, live in minutes.
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 16,
                lineHeight: 1.6,
                color: muted,
                maxWidth: 480,
                textWrap: "pretty",
              }}
            >
              Maron Nodes provisions the server, configures the client, and monitors your node —
              Terraform and Ansible under the hood, a single click for you. On Hetzner or Contabo,
              with your own account.
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <a
                href={`${APP_URL}/register`}
                className="mn-btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 40,
                  padding: "0 22px",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  boxShadow: "4px 4px 0 oklch(0.38 0.13 15 / 0.20)",
                }}
              >
                Deploy node
              </a>
              <a
                href="#how"
                className="mn-btn-ghost"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 40,
                  padding: "0 22px",
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                See how it works
              </a>
            </div>
            <div
              style={{
                display: "flex",
                gap: 24,
                fontFamily: mono,
                fontSize: 11,
                color: "oklch(0.55 0.01 20)",
                marginTop: 4,
              }}
            >
              <span>terraform + ansible</span>
              <span>·</span>
              <span>your keys only</span>
              <span>·</span>
              <span>monitoring 24/7</span>
            </div>
          </div>

          {/* Terminal card */}
          <div
            style={{
              background: "oklch(0.205 0.012 20)",
              border: `1px dashed oklch(0.55 0.08 15)`,
              boxShadow: "6px 6px 0 oklch(0.38 0.13 15 / 0.12)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderBottom: "1px dashed oklch(1 0 0 / 0.18)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "oklch(0.52 0.12 155)",
                  animation: "mn-pulse 1.2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: mono,
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "oklch(0.72 0.01 40)",
                }}
              >
                validator-eth-01 — deploy
              </span>
            </div>
            <div
              style={{
                padding: "14px 16px",
                fontFamily: mono,
                fontSize: 12,
                lineHeight: 1.9,
                height: 138,
                overflow: "hidden",
              }}
            >
              {visibleLogs.map((l, i) => (
                <div key={i} style={{ display: "flex", gap: 10 }}>
                  <span style={{ color: "oklch(0.55 0.01 40)" }}>{l.time}</span>
                  <span style={{ color: l.color }}>{l.text}</span>
                </div>
              ))}
              <span
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 13,
                  background: "oklch(0.85 0.005 40)",
                  animation: "mn-caret 1s step-end infinite",
                  verticalAlign: "text-bottom",
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* How it works */}
      <section
        id="how"
        style={{ borderTop: `1px dashed ${dashed}`, background: "white", padding: "72px 48px" }}
      >
        <div
          style={{
            maxWidth: 1064,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontFamily: mono,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: wine,
              }}
            >
              How it works
            </span>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" }}>
              Three steps, zero DevOps.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {STEPS.map((s) => (
              <div
                key={s.n}
                data-reveal
                style={{
                  background: "white",
                  border: `1px dashed ${dashSoft}`,
                  boxShadow: "4px 4px 0 oklch(0.38 0.13 15 / 0.10)",
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <span style={{ fontFamily: mono, fontSize: 12, fontWeight: 700, color: wine }}>
                  {s.n}
                </span>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>
                  {s.title}
                </h3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: muted }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chains */}
      <section id="chains" style={{ borderTop: `1px dashed ${dashed}`, padding: 48 }}>
        <div
          style={{
            maxWidth: 1064,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "oklch(0.55 0.01 20)",
            }}
          >
            Supported chains
          </span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Ethereum", "Solana", "Polkadot"].map((c) => (
              <span
                key={c}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 26,
                  padding: "0 12px",
                  fontFamily: mono,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  border: `1px dashed ${dashSoft}`,
                  color: "oklch(0.30 0.05 15)",
                  background: "white",
                }}
              >
                {c}
              </span>
            ))}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 26,
                padding: "0 12px",
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "1px dashed oklch(0.80 0.02 15)",
                color: "oklch(0.62 0.01 20)",
                background: "transparent",
              }}
            >
              + coming soon
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        style={{ borderTop: `1px dashed ${dashed}`, background: "white", padding: "72px 48px" }}
      >
        <div
          style={{
            maxWidth: 1064,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "340px 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                fontFamily: mono,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: wine,
              }}
            >
              Infrastructure
            </span>
            <h2
              style={{
                margin: 0,
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                textWrap: "balance",
              }}
            >
              Your server, your keys, our automation.
            </h2>
            <p style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.6, color: muted }}>
              No custody: Maron Nodes orchestrates the infrastructure on your own cloud account.
              You can export the playbooks and leave whenever you want.
            </p>
          </div>
          <div
            data-reveal
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0,
              border: `1px dashed ${dashSoft}`,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.tag}
                style={{
                  padding: 20,
                  borderRight: f.borderRight ? "1px dashed oklch(0.80 0.02 15)" : undefined,
                  borderBottom: f.borderBottom ? "1px dashed oklch(0.80 0.02 15)" : undefined,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: wine,
                  }}
                >
                  {f.tag}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700 }}>{f.title}</span>
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.6, color: muted }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: `1px dashed ${dashed}`, padding: "72px 48px" }}>
        <div
          data-reveal
          style={{
            maxWidth: 720,
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Your next validator is one click away.
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: muted }}>
            Free until your node is live in production. No card required.
          </p>
          <a
            href={`${APP_URL}/register`}
            className="mn-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 44,
              padding: "0 28px",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "4px 4px 0 oklch(0.38 0.13 15 / 0.20)",
            }}
          >
            Deploy node
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px dashed ${dashed}`,
          background: "white",
          padding: "20px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
          <span style={{ fontWeight: 800, fontSize: 13 }}>MARON</span>
          <span
            style={{
              fontFamily: mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.14em",
              color: wine,
            }}
          >
            NODES
          </span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="#features" className="mn-navlink" style={{ fontFamily: mono, fontSize: 11 }}>
            Docs
          </a>
          <a href="#" className="mn-navlink" style={{ fontFamily: mono, fontSize: 11 }}>
            Pricing
          </a>
          <a href="#" className="mn-navlink" style={{ fontFamily: mono, fontSize: 11 }}>
            Contact
          </a>
          <a href="#" className="mn-navlink" style={{ fontFamily: mono, fontSize: 11 }}>
            Discord
          </a>
          <a href="#" className="mn-navlink" style={{ fontFamily: mono, fontSize: 11 }}>
            X
          </a>
        </nav>
        <span style={{ fontFamily: mono, fontSize: 11, color: "oklch(0.62 0.01 20)" }}>
          © 2026 Maron Nodes
        </span>
      </footer>
    </div>
  );
}
