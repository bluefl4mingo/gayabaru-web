'use client'; 

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { getStrapiURL } from '../lib/api';
import { LuScrollText } from "react-icons/lu";
import { PiDotsThreeOutlineFill, PiVideo } from "react-icons/pi";
import { LuMapPinned } from "react-icons/lu";
import { PiImagesSquare } from "react-icons/pi";
import { Button } from './ui/button';
import { motion } from 'motion/react';


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

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const HeroSection = ({ imageUrl }: { imageUrl: string }) => (
    <motion.section 
      className="relative h-[60vh] md:h-[90vh] flex items-center bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url('${imageUrl}')` }}
      aria-label="Pemandangan Desa Gaya Baru"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative container my-auto mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-2xl text-white"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-3xl md:text-5xl font-medium font-body2 text-shadow-lg/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Selamat Datang di
          </motion.h1>
          <motion.p 
            className="text-5xl md:text-7xl mt-2 font-bold font-heading2 text-shadow-lg/70"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Website Resmi Desa Gaya Baru
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
  
  interface SectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    titleAlign?: 'left' | 'center';
    icon?: React.ReactNode; 
  }

  const Section: React.FC<SectionProps> = ({ title, children, className, titleAlign = 'center', icon }) => (
    <motion.section 
      className={`py-16 md:py-20 ${className || 'bg-white'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto px-4 sm:px-10 lg:px-16">
        <motion.div 
          className={`flex pb-3 mb-12 items-center space-x-3 border-b ${
            titleAlign === 'left' ? 'justify-start' : 'justify-center'
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {icon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {icon}
            </motion.div>
          )}
          <h2 className={`text-3xl md:text-4xl font-bold font-heading2 text-sky-800 tracking-tight`}>
            {title}
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
  
  const VideoSection = () => (
    <Section title="Video Profil Desa Gaya Baru" className="bg-sky-50" titleAlign="center" icon={<PiVideo className="inline-block w-10 h-10 text-sky-800" />}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="aspect-video w-full rounded-lg shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/_as_4Bqc7aE`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </Section>
  );
  
  const GallerySection: React.FC<{ images: { photos: StrapiMedia[] } }> = ({ images }) => (
    <Section title="Galeri Foto" titleAlign="left" icon={<PiImagesSquare className="inline-block w-10 h-10 text-sky-800"/>} className="bg-sky-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          className="w-full h-[300px] md:h-[500px]"
          breakpoints={{
            768: { slidesPerView: 1, spaceBetween: 0 },
            1080: { slidesPerView: 2, spaceBetween: 30 },
          }}
        >
          {images && images.photos && images.photos.map((image, index) => (
            <SwiperSlide key={image.id} className="rounded-lg overflow-hidden bg-gray-200">
              {image.url && (
                <div className="relative w-full h-full">
                  <Image
                    src={getStrapiURL(image.url)}
                    alt={image.alternativeText || image.name}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Button asChild={true} variant="ghost" size="lg" className="mt-6 font-heading2 font-bold text-lg text-sky-800 border-gray-800 hover:bg-sky-100">
          <Link href="/galeri" className="">
            <PiDotsThreeOutlineFill size={40} className="inline-block text-lg w-10 h-10 mr-1" />
            Lihat Foto Lebih Banyak
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
  

const HomePageClient: React.FC<HomePageClientProps> = ({ homepage, gallery }) => {
    const heroImageUrl = getStrapiURL(homepage.heroImage?.url);

    return (
        <>
            <HeroSection imageUrl={heroImageUrl} />

            {/* <Section title="Deskripsi Desa" titleAlign="left">
                <div className="prose lg:prose-xl mx-auto text-justify text-gray-800">
                    {homepage.deskripsiDesa && <BlocksRenderer content={homepage.deskripsiDesa} />}
                </div>
            </Section> */}

            <motion.section 
              className="my-16 md:my-24"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="container mx-auto px-4 sm:px-10. lg:px-16">
                {/* TITLE */}
                <motion.div 
                  className="flex pb-3 items-center space-x-4 border-b"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    initial={{ opacity: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <LuScrollText className="inline-block w-8 h-8 text-sky-800 mr-3" />
                  </motion.div>
                  <h1 className="text-4xl font-bold font-heading2 tracking-tight text-sky-800">
                    Deskripsi Desa Gaya Baru
                  </h1>
                </motion.div>
                {/* Content */}
                <div className="grid grid-cols-3 pt-6 gap-6 items-start justify-center h-full">
                  {/* KOLOM KIRI */}
                  <motion.div 
                    className="flex flex-col col-span-2 items-center justify-center"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="prose lg:prose-xl font-body2 font-medium mx-auto pr-10 text-justify text-gray-700">
                      {homepage.deskripsiDesa && <BlocksRenderer content={homepage.deskripsiDesa} />}
                    </div>
                  </motion.div>
                  {/* KOLOM KANAN */}
                  <motion.div 
                    className="flex flex-col items-center justify-center"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                                className=""
                                src="/kabBusel.svg"
                                alt="Logo Kabupaten Buton Selatan"
                                width={400}
                                height={350}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            <VideoSection />

            <Section title="Peta Desa Gaya Baru" icon={<LuMapPinned className="inline-block w-10 h-10 text-sky-800" />} className="bg-sky-50">
              <motion.div 
                className="relative z-10 h-[500px] w-full max-w-6xl mx-auto rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                 <MapWithNoSSR />
              </motion.div>
            </Section>

            {/* <Section title="Sejarah Desa Gaya Baru" className="bg-sky-50" titleAlign="left">
                <div className="prose lg:prose-xl mx-auto text-justify text-gray-800">
                    {homepage.sejarahDesa && <BlocksRenderer content={homepage.sejarahDesa} />}
                </div>
            </Section> */}

            <GallerySection images={gallery} />
        </>
    )
}

export default HomePageClient;
