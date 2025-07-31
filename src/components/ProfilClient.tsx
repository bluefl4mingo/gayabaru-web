'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { getStrapiURL } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Tipe data untuk gambar dari Strapi
interface StrapiMedia {
      url: string;
      width: number;
      height: number;
      alternativeText: string | null;
}

// 1. PERBAIKI TIPE DATA: Hapus lapisan 'attributes'
interface ProfilData {
  visi: BlocksContent;
  misi: BlocksContent;
  baganSOTK: StrapiMedia;
  baganBPD: StrapiMedia;
  batasUtara: string;
  batasSelatan: string;
  batasTimur: string;
  batasBarat: string;
  luasDesa: number;
}

interface ClientProps {
  data: ProfilData;
}

// Komponen Peta (yang sudah ada)
const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

// Wrapper Section
const Section = ({ title, children, className }: { title?: string, children: React.ReactNode, className?: string }) => (
    <div className={`py-16 md:py-20 ${className || ''}`}>
        <div className="container mx-auto px-4">
            {title && (
                <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-900 mb-12">
                    {title}
                </h2>
            )}
            {children}
        </div>
    </div>
);


export default function ProfilClient({ data }: ClientProps) {
  // 2. AKSES LANGSUNG: Tidak perlu destructuring 'attributes' lagi.
  // 'data' sekarang adalah objek yang berisi 'visi', 'misi', dll.

  return (
    <>
      {/* 1. Section Visi dan Misi */}
      <Section className="bg-sky-100">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader><CardTitle>Visi</CardTitle></CardHeader>
            <CardContent className="prose max-w-none">
              {data.visi && <BlocksRenderer content={data.visi} />}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Misi</CardTitle></CardHeader>
            <CardContent className="prose max-w-none">
              {data.misi && <BlocksRenderer content={data.misi} />}
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* 2. Section Bagan Desa */}
      <Section title="Bagan Desa">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-slate-700">Struktur Organisasi Pemerintahan Desa</h3>
            {data.baganSOTK && (
              <div className="relative w-full aspect-video border rounded-lg overflow-hidden shadow-md">
                <Image 
                  src={getStrapiURL(data.baganSOTK.url)}
                  alt={data.baganSOTK.alternativeText || "Bagan SOTK Desa"}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4 text-slate-700">Struktur Organisasi Badan Permusyawaratan Desa</h3>
            {data.baganBPD && (
              <div className="relative w-full aspect-video border rounded-lg overflow-hidden shadow-md">
                <Image 
                  src={getStrapiURL(data.baganBPD.url)}
                  alt={data.baganBPD.alternativeText || "Bagan BPD Desa"}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* 3. Section Lokasi Desa */}
      <Section title="Lokasi Desa Gaya Baru" className="bg-slate-50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Informasi Batas Wilayah */}
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-sky-500 bg-white">
              <p className="font-semibold text-slate-800">Batas Utara</p>
              <p className="text-slate-600">{data.batasUtara}</p>
            </div>
            <div className="p-4 border-l-4 border-sky-500 bg-white">
              <p className="font-semibold text-slate-800">Batas Selatan</p>
              <p className="text-slate-600">{data.batasSelatan}</p>
            </div>
            <div className="p-4 border-l-4 border-sky-500 bg-white">
              <p className="font-semibold text-slate-800">Batas Timur</p>
              <p className="text-slate-600">{data.batasTimur}</p>
            </div>
            <div className="p-4 border-l-4 border-sky-500 bg-white">
              <p className="font-semibold text-slate-800">Batas Barat</p>
              <p className="text-slate-600">{data.batasBarat}</p>
            </div>
             <div className="p-4 border-l-4 border-orange-500 bg-white mt-6">
              <p className="font-semibold text-slate-800">Luas Wilayah</p>
              <p className="text-slate-600">{data.luasDesa} km²</p>
            </div>
          </div>
          {/* Kolom Kanan: Peta */}
          <div className="relative z-10 h-[450px] w-full rounded-lg shadow-lg overflow-hidden">
            <MapWithNoSSR />
          </div>
        </div>
      </Section>
    </>
  );
}
