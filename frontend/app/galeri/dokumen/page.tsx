"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Download, Eye, FileText, Search, X } from "lucide-react";
import { DatasetHero } from "@/components/dataset/DatasetHero";
import { Container } from "@/components/layout/Container";
import data from "./data.json";

type Dokumen = {
  nomor: string;
  judul: string;
  url: string;
  pencarian: string;
};

const kategori = [
  { id: "1", nama: "Peraturan Perundang-undangan" },
  { id: "2", nama: "Peraturan Kebijakan & Produk Hukum Khusus" },
  { id: "3", nama: "Dokumen Non-Peraturan Perundang-undangan" },
  { id: "4", nama: "Publikasi Edukasi & Informasi Hukum Publik" },
];

const pillBase = "inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium";
const pillActive = "border border-[#14396A] bg-[#14396A] text-white";
const pillIdle =
  "border border-[#AEB8C5] bg-white text-[#1B2430] hover:border-[#14396A] hover:text-[#14396A]";
const btnOutline =
  "inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-[#AEB8C5] bg-white px-3 text-[13px] font-medium text-[#1B2430] hover:bg-[#F0F3F7]";
const btnPrimary =
  "inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-[#14396A] bg-[#14396A] px-3 text-[13px] font-semibold text-white hover:bg-[#0E2A4E]";

export default function GaleriDokumenPage() {
  const [pencarian, setPencarian] = useState("");
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [preview, setPreview] = useState<Dokumen | null>(null);

  const dokumen = data.dokumen as Dokumen[];

  const hasil = useMemo(() => {
    const keyword = pencarian.toLowerCase().trim();
    return dokumen.filter((item) => {
      const sesuaiKategori = kategoriAktif === "Semua" || item.nomor.split(".")[0] === kategoriAktif;
      const sesuaiPencarian =
        !keyword ||
        item.judul.toLowerCase().includes(keyword) ||
        item.nomor.toLowerCase().includes(keyword) ||
        item.pencarian.toLowerCase().includes(keyword);
      return sesuaiKategori && sesuaiPencarian;
    });
  }, [dokumen, pencarian, kategoriAktif]);

  return (
    <>
      <DatasetHero
        kicker="Galeri"
        title="Publikasi Dokumen"
        description="Peraturan, prosedur, dan dokumen pengelolaan hidrologi Wilayah Sungai Serayu Opak."
      />

      <main className="min-h-screen bg-page pb-16">
        <Container className="py-8 sm:py-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-1.5 text-[12px] font-medium text-[#5B6675]"
          >
            <Link href="/" className="hover:text-[#0B5CAD]">
              Beranda
            </Link>
            <ChevronRight aria-hidden="true" className="h-3 w-3 text-[#AEB8C5]" />
            <span className="text-[#1B2430]">Dokumen</span>
          </nav>

          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">
                Dokumen
              </p>
              <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-[#1B2430] sm:text-[26px]">
                Regulasi dan publikasi
              </h2>
              <p className="mt-1 text-[13px] text-[#5B6675]">
                Menampilkan {hasil.length} dari {dokumen.length} dokumen
              </p>
            </div>

            <label className="relative w-full sm:w-72">
              <span className="sr-only">Cari dokumen</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A96A6]"
              />
              <input
                type="search"
                value={pencarian}
                onChange={(e) => setPencarian(e.target.value)}
                placeholder="Cari judul atau nomor…"
                className="h-9 w-full rounded-[6px] border border-[#AEB8C5] bg-white pl-9 pr-3 text-[13px] text-[#1B2430] placeholder:text-[#8A96A6] focus:border-[#0B5CAD] focus:outline-none focus:ring-2 focus:ring-[#0B5CAD]/20"
              />
            </label>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setKategoriAktif("Semua")}
              className={`${pillBase} ${kategoriAktif === "Semua" ? pillActive : pillIdle}`}
            >
              Semua
            </button>
            {kategori.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKategoriAktif(k.id)}
                className={`${pillBase} ${kategoriAktif === k.id ? pillActive : pillIdle}`}
              >
                {k.nama}
              </button>
            ))}
          </div>

          {hasil.length === 0 ? (
            <div className="rounded-[8px] border border-[#D5DBE3] bg-white p-8 text-center text-[13px] text-[#5B6675]">
              Tidak ada dokumen yang sesuai dengan pencarian.
            </div>
          ) : (
            <div className="space-y-6">
              {kategori.map((kelompok) => {
                const items = hasil.filter((item) => item.nomor.split(".")[0] === kelompok.id);
                if (items.length === 0) return null;

                return (
                  <section
                    key={kelompok.id}
                    className="overflow-hidden rounded-[8px] border border-[#D5DBE3] bg-white"
                  >
                    <div className="flex items-baseline justify-between gap-3 border-b border-[#D5DBE3] bg-[#F5F7FA] px-4 py-3 sm:px-5">
                      <h3 className="text-[15px] font-semibold text-[#1B2430]">
                        {kelompok.id}. {kelompok.nama}
                      </h3>
                      <span className="shrink-0 text-[12px] text-[#5B6675]">
                        {items.length} dokumen
                      </span>
                    </div>

                    <ul className="divide-y divide-[#E9EDF2]">
                      {items.map((item) => (
                        <li
                          key={`${item.nomor}-${item.url}`}
                          className="flex flex-col gap-3 px-4 py-3.5 sm:px-5 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <FileText
                              aria-hidden="true"
                              className="h-5 w-5 shrink-0 text-[#8A96A6]"
                            />
                            <div className="min-w-0">
                              <p className="text-[12px] font-medium tabular-nums text-[#5B6675]">
                                {item.nomor}
                              </p>
                              <p className="mt-0.5 text-[14px] leading-snug text-[#1B2430]">
                                {item.judul}
                              </p>
                            </div>
                          </div>

                          <div className="flex shrink-0 gap-2 pl-8 md:pl-0">
                            <button type="button" onClick={() => setPreview(item)} className={btnOutline}>
                              <Eye aria-hidden="true" className="h-3.5 w-3.5" />
                              Lihat
                            </button>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                              <Download aria-hidden="true" className="h-3.5 w-3.5" />
                              Unduh PDF
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          )}
        </Container>
      </main>

      {preview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau ${preview.judul}`}
          onClick={() => setPreview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2140]/70 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[8px] bg-white"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#D5DBE3] px-4 py-3">
              <h2 className="line-clamp-2 text-[14px] font-semibold text-[#1B2430]">{preview.judul}</h2>
              <button
                type="button"
                onClick={() => setPreview(null)}
                aria-label="Tutup pratinjau"
                className="shrink-0 rounded-[6px] p-1.5 text-[#5B6675] hover:bg-[#F0F3F7] hover:text-[#1B2430]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <iframe title={preview.judul} src={preview.url} className="min-h-0 w-full flex-1" />

            <div className="flex justify-end border-t border-[#D5DBE3] px-4 py-3">
              <a href={preview.url} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                Buka di tab baru
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
