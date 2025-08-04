import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, Instagram, Facebook, Youtube, Twitter, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sky-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Kolom 1: Informasi Pemerintah Desa */}
          <div className="flex-row md:flex items-start space-x-10 space-y-6 md:space-y-0">
            <Image
              src="/kabBusel.svg"
              alt="Logo Desa Gaya Baru"
              width={100}
              height={80}
              className="flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="font-bold font-heading2 text-xl text-white">Pemerintah Desa Gaya Baru</h3>
              <p className="text-md font-body2 mt-2 leading-relaxed">
                Desa Gaya Baru, Kecamatan Lapandewa<br />
                Kabupaten Buton Selatan, Sulawesi Tenggara, 93753
              </p>
            </div>
          </div>

          {/* Kolom 2: Hubungi Kami */}
          <div className="mx-0 md:mx-auto">
            <h3 className="font-bold font-heading2 text-xl text-white">Hubungi Kami</h3>
            <div className="mt-4 space-y-3">
              <a href="tel:+6281323642950" className="flex items-center space-x-3 group">
                <Phone size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                <span className="group-hover:text-white transition-colors font-body2">0813-2364-2950</span>
              </a>
              <a href="mailto:info@desagayabaru.id" className="flex items-center space-x-3 group">
                <Mail size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                <span className="group-hover:text-white transition-colors font-body2">info@desagayabaru.id</span>
              </a>
            </div>
            <div className="flex space-x-4 mt-5">
              <Link href="#" aria-label="Instagram">
                <Instagram className="hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="hover:text-white transition-colors" />
              </Link>
              <Link href="#" aria-label="Youtube">
                <Youtube className="hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Kolom 3: Nomor Telepon Penting */}
          <div>
            <h3 className="font-bold font-heading2 text-xl text-white">Kontak Penting</h3>
            <div className="mt-4 space-y-1 font-body2">
              <Link href="tel:+6281323642950" className="block hover:text-white transition-colors">
                Sukman/Kepala Desa Gaya Baru
              </Link>
              <Link href="tel:+6282394154476" className="block hover:text-white transition-colors">
                Fara/Sekretaris Desa Gaya Baru
              </Link>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="font-body2 mt-12 border-t border-sky-800 pt-10 text-center text-sm">
          <p>© {new Date().getFullYear()} Pemerintah Desa Gaya Baru. Powered by KKN-PPM UGM Cahea Busel 2025.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;