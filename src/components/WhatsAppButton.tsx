'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function WhatsAppButton() {
  const phoneNumber = '62713847832';
  
  const message = 'Halo, saya ingin bertanya tentang informasi Desa Gaya Baru.';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 opacity-90 bg-green-500 hover:bg-green-600 transition-all duration-300 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      aria-label="Hubungi kami via WhatsApp"
    >
      <Image
            src="/whatsApp.webp"
            alt="Kontak Kami Melalui WhatsApp"
            width={30}
            height={30}
            className="flex-shrink-1"
        />
    </Link>
  );
}
