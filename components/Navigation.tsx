"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#services", label: "Solutions" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#ECEBE3]/95 backdrop-blur-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={(e) => handleNavClick(e, "#home")}
        >
          <span
            className={`font-heading font-extrabold text-xl tracking-tight ${
              isScrolled ? "text-[#31261D]" : "text-white"
            }`}
          >
            VISION ELECTRIC
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-[#2563eb] ${
                isScrolled ? "text-[#31261D]/70" : "text-white/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+442012345678"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isScrolled ? "text-[#31261D]" : "text-white"
            }`}
          >
            <Phone className="h-4 w-4" />
            <span>020 1234 5678</span>
          </a>
          <Button
            className="bg-[#2563eb] text-white hover:bg-[#2563eb]/90 rounded-full px-6 font-medium"
            onClick={() => {
              const event = new CustomEvent("openContactModal");
              window.dispatchEvent(event);
            }}
          >
            Contact us
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className={`lg:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${
            isScrolled ? "text-[#31261D]" : "text-white"
          }`}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96 bg-[#ECEBE3] p-0">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#DBC8B6]">
                <span className="font-heading font-extrabold text-xl text-[#31261D]">
                  VISION ELECTRIC
                </span>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col p-6 gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href);
                      setIsOpen(false);
                    }}
                    className="text-lg font-medium text-[#31261D] py-3 border-b border-[#DBC8B6] hover:text-[#2563eb] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Contact Info */}
              <div className="mt-auto p-6 bg-[#31261D]">
                <a
                  href="tel:+442012345678"
                  className="flex items-center gap-3 text-white/90 mb-4"
                >
                  <Phone className="h-5 w-5 text-[#2563eb]" />
                  <span className="font-medium">020 1234 5678</span>
                </a>
                <Button
                  className="w-full bg-[#2563eb] text-white hover:bg-[#2563eb]/90 rounded-full font-medium"
                  onClick={() => {
                    setIsOpen(false);
                    const event = new CustomEvent("openContactModal");
                    window.dispatchEvent(event);
                  }}
                >
                  Contact us
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
