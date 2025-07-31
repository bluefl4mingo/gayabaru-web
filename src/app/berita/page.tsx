// app/berita/page.tsx
import React from 'react';
import Header from '@/components/Header'; // Sesuaikan path jika perlu
import { fetchAPI } from '@/lib/api'; // Sesuaikan path jika perlu
import BeritaClient from '@/components/BeritaClient'; // Komponen UI yang akan kita buat

// Tipe data untuk props halaman, termasuk parameter pencarian (untuk paginasi)
interface BeritaPageProps {
  searchParams?: {
    page?: string;
  };
}

// Fungsi untuk mengambil data berita dari Strapi
async function getBerita(page: number) {
  const PAGE_SIZE = 6; // Jumlah berita per halaman, bisa disesuaikan

  try {
    const params = {
      sort: { datePublished: 'desc' }, // Urutkan dari yang terbaru
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
  // Tentukan halaman saat ini dari URL, default ke halaman 1
  const currentPage = Number(searchParams?.page) || 1;
  const beritaData = await getBerita(currentPage);
  console.log("Berita Data:", beritaData);

  return (
    <>
      <main className="bg-slate-50 min-h-screen">
        <BeritaClient
          berita={beritaData.data}
          pagination={beritaData.meta.pagination}
        />
      </main>
      <footer className="bg-sky-900 text-white py-8">
        <div className="container mx-auto text-center">
            <p>© {new Date().getFullYear()} Pemerintah Desa Gaya Baru. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
