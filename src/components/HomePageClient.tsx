'use client'; 

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

import { getStrapiURL } from '../lib/api';

interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  name: string;
}


interface HomePageClientProps {
  homepage: {
    deskripsiDesa: BlocksContent; 
    sejarahDesa: BlocksContent;
    heroImage: StrapiMedia;
  };
  gallery: {
    photos: StrapiMedia[];
  };
}

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const HeroSection = ({ imageUrl }: { imageUrl: string }) => (
    <section 
      className="relative h-[60vh] md:h-[100vh] flex items-center bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url('${imageUrl}')` }}
      aria-label="Pemandangan Desa Gaya Baru"
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative container my-auto mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-light tracking-wider">
            Selamat Datang di
          </h1>
          <p className="text-5xl md:text-7xl font-bold mt-2">
            Website Resmi Desa Gaya Baru
          </p>
        </div>
      </div>
    </section>
  );
  
  interface SectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    titleAlign?: 'left' | 'center';
  }

  const Section: React.FC<SectionProps> = ({ title, children, className, titleAlign = 'center' }) => (
    <section className={`py-16 md:py-24 ${className || 'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl font-bold text-sky-900 mb-12 ${
          titleAlign === 'left' ? 'text-left' : 'text-center'
        }`}>
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
  
  const VideoSection = () => (
    <Section title="Video Profil Desa Gaya Baru" className="bg-sky-50">
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video w-full rounded-lg shadow-2xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/_as_4Bqc7aE`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </Section>
  );
  
  const GallerySection: React.FC<{ images: { photos: StrapiMedia[] } }> = ({ images }) => (
    <Section title="Galeri Foto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full h-[300px] md:h-[500px]"
        breakpoints={{
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
      >
        {images && images.photos && images.photos.map((image) => (
          <SwiperSlide key={image.id} className="rounded-lg overflow-hidden bg-gray-200">
            {image.url && (
              <div className="relative w-full h-full">
                <Image
                  src={getStrapiURL(image.url)}
                  alt={image.alternativeText || image.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
  

const HomePageClient: React.FC<HomePageClientProps> = ({ homepage, gallery }) => {
    const heroImageUrl = getStrapiURL(homepage.heroImage?.url);
    console.log('Hompage hero image:', heroImageUrl);

    return (
        <>
            <HeroSection imageUrl={heroImageUrl} />

            <Section title="Deskripsi Desa" titleAlign="left">
                <div className="prose lg:prose-xl mx  -auto text-justify text-gray-800">
                    {homepage.deskripsiDesa && <BlocksRenderer content={homepage.deskripsiDesa} />}
                </div>
            </Section>

            <VideoSection />

            <Section title="Peta Desa Gaya Baru">
            <div className="relative z-10 h-[500px] w-full max-w-6xl mx-auto rounded-lg shadow-lg overflow-hidden">
                 <MapWithNoSSR />
              </div>
            </Section>
            
            <Section title="Sejarah Desa Gaya Baru" className="bg-sky-50" titleAlign="left">
                <div className="prose lg:prose-xl mx-auto text-justify text-gray-800">
                    {homepage.sejarahDesa && <BlocksRenderer content={homepage.sejarahDesa} />}
                </div>
            </Section>

            <GallerySection images={gallery} />
        </>
    )
}

export default HomePageClient;
