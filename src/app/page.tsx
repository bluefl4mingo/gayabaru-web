import React from 'react';

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
    </>
  );
}
