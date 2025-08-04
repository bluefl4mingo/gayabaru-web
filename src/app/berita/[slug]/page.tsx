import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchAPI, getStrapiURL } from '@/lib/api';
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import { Calendar, Newspaper, Home } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  formats?: {
          thumbnail: {
            url: string;
          }
        }
  name: string;
}

// Tipe data untuk satu artikel berita (detail)
interface BeritaDetail {
    id: number;
    title: string;
    thumbnail: StrapiMedia;
    textContent: BlocksContent;
    slug: string;
    datePublished: string;
}

// Tipe data untuk artikel di sidebar
interface RecentArticle {
    id: number;
    thumbnail: StrapiMedia;
    title: string;
    slug: string;
    datePublished: string;
}

async function getArticleBySlug(slug: string) {
  const params = {
    filters: { slug: { $eq: slug } },
    populate: '*',
  };
  const res = await fetchAPI("/api/beritas", params);
  if (res.data && res.data.length > 0) {
    return res.data[0] as BeritaDetail;
  }
  return null;
}

async function getRecentArticles(currentSlug: string) {
    const params = {
        sort: { datePublished: 'desc' },
        filters: { slug: { $ne: currentSlug } },
        pagination: { limit: 5 },
        populate: 'thumbnail',
    };
    const res = await fetchAPI("/api/beritas", params);
    return res.data as RecentArticle[];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Berita Tidak Ditemukan',
    };
  }

  const description = `${article.title} - Berita dari Desa Gaya Baru`;
  
  return {
    title: `${article.title} - Berita Desa Gaya Baru`,
    description: description,
  };
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [article, recentArticles] = await Promise.all([
    getArticleBySlug(slug),
    getRecentArticles(slug)
  ]);

  if (!article) {
    notFound();
  }

  const { title, thumbnail, textContent, datePublished } = article;
  const formattedDate = new Date(datePublished).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  console.log("Article Data:", article);

  return (
    <>
      <main className="bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-12">
            
            {/* Kolom Kiri: Konten Utama Berita */}
            <article className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="mb-4 text-sm font-medium font-body2 text-slate-700">
                <Link href="/" className="hover:text-sky-600">
                  <Home className="inline mb-0.5 w-3.5 h-3.5 mr-1" />Home
                </Link>
                <span className="mx-1.5">/</span>
                <Link href="/berita" className="hover:text-sky-600">Berita</Link>
              </div>

              {/* Judul Berita */}
              <h1 className="text-3xl lg:text-4xl font-extrabold font-heading2 text-slate-900 mb-4">
                {title}
              </h1>

              {/* Metadata */}
              <div className="flex items-center space-x-4 font-body2 text-md text-slate-500 mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-gray-800 font-semibold pt-1">{formattedDate}</span>
                </div>
              </div>

              {/* Gambar Thumbnail */}
              {thumbnail && (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
                  <Image
                    src={getStrapiURL(thumbnail.url)}
                    alt={thumbnail.alternativeText || title}
                    layout="fill"
                    objectFit="cover"
                    priority
                  />
                </div>
              )}

              {/* Konten Teks Berita */}
              <div className="font-body2 prose prose-lg max-w-none prose-p:text-slate-700 prose-headings:text-slate-800 text-justify">
                <BlocksRenderer content={textContent} />
              </div>
            </article>

            {/* Kolom Kanan: Sidebar Berita Terbaru */}
            <aside className="lg:col-span-1 mt-12 lg:mt-0">
              <div className="sticky top-28 p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center space-x-3 mb-4 border-b pb-3">
                  <Newspaper className="w-6 h-6 text-sky-600" />
                  <h2 className="text-xl font-bold font-heading2 text-slate-800">
                    Berita Terbaru
                  </h2>
                </div>
                <ul className="space-y-4">
                  {recentArticles.length > 0 ? (
                    recentArticles.map((recent) => {
                      const thumbnailUrl = recent.thumbnail?.formats?.thumbnail?.url 
                                        || recent.thumbnail?.url;

                      return (
                        <li key={recent.id}>
                          <Link href={`/berita/${recent.slug}`} className="group flex items-center space-x-4">
                            {thumbnailUrl && (
                              <div className="relative flex-shrink-0 w-32 h-18 rounded-md overflow-hidden">
                                <Image
                                  src={getStrapiURL(thumbnailUrl)}
                                  alt={recent.title}
                                  fill={true}
                                  loading="lazy"
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-semibold font-heading2 text-slate-700 group-hover:text-sky-600 transition-colors line-clamp-2 tracking-tight leading-5">
                                {recent.title}
                              </p>
                              <p className="font-body2 text-xs text-slate-500 mt-1">
                                {new Date(recent.datePublished).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </p>
                            </div>
                          </Link>
                        </li>
                      );
                    })
                  ) : (
                    <p className="text-sm text-slate-500">Tidak ada berita lain.</p>
                  )}
                </ul>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </>
  );
}
