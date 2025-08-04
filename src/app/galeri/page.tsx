import React from 'react';
import { Metadata } from 'next';
import { fetchAPI } from '@/lib/api';
import GaleriClient from '@/components/GaleriClient';

export const metadata: Metadata = {
  title: "Galeri - Website Resmi Desa Gaya Baru",
  description: "Website Resmi Desa Gaya Baru",
};

async function getGalleryData() {
  try {
    const res = await fetchAPI("/api/gallery", { populate: 'photos' }, { next: { revalidate: 3600 } });

    if (!res?.data?.photos) {
      throw new Error("Failed to fetch gallery photos");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    return { photos: [] };
  }
}

export default async function GaleriPage() {
  const galleryData = await getGalleryData();

  return (
    <>
      <main className="bg-slate-100 min-h-screen">
        <GaleriClient gallery={galleryData} />
      </main>
    </>
  );
}
