// components/BeritaClient.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { getStrapiURL } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  name: string;
}

// Tipe data untuk satu artikel berita
interface BeritaItem {
    id: number;
    title: string;
    thumbnail: StrapiMedia;
    textContent: BlocksContent;
    slug: string;
    datePublished: string;
}

// Tipe data untuk informasi paginasi dari Strapi
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

// Komponen untuk satu kartu berita
const BeritaCard = ({ article }: { article: BeritaItem }) => {

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
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <Card className="flex flex-col overflow-hidden h-full transform transition-transform duration-300 hover:-translate-y-2">
      <CardHeader className="p-0">
        <Link href={`/berita/${article.slug}`}>
          <div className="relative aspect-video">
            {article.thumbnail ? (
              <Image
                src={getStrapiURL(article.thumbnail.url)}
                alt={article.thumbnail.alternativeText || article.title}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300 hover:opacity-90"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                <span className="text-slate-500">No Image</span>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="px-4 flex-grow">
        <Link href={`/berita/${article.slug}`}>
          <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:text-sky-700">
            {article.title}
          </h3>
        </Link>
        <p className="text-sm text-slate-600 line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="pl-4 text-xs font-bold text-slate-500 border-t mt-0">
        <span>{formattedDate}</span>
      </CardFooter>
    </Card>
  );
};

// Komponen utama
export default function BeritaClient({ berita, pagination }: ClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Berita Desa
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
          Menyajikan informasi terbaru tentang peristiwa, berita terkini, dan artikel-artikel jurnalistik dari Desa Gaya Baru.
        </p>
      </div>

      {berita.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {berita.map((article) => (
            <BeritaCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-slate-500">Belum ada berita yang dipublikasikan.</p>
        </div>
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
