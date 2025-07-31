"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Profil Desa', href: '/profil-desa' },
  { label: 'Infografis', href: '/infografis' },
  { label: 'Berita', href: '/berita' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-sky-800 text-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo dan Nama Desa */}
          <div className="flex-shrink-0 flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-4">
                <Image
                          className=""
                          src="/kabBusel.svg"
                          alt="Logo Kabupaten Buton Selatan"
                          width={70}
                          height={38}
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white">
                    Desa Gaya Baru
                  </span>
                  <span className="font-medium text-sm text-white">
                    Kabupaten Buton Selatan
                  </span>
                </div>
            </Link>
          </div>

          {/* Navigation Menu for Desktop */}
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className="font-bold text-gray-100 hover:text-sky-400 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hamburger for Mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-gray-800 hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Buka menu utama</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown for Mobile */}
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link 
                  href={item.href} 
                  className="block px-3 py-2 rounded-md text-white font-bold text-gray-700 hover:text-sky-800 hover:bg-sky-300 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;