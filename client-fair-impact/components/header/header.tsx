"use client";

import { useState } from "react";
import MobileNavigation from "./mobile-navigation";
import DesktopNavigation from "./desktop-navigation";
import { NavigationItem } from "@/types/navigation-item";

/**
 * @TODO Add proper routes.
 */
const navigation: NavigationItem[] = [
  { label: "About", href: "about" },
  { label: "Glossary", href: "glossary" },
  { label: "Documentation", href: "#" },
];

/**
 * Header component for non-cms environment.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <DesktopNavigation
        setMobileMenuOpen={setMobileMenuOpen}
        navigationItems={navigation}
      />
      <MobileNavigation
        menuOpen={mobileMenuOpen}
        setMenuOpen={setMobileMenuOpen}
        navigationItems={navigation}
      />
    </header>
  );
}
