"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/rpg", label: "RPG System" },
  { href: "/projects", label: "Quests" },
  { href: "/about", label: "Lore" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-[var(--arcane-cyan)]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--arcane-cyan)] to-[var(--mystic-magenta)] rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0.5 bg-[var(--depth)] rounded-lg flex items-center justify-center">
                <span className="font-display font-bold text-lg text-[var(--arcane-cyan)]">A</span>
              </div>
              <div className="absolute -inset-1 bg-[var(--arcane-cyan)] opacity-0 group-hover:opacity-30 blur-lg transition-opacity" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              AETHERIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 font-body font-medium text-[var(--text-secondary)] hover:text-white transition-colors group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--arcane-cyan)]/0 via-[var(--arcane-cyan)]/10 to-[var(--arcane-cyan)]/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--arcane-cyan)] group-hover:w-1/2 transition-all" />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="btn-primary text-sm py-2.5 px-5">
              Start Adventure
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass-card border-t border-[var(--arcane-cyan)]/10 overflow-hidden transition-all ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 font-body font-medium text-[var(--text-secondary)] hover:text-white hover:bg-[var(--arcane-cyan)]/5 rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <button className="btn-primary w-full text-sm py-3">
              Start Adventure
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
