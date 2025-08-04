import React from 'react';
import { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import BeritaClient from '@/components/BeritaClient';

export const metadata: Metadata = {
  title: "Berita - Website Resmi Desa Gaya Baru",
  description: "Website Resmi Desa Gaya Baru",
};

interface BeritaPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

async function getBerita(page: number) {
  const PAGE_SIZE = 6; // Jumlah berita per halaman

  try {
    const params = {
      sort: { datePublished: 'desc' },
      populate: '*',

      pagination: {
        page: page,
        pageSize: PAGE_SIZE,
      },
    };

    const res = await fetchAPI("/api/beritas", params, { next: { revalidate: 60 } });

    if (!res) {
      throw new Error("Failed to fetch news data");
    }
    return res;
  } catch (error) {
    console.error("Error fetching news data:", error);
    return { data: [], meta: { pagination: { page: 1, pageCount: 1 } } };
  }
}

export default async function BeritaPage({ searchParams }: BeritaPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const beritaData = await getBerita(currentPage);

  return (
    <>
      <main className="bg-slate-50 min-h-screen">
        <BeritaClient
          berita={beritaData.data}
          pagination={beritaData.meta.pagination}
        />
      </main>
    </>
  );
}
