import React from 'react';
import { Metadata } from 'next';
import { fetchAPI } from '@/lib/api'; // Sesuaikan path jika perlu
import ProfilClient from '@/components/ProfilClient'; // Komponen UI yang akan kita buat

export const metadata: Metadata = {
  title: " Profil Desa - Website Resmi Desa Gaya Baru",
  description: "Website Resmi Desa Gaya Baru",
};

async function getProfilData() {
  try {
    const res = await fetchAPI("/api/profil-desa", { populate: "*" }, { next: { revalidate: 60 } });

    if (!res?.data) {
      throw new Error("Failed to fetch profil desa data");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching profil data:", error);
    return null;
  }
}


export default async function ProfilPage() {
  const profilData = await getProfilData();

  console.log('Profil Data:', profilData);

  if (!profilData) {
    return (
      <>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-4xl font-bold">Gagal memuat data profil desa.</h1>
          <p>Silakan coba lagi nanti.</p>
        </div>
      </>
    );
  }
  
  return (
    <>
      <main>
        {/* Meneruskan data ke Client Component */}
        <ProfilClient data={profilData} />
      </main>
    </>
  );
}
