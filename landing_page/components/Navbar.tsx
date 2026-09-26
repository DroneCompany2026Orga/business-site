"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "./Brand";
import { site } from "@/config/site";
import { useContact } from "./ContactProvider";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { openContact } = useContact();
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const query = window.matchMedia("(min-width: 1000px)");
    const close = () => {
      if (query.matches) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    query.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", handleKey);
      query.removeEventListener("change", close);
    };
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner container">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.navigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="button button-small nav-cta"
          onClick={() => openContact("demo")}
        >
          Request a demo <ArrowUpRight size={15} />
        </button>
        <button
          ref={toggleRef}
          className="mobile-toggle icon-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {site.navigation.map((item, i) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              <span className="mono">0{i + 1}</span>
              {item.label}
              <ArrowUpRight size={19} />
            </a>
          ))}
          <button
            className="button button-primary"
            onClick={() => {
              setOpen(false);
              openContact("demo");
            }}
          >
            Request a demo <ArrowUpRight size={17} />
          </button>
        </nav>
      )}
    </header>
  );
}
