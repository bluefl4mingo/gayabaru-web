// components/GaleriClient.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getStrapiURL } from '@/lib/api';
import { Images } from 'lucide-react';
import { motion } from 'motion/react';

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Photo {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    thumbnail: { url: string };
    small: { url: string };
  }
}

interface ClientProps {
  gallery: {
    photos: Photo[];
  };
}

const PAGE_SIZE = 12;

// Animation variants
const photoVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 30
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function GaleriClient({ gallery }: ClientProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const allPhotos = gallery.photos || [];

  const pageCount = Math.ceil(allPhotos.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentPhotos = allPhotos.slice(startIndex, endIndex);

  const lightboxSlides = allPhotos.map(photo => ({
    src: getStrapiURL(photo.url || ''),
    alt: photo.alternativeText || 'Foto Galeri',
  }));

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div 
        className="text-left mb-6 pb-2 border-b"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Images className="inline-block w-8 h-8 text-sky-800 mr-3" />
          </motion.div>
          <h1 className="text-4xl font-bold font-heading2 tracking-tight text-sky-800">
            Galeri Foto
          </h1>
        </motion.div>
        <motion.p 
          className="mt-2 max-w-4xl text-lg text-slate-700 font-body2 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Menampilkan foto-foto kegiatan yang berlangsung di Desa Gaya Baru
        </motion.p>
      </motion.div>

      {currentPhotos.length > 0 ? (
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {currentPhotos.map((photo, photoIndex) => {
            const thumbnailUrl = photo.formats?.small?.url || photo.url;
            const globalIndex = startIndex + photoIndex; 
            return (
              <motion.div
                key={photo.id}
                className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setLightboxIndex(globalIndex)}
                variants={photoVariants}
                initial="hidden"
                animate="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: photoIndex * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {thumbnailUrl && (
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={getStrapiURL(thumbnailUrl)}
                      alt={photo.alternativeText || 'Galeri'}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300"
                    />
                  </motion.div>
                )}
                <motion.div 
                  className="absolute inset-0 bg-black/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-500">Belum ada foto yang diunggah.</p>
        </motion.div>
      )}

      {/* Komponen Lightbox */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        plugins={[Thumbnails]}
        thumbnails={{ position: "bottom", height: 80, width: 120, padding: 4, gap: 8 }}
      />

      {/* Komponen Pagination*/}
      {pageCount > 1 && (
        <div className="mt-16">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                 <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={currentPage === pageCount ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
