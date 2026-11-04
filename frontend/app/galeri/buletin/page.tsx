"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { DatasetHero } from "@/components/dataset/DatasetHero";

type BuletinCard = {
  id: string;
  category: string;
  categorySlug: string;
  title: string;
  date: string;
  badgeColor: string;
  cardBg: string;
  accentColor: string;
  image: string;
};

const buletinData: BuletinCard[] = [
  {
    id: "1",
    category: "HIDROLOGI",
    categorySlug: "hidrologi",
    title: "Rekapitulasi Ketersediaan Air Setengah Bulan 16-30 September 2026",
    date: "Senin, 05 Oktober 2026",
    badgeColor: "bg-[#0284C7] text-white",
    cardBg: "bg-sky-50/60 border-sky-100",
    accentColor: "text-[#0284C7]",
    image: "/images/buletin/hidrologi/hidrologi-16-30-sept.jpg",
  },
  {
    id: "2",
    category: "HIDROMETEOROLOGI",
    categorySlug: "hidrometeorologi",
    title: "Curah Hujan Dasarian 11 – 20 Oktober 2026",
    date: "Rabu, 21 Oktober 2026",
    badgeColor: "bg-purple-700 text-white",
    cardBg: "bg-purple-50/60 border-purple-100",
    accentColor: "text-purple-700",
    image: "/images/buletin/hidrometeorologi/hal-1/dasarian-11-20-okt.jpg",
  },
  {
    id: "3",
    category: "HIDROGEOLOGI",
    categorySlug: "hidrogeologi",
    title: "Belum ada edisi",
    date: "-",
    badgeColor: "bg-emerald-600 text-white",
    cardBg: "bg-emerald-50/60 border-emerald-100",
    accentColor: "text-emerald-600",
    image: "",
  },
  {
    id: "4",
    category: "KEJADIAN LAINNYA",
    categorySlug: "kejadian",
    title: "Buletin Kekeringan Dasarian II September",
    date: "Rabu, 23 September 2026",
    badgeColor: "bg-amber-600 text-white",
    cardBg: "bg-amber-50/60 border-amber-100",
    accentColor: "text-amber-600",
    image: "/images/buletin/kejadian/kejadian.jpg",
  },
  {
    id: "5",
    category: "EL NINO",
    categorySlug: "elnino",
    title: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
    date: "Selasa, 20 Oktober 2026",
    badgeColor: "bg-orange-600 text-white",
    cardBg: "bg-orange-50/60 border-orange-100",
    accentColor: "text-orange-600",
    image: "/images/buletin/elnino/EL NINO.png",
  },
];

export default function BuletinMainPage() {
  return (
    <>
      <DatasetHero
        kicker="Galeri"
        title="Buletin SIH3"
        description="Publikasi berkala mengenai analisis hidrologi, hidrometeorologi, hidrogeologi, serta peristiwa penting lainnya di Wilayah Sungai Serayu Opak."
      />
      <main className="min-h-screen bg-page pb-16">
      <Container className="py-8 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">Buletin</p>
        <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-[#1B2430] sm:text-[26px]">Edisi terbaru</h2>
        <p className="mt-1 text-[13px] text-[#5B6675]">Edisi terbaru dari setiap kategori buletin. Klik kartu untuk melihat seluruh edisi.</p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {buletinData.map((item) => (
            <Link
              key={item.id}
              href={`/galeri/buletin/${item.categorySlug}`}
              className="group flex flex-col justify-between rounded-[8px] border border-[#D5DBE3] bg-white p-4 transition-all hover:border-[#AEB8C5] hover:shadow-[0_2px_10px_rgba(14,42,78,0.08)]"
            >
              <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-[6px] bg-[#F5F7FA] p-2">
                {item.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full rounded object-contain transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-[#AEB8C5]">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="mt-2 text-xs font-semibold">Belum ada gambar</span>
                  </div>
                )}

                {item.image && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-slate-900/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-xs">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    Perbesar
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                                        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-[#5B6675]">{item.date}</p>
                  <h3 className="mt-1 line-clamp-2 text-[14px] font-semibold leading-snug text-[#1B2430] group-hover:text-[#0B5CAD]">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-4 pt-2 border-t border-[#D5DBE3]/60">
                  <span className="text-[13px] font-medium text-[#0B5CAD] group-hover:underline">
                    Lihat semua edisi &gt;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </main>
    </>
  );
}