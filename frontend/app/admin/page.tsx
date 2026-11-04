"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

interface StatsState {
  totalPos: number;
  hidrologiPos: number;
  hidrometeorologiPos: number;
  hidrogeologiPos: number;
  walidataCount: number;
  dokumenCount: number;
  pengukuranCount: number;
}

export default function AdminDashboardPage() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState<StatsState>({
    totalPos: 0,
    hidrologiPos: 0,
    hidrometeorologiPos: 0,
    hidrogeologiPos: 0,
    walidataCount: 0,
    dokumenCount: 0,
    pengukuranCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [resPos, resWalidata, resDokumen] = await Promise.all([
          axios.get(`${API_BASE_URL}/pos?per_page=100`),
          axios.get(`${API_BASE_URL}/walidata`),
          axios.get(`${API_BASE_URL}/dokumen?per_page=100`),
        ]);

        const allPos: Array<{ tipe?: string }> = resPos.data?.data || [];
        const totalPos = resPos.data?.meta?.total ?? allPos.length;

        const hidrologiPos = allPos.filter((p) => p.tipe === "hidrologi").length;
        const hidrometeorologiPos = allPos.filter((p) => p.tipe === "hidrometeorologi").length;
        const hidrogeologiPos = allPos.filter((p) => p.tipe === "hidrogeologi").length;

        const walidataCount = resWalidata.data?.data?.length || 0;
        const dokumenCount = resDokumen.data?.meta?.total ?? resDokumen.data?.data?.length ?? 0;

        let pengukuranTotal = 0;
        if (token) {
          try {
            const resPengukuran = await axios.get(`${API_BASE_URL}/pengukuran?per_page=1`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            pengukuranTotal = resPengukuran.data?.pagination?.total || 0;
          } catch {
            // Ignored
          }
        }

        setStats({
          totalPos,
          hidrologiPos,
          hidrometeorologiPos,
          hidrogeologiPos,
          walidataCount,
          dokumenCount,
          pengukuranCount: pengukuranTotal,
        });
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [token]);

  const fmt = (n: number) => (loading ? "…" : n.toLocaleString("id-ID"));

  const tiles = [
    { label: "Pos pemantauan", value: stats.totalPos, href: "/admin/pos", link: "Kelola pos" },
    { label: "Walidata", value: stats.walidataCount, href: "/admin/walidata", link: "Kelola walidata" },
    { label: "Dokumen publikasi", value: stats.dokumenCount, href: "/admin/dokumen", link: "Kelola dokumen" },
    { label: "Rekaman pengukuran", value: stats.pengukuranCount, href: "/admin/pengukuran", link: "Input & pantau" },
  ];

  const bidang = [
    { nama: "Hidrologi", ket: "Pos duga air & kualitas air", value: stats.hidrologiPos, href: "/hidrologi" },
    { nama: "Hidrometeorologi", ket: "Pos curah hujan & klimatologi", value: stats.hidrometeorologiPos, href: "/hidrometeorologi" },
    { nama: "Hidrogeologi", ket: "Sumur pantau air tanah", value: stats.hidrogeologiPos, href: "/hidrogeologi" },
  ];

  const card = "rounded-[8px] border border-[#D5DBE3] bg-white";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">Ringkasan</p>
          <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-[#1B2430] sm:text-[26px]">
            Selamat datang, {user?.name || "Administrator"}
          </h1>
          <p className="mt-1 text-[13px] text-[#5B6675]">
            Kelola pos, pengukuran, dokumen, dan walidata Portal SIH3 BBWS Serayu Opak.
          </p>
        </div>
        <Link
          href="/admin/pengukuran"
          className="inline-flex h-9 items-center rounded-[6px] border border-[#14396A] bg-[#14396A] px-4 text-[13px] font-semibold text-white hover:bg-[#0E2A4E]"
        >
          Input pengukuran
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className={`${card} p-4 sm:p-5`}>
            <p className="text-[12px] font-medium text-[#5B6675]">{t.label}</p>
            <p className="mt-1 text-[28px] font-semibold leading-tight tabular-nums text-[#1B2430]">{fmt(t.value)}</p>
            <Link href={t.href} className="mt-2 inline-block text-[13px] font-medium text-[#0B5CAD] hover:text-[#14396A] hover:underline">
              {t.link} &rarr;
            </Link>
          </div>
        ))}
      </div>

      <section className={card}>
        <div className="flex items-baseline justify-between gap-3 border-b border-[#D5DBE3] px-4 py-3 sm:px-5">
          <h2 className="text-[15px] font-semibold text-[#1B2430]">Pos per bidang</h2>
          <Link href="/admin/pos" className="text-[13px] font-medium text-[#0B5CAD] hover:underline">
            Lihat semua pos &rarr;
          </Link>
        </div>
        <ul className="divide-y divide-[#E9EDF2]">
          {bidang.map((b) => (
            <li key={b.nama} className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
              <div>
                <p className="text-[14px] font-semibold text-[#1B2430]">{b.nama}</p>
                <p className="text-[12px] text-[#5B6675]">{b.ket}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[20px] font-semibold tabular-nums text-[#1B2430]">{fmt(b.value)}</span>
                <Link
                  href={b.href}
                  target="_blank"
                  className="hidden text-[13px] font-medium text-[#0B5CAD] hover:underline sm:inline"
                >
                  Lihat di portal
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <section className={`${card} p-5`}>
          <h2 className="text-[15px] font-semibold text-[#1B2430]">Panduan singkat</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[14px] leading-relaxed text-[#3D4756] marker:font-semibold marker:text-[#5B6675]">
            <li>
              Tambah pos baru beserta koordinat dan jenis alat (AWLR / ARR / MAT) di{" "}
              <Link href="/admin/pos" className="font-medium text-[#0B5CAD] hover:underline">Pos Pemantauan</Link>.
            </li>
            <li>
              Catat TMA dan curah hujan, manual atau impor CSV, di{" "}
              <Link href="/admin/pengukuran" className="font-medium text-[#0B5CAD] hover:underline">Pengukuran</Link>.
            </li>
            <li>
              Unggah SOP, regulasi, atau laporan di{" "}
              <Link href="/admin/dokumen" className="font-medium text-[#0B5CAD] hover:underline">Dokumen</Link>.
            </li>
          </ol>
        </section>

        <section className={`${card} p-5`}>
          <h2 className="text-[15px] font-semibold text-[#1B2430]">Data walidata</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#3D4756]">
            Kontak WhatsApp dan tautan permintaan data tampil langsung di halaman Walidata publik.
            Periksa secara berkala agar tetap mutakhir.
          </p>
          <Link
            href="/admin/walidata"
            className="mt-4 inline-flex h-8 items-center rounded-[6px] border border-[#AEB8C5] bg-white px-3 text-[13px] font-medium text-[#1B2430] hover:bg-[#F0F3F7]"
          >
            Periksa walidata
          </Link>
        </section>
      </div>
    </div>
  );
}
