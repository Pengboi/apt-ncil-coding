"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  solutions: [
    { href: "#services", label: "Intercom Installation" },
    { href: "#services", label: "Access Control" },
    { href: "#services", label: "Video Entry Systems" },
    { href: "#services", label: "Gate Integration" },
  ],
  company: [
    { href: "#about", label: "About Us" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ],
  legal: [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Cookie Policy" },
  ],
};

const socialLinks = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Facebook" },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleFooterClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href);
    }
  };

  return (
    <footer className="bg-[#31261D] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="font-heading font-extrabold text-xl text-white">
                VISION ELECTRIC
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              NICEIC approved electrical contractors serving Greater London 
              with professional intercom and access control installations.
            </p>
            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/50 hover:text-[#2563eb] transition-colors text-sm uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Solutions</h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    onClick={(e) => handleFooterClick(e, link.href)}
                    className="text-white/70 hover:text-[#2563eb] transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    onClick={(e) => handleFooterClick(e, link.href)}
                    className="text-white/70 hover:text-[#2563eb] transition-colors text-sm flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-white">Contact</h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                <span>Greater London<br />30 mile radius</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#2563eb] flex-shrink-0" />
                <a href="tel:+442012345678" className="hover:text-[#2563eb] transition-colors">
                  020 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#2563eb] flex-shrink-0" />
                <a href="mailto:hello@visionelectric.co.uk" className="hover:text-[#2563eb] transition-colors">
                  hello@visionelectric.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>&copy; {new Date().getFullYear()} Vision Electric Ltd. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link, index) => (
                <Link 
                  key={index}
                  href={link.href}
                  className="hover:text-[#2563eb] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="bg-[#2563eb] py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-heading font-bold text-lg">
            Securing London&apos;s Entrances
          </p>
        </div>
      </div>
    </footer>
  );
}
