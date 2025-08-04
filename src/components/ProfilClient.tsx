'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { getStrapiURL } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface StrapiMedia {
      url: string;
      width: number;
      height: number;
      alternativeText: string | null;
}

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
  mapAdministrasi: StrapiMedia;
  mapFasilitas: StrapiMedia;
  mapGeomorfologi: StrapiMedia;
  mapPenduduk: StrapiMedia;
  mapAirTanah: StrapiMedia;
  mapWisata: StrapiMedia;
}

interface ClientProps {
  data: ProfilData;
}

const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
  ssr: false,
});

const Section = ({ title, children, className }: { title?: string, children: React.ReactNode, className?: string }) => (
    <motion.div 
      className={`py-16 md:py-20 ${className || ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
        <div className="container mx-auto px-4">
            {title && (
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold font-heading2 text-left text-sky-800 tracking-tight mb-12"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                    {title}
                </motion.h2>
            )}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {children}
            </motion.div>
        </div>
    </motion.div>
);


export default function ProfilClient({ data }: ClientProps) {
  // State for map carousel
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMapLightboxOpen, setIsMapLightboxOpen] = useState(false);

  // Maps data
  const maps = [
    {
      title: "Peta Administrasi",
      description: "Pembagian wilayah administratif Desa Gaya Baru",
      image: data.mapAdministrasi,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Peta Fasilitas Umum",
      description: "Sebaran fasilitas umum dan infrastruktur desa",
      image: data.mapFasilitas,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Peta Geomorfologi",
      description: "Kondisi topografi dan bentuk lahan desa",
      image: data.mapGeomorfologi,
      color: "from-orange-500 to-amber-500"
    },
    {
      title: "Peta Kependudukan",
      description: "Distribusi dan kepadatan penduduk desa",
      image: data.mapPenduduk,
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "Peta Potensi Air Tanah",
      description: "Potensi sumber daya air tanah di wilayah desa",
      image: data.mapAirTanah,
      color: "from-teal-500 to-blue-500"
    },
    {
      title: "Peta Wisata",
      description: "Lokasi objek wisata dan potensi pariwisata desa",
      image: data.mapWisata,
      color: "from-rose-500 to-pink-500"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || isMapLightboxOpen) return;

    const interval = setInterval(() => {
      setCurrentMapIndex((prev) => (prev + 1) % maps.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isMapLightboxOpen, maps.length]);

  const nextMap = () => {
    setCurrentMapIndex((prev) => (prev + 1) % maps.length);
  };

  const prevMap = () => {
    setCurrentMapIndex((prev) => (prev - 1 + maps.length) % maps.length);
  };

  const handleMapClick = () => {
    setIsMapLightboxOpen(true);
    setIsAutoPlay(false); // Pause autoplay when opening lightbox
  };

  const closeLightbox = () => {
    setIsMapLightboxOpen(false);
  };

  const currentMap = maps[currentMapIndex];

  return (
    <>
      {/* 1. Section Visi dan Misi */}
      <Section className="bg-sky-100/70">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader><CardTitle className="text-2xl md:text-3xl text-center font-bold font-heading2 text-sky-800 tracking-tight">Visi</CardTitle></CardHeader>
              <CardContent className="prose text-lg/6 text-gray-700 text-justify font-medium font-body2 max-w-none">
                {data.visi && <BlocksRenderer content={data.visi} />}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader><CardTitle className="text-2xl md:text-3xl text-center font-bold font-heading2 text-sky-800 tracking-tight">Misi</CardTitle></CardHeader>
              <CardContent className="prose text-lg text-gray-700 font-medium font-body2 max-w-none">
                {data.misi && <BlocksRenderer content={data.misi} />}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* 2. Section Bagan Desa */}
      <Section title="• Bagan Desa" className="bg-slate-100">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-xl font-semibold font-body2 mb-4 text-slate-700 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Struktur Organisasi Pemerintahan Desa
            </motion.h3>
            {data.baganSOTK && (
              <motion.div 
                className="relative w-full aspect-video border rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Image 
                  src={getStrapiURL(data.baganSOTK.url)}
                  alt={data.baganSOTK.alternativeText || "Bagan SOTK Desa"}
                  layout="fill"
                  objectFit="contain"
                />
              </motion.div>
            )}
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-xl font-semibold font-body2 mb-4 text-slate-700 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Struktur Organisasi Badan Permusyawaratan Desa
            </motion.h3>
            {data.baganBPD && (
              <motion.div 
                className="relative w-full aspect-video border rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Image 
                  src={getStrapiURL(data.baganBPD.url)}
                  alt={data.baganBPD.alternativeText || "Bagan BPD Desa"}
                  layout="fill"
                  objectFit="contain"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </Section>

      {/* 3. Section Lokasi Desa */}
      <Section title="• Peta Lokasi Desa Gaya Baru" className="bg-sky-100/70">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Kolom Kiri: Informasi Batas Wilayah */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="h-[350px] p-6 space-y-5">
                {/* Batas Desa */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold font-heading2 text-2xl mb-4 text-sky-800">• Batas Desa:</h4>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <motion.div 
                      className="font-body2 text-xl"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-bold text-slate-600">Utara</p>
                      <p className="text-slate-800">{data.batasUtara}</p>
                    </motion.div>
                    <motion.div 
                      className="font-body2 text-xl"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-bold text-slate-600">Timur</p>
                      <p className="text-slate-800">{data.batasTimur}</p>
                    </motion.div>
                    <motion.div 
                      className="font-body2 text-xl"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-bold text-slate-600">Selatan</p>
                      <p className="text-slate-800">{data.batasSelatan}</p>
                    </motion.div>
                    <motion.div 
                      className="font-body2 text-xl"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <p className="font-bold text-slate-600">Barat</p>
                      <p className="text-slate-800">{data.batasBarat}</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Garis Pemisah */}
                <motion.div 
                  className="border-t-2 border-slate-200"
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                />

                {/* Luas Desa */}
                <motion.div 
                  className="grid grid-cols-2 gap-y-4 gap-x-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-bold font-heading2 text-2xl text-sky-800">• Luas Desa:</h4>
                  <p className="text-slate-600 font-body2 font-medium text-2xl">{data.luasDesa.toLocaleString('id-ID')} km²</p>
                </motion.div>

              </CardContent>
            </Card>
          </motion.div>
          {/* Kolom Kanan: Peta */}
          <motion.div 
            className="relative z-10 h-[400px] w-full rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <MapWithNoSSR />
          </motion.div>
        </div>
      </Section>

      {/* 4. Section Peta Informasi Desa */}
      <Section title="• Peta Informasi Desa Gaya Baru" className="bg-slate-100">
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Map Display with Title */}
          <motion.div 
            className="relative bg-white rounded-t-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Header with gradient background */}
            <motion.div 
              className={`relative h-24 bg-gradient-to-r ${currentMap.color} flex items-center justify-between px-8`}
              key={currentMapIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-white">
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold font-heading2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {currentMap.title}
                </motion.h3>
                <motion.p 
                  className="text-white/90 font-body2 text-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {currentMap.description}
                </motion.p>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                  title={isAutoPlay ? "Pause" : "Play"}
                >
                  {isAutoPlay ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={prevMap}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                  title="Previous Map"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextMap}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                  title="Next Map"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>

            {/* Map Image */}
            <div className="relative aspect-[4/3] bg-gray-100">
              {currentMap.image && (
                <motion.div
                  key={currentMapIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 cursor-pointer group"
                  onClick={handleMapClick}
                >
                  <Image
                    src={getStrapiURL(currentMap.image.url)}
                    alt={currentMap.image.alternativeText || currentMap.title}
                    layout="fill"
                    objectFit="contain"
                    className="transition-opacity duration-300"
                  />
                </motion.div>
              )}
              
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <motion.div
                  className={`h-full bg-gradient-to-r ${currentMap.color}`}
                  initial={{ width: "0%" }}
                  animate={{ width: isAutoPlay && !isMapLightboxOpen ? "100%" : "0%" }}
                  transition={{ duration: 10, ease: "linear" }}
                  key={`${currentMapIndex}-${isAutoPlay}-${isMapLightboxOpen}`}
                />
              </div>
            </div>

            {/* Map indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {maps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMapIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentMapIndex
                      ? 'bg-white shadow-lg scale-125'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Map Grid Preview */}
          <motion.div 
            className="mt-8 grid grid-cols-3 lg:grid-cols-6 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {maps.map((map, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentMapIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentMapIndex
                    ? 'border-sky-500 scale-105 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:scale-102'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {map.image && (
                  <Image
                    src={getStrapiURL(map.image.url)}
                    alt={map.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-t ${map.color} opacity-60`} />
                <div className="absolute inset-0 flex items-end p-2">
                  <span className="text-white text-xs font-semibold font-body2 leading-tight">
                    {map.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </Section>

      {/* Map Lightbox Modal */}
      {isMapLightboxOpen && (
        <motion.div
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLightbox}
        >
          {/* Modal Content */}
          <motion.div
            className="relative max-w-7xl max-h-[90vh] w-full bg-white overflow-hidden shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`relative h-20 bg-gradient-to-r ${currentMap.color} flex items-center justify-between px-6`}>
              <div className="text-white">
                <h3 className="text-2xl font-bold font-heading2">{currentMap.title}</h3>
                <p className="text-white/90 font-body2">{currentMap.description}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors duration-200"
                title="Close"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Map Image */}
            <div className="relative bg-gray-50" style={{ height: 'calc(90vh - 5rem)' }}>
              {currentMap.image && (
                <Image
                  src={getStrapiURL(currentMap.image.url)}
                  alt={currentMap.image.alternativeText || currentMap.title}
                  layout="fill"
                  objectFit="contain"
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevMap();
                }}
                className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
                title="Previous Map"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextMap();
                }}
                className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200"
                title="Next Map"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Navigation Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {maps.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentMapIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentMapIndex
                      ? 'bg-white shadow-lg scale-125'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
