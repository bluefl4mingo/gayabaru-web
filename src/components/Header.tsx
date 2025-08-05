"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { motion, AnimatePresence } from 'motion/react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Profil Desa', href: '/profil-desa' },
  { label: 'Infografis', href: '/infografis' },
  { label: 'Berita', href: '/berita' },
  { label: 'Galeri', href: '/galeri' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-cyan-400 via-sky-600 via-15% to-sky-800 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-5 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Logo dan Nama Desa */}
          <motion.div 
            className="flex-shrink-0 flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-4">
                <Image
                          className="hidden md:inline-block"
                          src="/kabBusel.svg"
                          alt="Logo Kabupaten Buton Selatan"
                          width={70}
                          height={38}
                />
                <Image
                          className="inline-block md:hidden"
                          src="/kabBusel.svg"
                          alt="Logo Kabupaten Buton Selatan"
                          width={45}
                          height={40}
                />
                <div className="flex flex-col">
                  <span className="font-bold font-heading2 md:text-xl">
                    Desa Gaya Baru
                  </span>
                  <span className="font-medium font-body2 text-xs md:text-sm tracking-wide">
                    Kabupaten Buton Selatan
                  </span>
                </div>
            </Link>
          </motion.div>

          {/* Navigation Menu for Desktop */}
          <motion.nav 
            className="hidden lg:flex"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ul className="flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.li 
                  key={item.label}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className="font-bold font-heading2 text-lg text-gray-100 hover:text-cyan-300 hover:border-b-1 hover:border-cyan-300 transition-all duration-300 pb-1 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-300 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Hamburger for Mobile */}
          <motion.div 
            className="lg:hidden flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex h-[3em] w-[3em] items-center justify-center p-2 rounded-md text-gray-100 hover:text-gray-800 hover:bg-sky-200/90 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition-all duration-300"
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="sr-only">Buka menu utama</span>
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <motion.svg 
                    className="h-6 w-6" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg 
                    className="h-6 w-6" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </motion.svg>
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Menu Dropdown for Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-cyan-400 via-sky-600 via-15% to-sky-800 backdrop-blur-md shadow-2xl border-sky-200/50"
            id="mobile-menu"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="px-3 py-3 bg-gradient-to-r from-cyan-400 via-sky-600 via-15% to-sky-800 backdrop-blur-sm">
              <motion.ul 
                className="space-y-2"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                  },
                  closed: {
                    transition: { staggerChildren: 0.05, staggerDirection: -1 }
                  }
                }}
              >
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.label}
                    variants={{
                      open: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 24
                        }
                      },
                      closed: {
                        opacity: 0,
                        x: -20,
                        transition: {
                          duration: 0.2
                        }
                      }
                    }}
                  >
                    <Link 
                      href={item.href} 
                      className="group flex items-center justify-center py-3 rounded-xl text-gray-100 font-bold font-heading2 text-md hover:text-sky-700 hover:bg-sky-100/80 transition-all duration-300 relative overflow-hidden"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-sky-200/50 to-cyan-300/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        layoutId="navHover"
                      />
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-500 to-cyan-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={{ scaleY: 0 }}
                        whileHover={{ scaleY: 1 }}
                      />
                      <motion.span
                        className="relative z-10 flex items-center"
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-sky-500 rounded-full mr-3 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        />
                        {item.label}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;