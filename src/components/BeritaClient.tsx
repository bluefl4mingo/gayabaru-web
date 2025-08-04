'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { getStrapiURL } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { Calendar, Newspaper } from 'lucide-react';
import { motion } from 'motion/react';

interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  name: string;
}

interface BeritaItem {
    id: number;
    title: string;
    thumbnail: StrapiMedia;
    textContent: BlocksContent;
    slug: string;
    datePublished: string;
}

interface PaginationInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface ClientProps {
  berita: BeritaItem[];
  pagination: PaginationInfo;
}

// Animation variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1
  }
};

// Komponen untuk satu kartu berita
const BeritaCard = ({ article, index }: { article: BeritaItem, index: number }) => {

  const getExcerpt = (content: BlocksContent, maxLength: number = 200) => {
    if (!content) return '';
    let text = '';
    for (const block of content) {
      if (block.type === 'paragraph') {
        for (const child of block.children) {
          if (child.type === 'text') {
            text += child.text + ' ';
          }
        }
      }
      if (text.length > maxLength) break;
    }
    return text.slice(0, maxLength).trim() + (text.length > maxLength ? '...' : '');
  };

  const excerpt = getExcerpt(article.textContent);
  const formattedDate = new Date(article.datePublished).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: index * 0.1
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="flex flex-col overflow-hidden h-full py-0">
        <CardHeader className="p-0">
          <Link href={`/berita/${article.slug}`}>
            <motion.div 
              className="relative aspect-video"
            >
              {article.thumbnail ? (
                <Image
                  src={getStrapiURL(article.thumbnail.url)}
                  alt={article.thumbnail.alternativeText || article.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-opacity duration-300 hover:opacity-90 rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <span className="text-slate-500">No Image</span>
                </div>
              )}
            </motion.div>
          </Link>
        </CardHeader>
        <CardContent className="px-4 flex-grow">
          <Link href={`/berita/${article.slug}`}>
            <motion.h3 
              className="text-lg font-heading2 font-bold mb-2 line-clamp-2 hover:text-sky-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {article.title}
            </motion.h3>
          </Link>
          <motion.p 
            className="text-sm text-slate-600 font-body2 line-clamp-3 text-justify"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {excerpt}
          </motion.p>
        </CardContent>
        <CardFooter className="pl-0 py-0 text-lg font-black font-body2 text-white mt-4">
          <motion.div 
            className="flex h-max max-w-xl px-4 py-3 bg-linear-to-b from-sky-800/80 to-cyan-600/60 rounded-tr-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <Calendar className="mr-2 inline-block w-5 h-5" />
            <span className="tracking-tight line-clamp-2 text-shadow-lg">{formattedDate}</span>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function BeritaClient({ berita, pagination }: ClientProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div 
        className="text-left mb-6 pb-2 border-b"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Newspaper className="inline-block w-8 h-8 text-sky-800 mr-3" />
          </motion.div>
          <h1 className="text-4xl font-bold font-heading2 tracking-tight text-sky-800">
            Berita Desa
          </h1>
        </motion.div>
        <motion.p 
          className="mt-2 max-w-4xl text-lg text-slate-700 font-body2 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Menyajikan informasi terbaru tentang peristiwa, berita terkini, dan artikel-artikel jurnalistik dari Desa Gaya Baru
        </motion.p>
      </motion.div>

      {berita.length > 0 ? (
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {berita.map((article, index) => (
            <BeritaCard key={article.id} article={article} index={index} />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-2xl font-heading2 text-slate-500">Belum ada berita yang dipublikasikan.</p>
        </motion.div>
      )}

      {/* Komponen Pagination */}
      {pagination.pageCount > 1 && (
        <div className="mt-16">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={createPageURL(pagination.page - 1)}
                  className={pagination.page === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {/* Logika untuk menampilkan nomor halaman */}
              {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(page => (
                 <PaginationItem key={page}>
                    <PaginationLink href={createPageURL(page)} isActive={pagination.page === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={createPageURL(pagination.page + 1)}
                  className={pagination.page === pagination.pageCount ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
