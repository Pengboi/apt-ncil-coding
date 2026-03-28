"use client";

import Link from "next/link";
import { Scissors, MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About Us" },
  { href: "#booking", label: "Book Now" },
  { href: "#contact", label: "Contact" },
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
    <footer className="border-t bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Scissors className="h-6 w-6 text-primary" />
              <span className="text-primary">Dazziling Dog Groomers</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium dog grooming services in Finsbury Park, London. We treat your pets like family.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={(e) => handleFooterClick(e, link.href)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">More</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={(e) => handleFooterClick(e, link.href)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Finsbury Park, London
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                020 1234 5678
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                info@dazzilingdoggroomers.co.uk
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dazziling Dog Groomers. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
