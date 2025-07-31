import React from 'react';

import Header from '../components/Header'; 
import { fetchAPI } from '../lib/api';
import HomePageClient from '../components/HomePageClient';


export default async function HomePage() {
  
  const [homepageRes, galleryRes] = await Promise.all([
    fetchAPI("/api/profil-desa", { populate: "heroImage" }, { next: { revalidate: 60 } }),
    fetchAPI("/api/gallery", { populate: "*" }, { next: { revalidate: 60 } }),
  ]);

  const homepage = homepageRes.data;
  const gallery = galleryRes.data;

  return (
    <>
      <main>
        <HomePageClient homepage={homepage} gallery={gallery} />
      </main>

      <footer className="bg-sky-900 text-white py-8">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Pemerintah Desa Gaya Baru. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
