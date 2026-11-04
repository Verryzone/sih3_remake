"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Building2, ChevronRight, ExternalLink, Search, X } from "lucide-react";
import { DatasetHero } from "@/components/dataset/DatasetHero";
import { Container } from "@/components/layout/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { getWalidataList } from "@/lib/api";
import { Walidata } from "@/lib/types";

/** Informasi pelengkap yang belum tersedia di API. */
const WALIDATA_METADATA: Record<string, { kategori: string; alamat: string }> = {
  "BBWS SO": {
    kategori: "Kementerian Pekerjaan Umum",
    alamat: "Jl. Solo Km. 5,8, Babarsari, Caturtunggal, Depok, Sleman, D.I. Yogyakarta 55281",
  },
  "BMKG DIY": {
    kategori: "Lembaga Pemerintah Non-Kementerian",
    alamat: "Jl. Kabupaten Km 5.5, Duwet, Sendangadi, Mlati, Sleman, D.I. Yogyakarta 55285",
  },
  "DPUPESDM DIY": {
    kategori: "Pemerintah Daerah D.I. Yogyakarta",
    alamat: "Jl. Bumijo No. 5, Gowongan, Jetis, Kota Yogyakarta, D.I. Yogyakarta 55231",
  },
  "PUSDATARU JATENG": {
    kategori: "Pemerintah Provinsi Jawa Tengah",
    alamat: "Jl. Madukoro Blok AA-BB, Krobokan, Semarang Barat, Kota Semarang, Jawa Tengah 50144",
  },
  "DLHK DIY": {
    kategori: "Pemerintah Daerah D.I. Yogyakarta",
    alamat: "Jl. Argolubang No. 19, Baciro, Gondokusuman, Kota Yogyakarta, D.I. Yogyakarta 55225",
  },
  "PJT I": {
    kategori: "Badan Usaha Milik Negara",
    alamat: "Jl. Surabaya No. 2A, Gading Kasri, Klojen, Kota Malang, Jawa Timur 65115",
  },
};

function waUrl(raw: string, nama: string): string {
  let digits = raw.replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) digits = "62" + digits.slice(1);
  const pesan = `Halo Tim Pengelola Data ${nama}, saya ingin mengajukan permohonan data melalui portal SIH3 Serayu Opak. Mohon informasi prosedurnya. Terima kasih.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(pesan)}`;
}

const linkCls =
  "inline-flex items-center gap-1 text-[13px] font-medium text-[#0B5CAD] hover:text-[#14396A] hover:underline";
const dash = <span className="text-[13px] text-[#AEB8C5]">&mdash;</span>;

function ExtLink({ href, children }: { href?: string | null; children: React.ReactNode }) {
  if (!href) return dash;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={linkCls}>
      {children}
      <ExternalLink aria-hidden="true" className="h-3 w-3" />
    </a>
  );
}

function LogoBox({ w }: { w: Walidata }) {
  const [failed, setFailed] = useState(false);
  const showImg = w.logo_path && !failed;
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[6px] border border-[#D5DBE3] bg-[#F5F7FA]">
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={w.logo_path!}
          alt=""
          onError={() => setFailed(true)}
          className="h-full w-full bg-white object-contain p-1"
        />
      ) : (
        <Building2 aria-hidden="true" className="h-5 w-5 text-[#8A96A6]" />
      )}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-[8px]" />
      ))}
    </div>
  );
}

function WalidataDirectoryContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "");
  const [walidataList, setWalidataList] = useState<Walidata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getWalidataList()
      .then((data) => {
        if (isMounted) setWalidataList(data || []);
      })
      .catch((err) => {
        console.error("[Walidata] Gagal memuat daftar walidata:", err);
        if (isMounted) setFetchError("Direktori walidata tidak dapat dimuat.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(window.location.search);
    if (value.trim()) params.set("q", value.trim());
    else params.delete("q");
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
  };

  const filteredList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return walidataList;
    return walidataList.filter(
      (w) =>
        w.nama.toLowerCase().includes(q) ||
        w.singkatan.toLowerCase().includes(q) ||
        (WALIDATA_METADATA[w.singkatan]?.kategori.toLowerCase().includes(q) ?? false)
    );
  }, [walidataList, searchQuery]);

  const totalPos = useMemo(
    () => walidataList.reduce((acc, w) => acc + (w.pos_count || 0), 0),
    [walidataList]
  );

  return (
    <>

      <main className="min-h-screen bg-page pb-16 text-[#1B2430]">
        <Container className="py-8 sm:py-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex items-center gap-1.5 text-[12px] font-medium text-[#5B6675]"
          >
            <Link href="/" className="hover:text-[#0B5CAD]">
              Beranda
            </Link>
            <ChevronRight aria-hidden="true" className="h-3 w-3 text-[#AEB8C5]" />
            <span className="text-[#1B2430]">Walidata</span>
          </nav>

          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">
                Walidata
              </p>
              <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-[#1B2430] sm:text-[26px]">
                Instansi pengelola data
              </h2>
              <p className="mt-1 text-[13px] text-[#5B6675]">
                {isLoading
                  ? "Memuat direktori…"
                  : `${walidataList.length} instansi · ${totalPos} pos pemantauan`}
              </p>
            </div>

            <label className="relative w-full sm:w-72">
              <span className="sr-only">Cari instansi</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A96A6]"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Cari instansi…"
                className="h-9 w-full rounded-[6px] border border-[#AEB8C5] bg-white pl-9 pr-8 text-[13px] text-[#1B2430] placeholder:text-[#8A96A6] focus:border-[#0B5CAD] focus:outline-none focus:ring-2 focus:ring-[#0B5CAD]/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  aria-label="Hapus pencarian"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-[#8A96A6] hover:text-[#1B2430]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : fetchError ? (
            <div className="rounded-[8px] border border-[#E88B84] bg-[#FBE3E1] p-5 text-[14px] text-[#8B1A12]">
              <p className="font-semibold">Data tidak dapat dimuat</p>
              <p className="mt-1.5">{fetchError}</p>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="rounded-[8px] border border-[#D5DBE3] bg-white p-8 text-center">
              <p className="text-[14px] font-semibold text-[#1B2430]">Instansi tidak ditemukan</p>
              <p className="mt-1 text-[13px] text-[#5B6675]">
                Tidak ada instansi yang cocok dengan &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="mt-4 inline-flex h-8 items-center rounded-[6px] border border-[#AEB8C5] bg-white px-3 text-[13px] font-medium text-[#1B2430] hover:bg-[#F0F3F7]"
              >
                Hapus pencarian
              </button>
            </div>
          ) : (
            <>
              {/* Desktop: tabel */}
              <div className="hidden overflow-hidden rounded-[8px] border border-[#D5DBE3] bg-white md:block">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-[#F5F7FA]">
                    <tr className="border-b border-[#D5DBE3] text-[12px] font-semibold uppercase tracking-[0.06em] text-[#5B6675]">
                      <th className="px-4 py-3">Instansi</th>
                      <th className="px-4 py-3">Kategori</th>
                      <th className="px-4 py-3 text-right">Pos</th>
                      <th className="px-4 py-3">Website</th>
                      <th className="px-4 py-3">Permintaan data</th>
                      <th className="px-4 py-3">Kontak</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map((w) => {
                      const meta = WALIDATA_METADATA[w.singkatan];
                      return (
                        <tr
                          key={w.id}
                          className="border-b border-[#E9EDF2] last:border-0 hover:bg-[#F8FAFC]"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <LogoBox w={w} />
                              <div className="min-w-0">
                                <p className="text-[14px] font-semibold leading-snug text-[#1B2430]">
                                  {w.nama}
                                </p>
                                <p className="text-[12px] text-[#5B6675]">{w.singkatan}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[13px] text-[#3D4756]">
                            {meta?.kategori ?? dash}
                          </td>
                          <td className="px-4 py-3 text-right text-[14px] font-semibold tabular-nums text-[#1B2430]">
                            {w.pos_count ?? 0}
                          </td>
                          <td className="px-4 py-3">
                            <ExtLink href={w.website_url}>Kunjungi</ExtLink>
                          </td>
                          <td className="px-4 py-3">
                            <ExtLink href={w.layanan_url}>Ajukan</ExtLink>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-0.5">
                              <ExtLink href={w.kontak_wa ? waUrl(w.kontak_wa, w.nama) : null}>
                                WhatsApp
                              </ExtLink>
                              {w.kontak_telp && (
                                <a
                                  href={`tel:${w.kontak_telp.replace(/[^0-9+]/g, "")}`}
                                  className="text-[12px] text-[#5B6675] hover:text-[#0B5CAD]"
                                >
                                  {w.kontak_telp}
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile: daftar ringkas */}
              <ul className="space-y-3 md:hidden">
                {filteredList.map((w) => {
                  const meta = WALIDATA_METADATA[w.singkatan];
                  return (
                    <li key={w.id} className="rounded-[8px] border border-[#D5DBE3] bg-white p-4">
                      <div className="flex items-start gap-3">
                        <LogoBox w={w} />
                        <div className="min-w-0 flex-1">
                          <p className="text-[14px] font-semibold leading-snug text-[#1B2430]">
                            {w.nama}
                          </p>
                          <p className="mt-0.5 text-[12px] text-[#5B6675]">
                            {meta?.kategori ?? w.singkatan} · {w.pos_count ?? 0} pos
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-[#E9EDF2] pt-3">
                        <ExtLink href={w.website_url}>Website</ExtLink>
                        <ExtLink href={w.layanan_url}>Permintaan data</ExtLink>
                        <ExtLink href={w.kontak_wa ? waUrl(w.kontak_wa, w.nama) : null}>
                          WhatsApp
                        </ExtLink>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          <section className="mt-8 rounded-[8px] border border-[#D5DBE3] bg-white p-5 sm:p-6">
            <h3 className="text-[16px] font-semibold text-[#1B2430]">Cara mendapatkan data</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-[14px] leading-relaxed text-[#3D4756] marker:font-semibold marker:text-[#5B6675]">
              <li>
                Data yang sudah terbuka dapat diunduh langsung melalui{" "}
                <Link href="/data-explorer" className="font-medium text-[#0B5CAD] hover:underline">
                  Unduh Data
                </Link>
                .
              </li>
              <li>
                Untuk data di luar portal, ajukan melalui tautan <em>Permintaan data</em> instansi
                yang mengelola pos tersebut.
              </li>
              <li>
                Pertanyaan teknis dapat disampaikan lewat kontak WhatsApp instansi. Untuk data
                bertanda tangan resmi, kirimkan surat permohonan melalui PPID instansi terkait.
              </li>
            </ol>
          </section>
        </Container>
      </main>
    </>
  );
}

/**
 * Hero dirender di luar Suspense agar ikut dikirim server; fallback berupa
 * kerangka tabel supaya tinggi halaman tidak melompat (CLS) saat konten
 * klien (yang membaca ?q=) selesai dimuat.
 */
export default function WalidataPage() {
  return (
    <>
      <DatasetHero
        kicker="Portal SIH3"
        title="Direktori Walidata"
        description="Instansi yang mengelola dan menyediakan data hidrologi, hidrometeorologi, dan hidrogeologi di Wilayah Sungai Serayu Opak dan Serayu Bogowonto."
      />
      <Suspense
        fallback={
          <main className="min-h-screen bg-page pb-16">
            <Container className="py-8 sm:py-10">
              <TableSkeleton />
            </Container>
          </main>
        }
      >
        <WalidataDirectoryContent />
      </Suspense>
    </>
  );
}
