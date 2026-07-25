import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Truck, ShieldCheck, Clock } from "lucide-react";
import { TEL_URL } from "@/lib/constants";

export function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="fade-in">
          <span className="hero-badge"><span className="dot" /> Now serving in Bommasandra Industrial Area</span>
          <h1 style={{ marginTop: 16 }}>
            Reliable goods transport across <span>Industrial Area Bommasandra</span>
          </h1>
          <p>
            Tata ACE, Canter and heavy vehicles for on-demand and contract logistics.
            Fast pickup, safe handling, and transparent pricing for businesses of every size.
          </p>

        </div>
        <div className="hero-visual">
          <span className="pill">10+ Years in transport</span>
          <Truck size={200} />
        </div>
      </div>
    </section>
  );
}

const stats = [
  { end: 3500, suffix: "+", label: "Deliveries done" },
  { end: 50, suffix: "+", label: "Business clients" },
  { end: 98, suffix: "%", label: "On-time delivery" },
  { end: 24, suffix: "/7", label: "Customer support" },
];

function useCounter(end, active, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      setN(Math.floor(end * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) raf = requestAnimationFrame(step);
      else setN(end);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration]);
  return n;
}

function Stat({ end, suffix, label, active }) {
  const n = useCounter(end, active);
  return (
    <div>
      <div className="stat-num">{n}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export function Stats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setActive(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="stats" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s) => <Stat key={s.label} {...s} active={active} />)}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const items = [
    { icon: <ShieldCheck size={22} />, title: "Safe & insured", desc: "Careful handling and coverage on every shipment for peace of mind." },
    { icon: <Clock size={22} />, title: "On-time, every time", desc: "Live tracking and dedicated dispatch keep your goods on schedule." },
    { icon: <Truck size={22} />, title: "Right vehicle, every load", desc: "Tata ACE to Canter — the correct size for your cargo, no upsell." },
  ];
  return (
    <section className="section section-cloud">
      <div className="container">
        <span className="eyebrow">Why choose us</span>
        <h2 className="section-title">Built for businesses that can't afford delays</h2>
        <p className="section-sub">Ten years of moving goods across Bengaluru Industrial Region means we know every route, every checkpoint, and every shortcut.</p>
        <div className="grid grid-3" style={{ marginTop: 32 }}>
          {items.map((i) => (
            <div key={i.title} className="card">
              <div className="card-icon">{i.icon}</div>
              <h3>{i.title}</h3>
              <p>{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
