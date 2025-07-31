import React from 'react';
import Header from '@/components/Header';
import { fetchAPI } from '@/lib/api';
import InfographicsClient from '@/components/InfographicsClient';

async function getInfographicsData() {
  try {
    const [infographic1Res, infographic2Res] = await Promise.all([
      fetchAPI("/api/infographic", {}, { next: { revalidate: 60 } }),
      fetchAPI("/api/infographic2", {}, { next: { revalidate: 60 } }),
    ]);

    if (!infographic1Res?.data || !infographic2Res?.data) {
        throw new Error("Failed to fetch infographic data");
    }

    return {
      infographic1: infographic1Res.data,
      infographic2: infographic2Res.data,
    };
  } catch (error) {
    console.error("Error fetching infographics data:", error);
    return {
      infographic1: null,
      infographic2: null,
    };
  }
}

export default async function InfographicsPage() {
  const { infographic1, infographic2 } = await getInfographicsData();

  if (!infographic1 || !infographic2) {
    return (
      <>
        <div className="container mx-auto py-12 text-center">
          <h1 className="text-4xl font-bold">Gagal memuat data infografis.</h1>
          <p>Silakan coba lagi nanti.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <main className="bg-slate-50">
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-slate-800">
            Infografis Kependudukan Desa
          </h1>
          <InfographicsClient data1={infographic1} data2={infographic2} />
        </div>
      </main>
    </>
  );
}
