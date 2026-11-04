"use client";

import type React from "react";

import { use, useState } from "react";
import Link from "next/link";
import { Download, ExternalLink, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DatasetHero } from "@/components/dataset/DatasetHero";

type ItemBuletinDetail = {
  id: string;
  judul: string;
  subKategori?: string;
  tanggalFormat: string;
  tanggalBadge: string;
  gambar: string;
  pdf?: string;
  linkExternal?: string;
};

type KategoriData = {
  nama: string;
  deskripsi: string;
  edisi: ItemBuletinDetail[];
  edisiBMKGYogya?: ItemBuletinDetail[];
  edisiBMKGJateng?: ItemBuletinDetail[];
  edisiPerHalaman?: Record<
    number,
    {
      bbws?: ItemBuletinDetail[];
      bmkgYogya?: ItemBuletinDetail[];
      bmkgJateng?: ItemBuletinDetail[];
    }
  >;
};

const dataPerKategori: Record<string, KategoriData> = {
  hidrologi: {
    nama: "Hidrologi",
    deskripsi:
      "Infografis buletin hidrologi Wilayah Sungai Serayu Opak dari BBWS Serayu Opak dan mitra walidata.",
    edisi: [
      {
        id: "h1",
        judul:
          "Rekapitulasi Ketersediaan Air Setengah Bulan 16-30 September 2026",
        subKategori: "HIDROLOGI",
        tanggalFormat: "Senin, 05 Oktober 2026",
        tanggalBadge: "05 Oktober 2026",
        gambar: "/images/buletin/hidrologi/hidrologi-16-30-sept.jpg",
      },
      {
        id: "h2",
        judul: "Rekapitulasi Ketersediaan Air Setengah Bulan 1-15 September 2026",
        subKategori: "HIDROLOGI",
        tanggalFormat: "Rabu, 23 September 2026",
        tanggalBadge: "23 September 2026",
        gambar: "/images/buletin/hidrologi/hidrologi-1-15-sept.jpg",
      },
      {
        id: "h3",
        judul:
          "Rekapitulasi Ketersediaan Air Setengah Bulan 16 - 31 Agustus 2026",
        subKategori: "HIDROLOGI",
        tanggalFormat: "Selasa, 01 September 2026",
        tanggalBadge: "01 September 2026",
        gambar: "/images/buletin/hidrologi/hidrologi-16-31-agus.jpg",
      },
      {
        id: "h4",
        judul:
          "Rekapitulasi Ketersediaan Air Per-Setengah Bulan, 1-15 Agustus 2026",
        subKategori: "HIDROLOGI",
        tanggalFormat: "Selasa, 18 Agustus 2026",
        tanggalBadge: "18 Agustus 2026",
        gambar: "/images/buletin/hidrologi/hidrologi-1-15-agus.jpg",
      },
      {
        id: "h5",
        judul:
          "Rekapitulasi Ketersediaan Air Per-Setengah Bulan, 16-31 Juli 2026",
        subKategori: "HIDROLOGI",
        tanggalFormat: "Senin, 03 Agustus 2026",
        tanggalBadge: "03 Agustus 2026",
        gambar: "/images/buletin/hidrologi/hidrologi-16-31-juli.jpg",
      },
    ],
  },
  hidrometeorologi: {
    nama: "Hidrometeorologi",
    deskripsi:
      "Infografis buletin hidrometeorologi Wilayah Sungai Serayu Opak dari BBWS Serayu Opak dan mitra walidata.",
    edisi: [],
    edisiPerHalaman: {
      // HALAMAN 1
      1: {
        bbws: [
          {
            id: "hm1",
            judul: "Curah Hujan Dasarian 11 – 20 Oktober 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 21 Oktober 2026",
            tanggalBadge: "21 Oktober 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/dasarian-11-20-okt.jpg",
          },
          {
            id: "hm2",
            judul: "Curah Hujan Dasarian 1 – 10 Oktober 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 11 Oktober 2026",
            tanggalBadge: "11 Oktober 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/dasarian-1-10-okt.jpg",
          },
          {
            id: "hm3",
            judul: "Curah Hujan Dasarian 21 – 30 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 30 September 2026",
            tanggalBadge: "30 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/dasarian-21-30-sept.jpg",
          },
          {
            id: "hm4",
            judul: "Curah Hujan Harian 22 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 22 September 2026",
            tanggalBadge: "22 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/harian-22-sept.jpg",
          },
          {
            id: "hm5",
            judul: "Curah Hujan Dasarian 11 – 20 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 21 September 2026",
            tanggalBadge: "21 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/dasarian-11-20-sept.jpg",
          },
          {
            id: "hm6",
            judul: "Curah Hujan Harian 21 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 21 September 2026",
            tanggalBadge: "21 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/harian-21-sept.jpg",
          },
        ],
        bmkgYogya: [
          {
            id: "bmy_h1_1",
            judul: "Buletin Informasi Iklim Edisi September 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 30 September 2026",
            tanggalBadge: "30 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-iklim-september.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-1/bmkg-iklim-september.pdf",
          },
          {
            id: "bmy_h1_2",
            judul: "Buletin Prediksi Musim Hujan Tahun 2026–2027 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 30 September 2026",
            tanggalBadge: "30 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-prediksi-hujan-2026-2027.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-1/bmkg-prediksi-hujan-2026-2027.pdf",
          },
          {
            id: "bmy_h1_3",
            judul: "Buletin Prediksi Musim Kemarau 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 30 September 2026",
            tanggalBadge: "30 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-prediksi-kemarau-2026.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-1/bmkg-prediksi-kemarau-2026.pdf",
          },
          {
            id: "bmy_h1_4",
            judul: "Buletin Informasi Iklim Edisi Agustus 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 31 Agustus 2026",
            tanggalBadge: "31 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-iklim-agustus.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-1/bmkg-iklim-agustus.pdf",
          },
          {
            id: "bmy_h1_5",
            judul: "Prediksi Peluang Curah Hujan Dasarian Update 31 Juli 2026",
            subKategori: "PREDIKSI PELUANG CURAH HUJAN",
            tanggalFormat: "Selasa, 04 Agustus 2026",
            tanggalBadge: "04 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-peluang-hujan-31juli.png",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/08/04/prediksi-peluang-curah-hujan-dasarian-iii-20-juli-2026-2/",
          },
          {
            id: "bmy_h1_6",
            judul: "Prediksi Hujan Dasarian Update 31 Juli 2026",
            subKategori: "PRAKIRAAN CURAH HUJAN DASARIAN",
            tanggalFormat: "Selasa, 04 Agustus 2026",
            tanggalBadge: "04 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-prakiraan-hujan-31juli.png",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/08/04/prakiraan-curah-hujan-dasarian-ii-ferbruari-2024-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-3-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
        ],
        bmkgJateng: [
          {
            id: "bmj1",
            judul: "Monitoring Hari Tanpa Hujan Provinsi Jawa Tengah",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 11 Agustus 2026",
            tanggalBadge: "11 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-jateng-hth.png",
          },
          {
            id: "bmj2",
            judul:
              "Prediksi Curah Hujan wilayah Jawa Tengah bulan September 2026",
            subKategori: "PREDIKSI CURAH HUJAN 2 BULAN KEDEPAN",
            tanggalFormat: "Kamis, 30 Juli 2026",
            tanggalBadge: "30 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-jateng-hujan-september.webp",
            linkExternal: "https://staklim-jateng.bmkg.go.id/info-bulanan.php",
          },
          {
            id: "bmj3",
            judul:
              "Prediksi Curah Hujan wilayah Jawa Tengah bulan Oktober 2026",
            subKategori: "PREDIKSI CURAH HUJAN 3 BULAN KEDEPAN",
            tanggalFormat: "Kamis, 30 Juli 2026",
            tanggalBadge: "30 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-jateng-hujan-oktober.webp",
            linkExternal: "https://staklim-jateng.bmkg.go.id/info-bulanan.php",
          },
          {
            id: "bmj4",
            judul: "Analisis Curah Hujan wilayah Jawa Tengah bulan Juni 2026",
            subKategori: "ANALISIS CURAH HUJAN BULAN LALU",
            tanggalFormat: "Kamis, 30 Juli 2026",
            tanggalBadge: "30 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-jateng-hujan-juni.webp",
            linkExternal: "https://staklim-jateng.bmkg.go.id/info-bulanan.php",
          },
          {
            id: "bmj5",
            judul:
              "Prediksi Curah Hujan wilayah Jawa Tengah bulan Agustus 2026",
            subKategori: "PREDIKSI CURAH HUJAN 1 BULAN KEDEPAN",
            tanggalFormat: "Kamis, 30 Juli 2026",
            tanggalBadge: "30 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-jateng-hujan-agustus.webp",
            linkExternal: "https://staklim-jateng.bmkg.go.id/info-bulanan.php",
          },
          {
            id: "bmj6",
            judul:
              "Prediksi Probabilistik Curah Hujan Dasarian ke-3 Juli 2026",
            subKategori: "PREDIKSI PROBABILISTIK CURAH HUJAN",
            tanggalFormat: "Kamis, 30 Juli 2026",
            tanggalBadge: "30 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-1/bmkg-jateng-probabilistik-juli.webp",
            linkExternal: "https://staklim-jateng.bmkg.go.id/info-dasarian.php",
          },
        ],
      },
      // HALAMAN 2
      2: {
        bbws: [
          {
            id: "hm2_1",
            judul: "Curah Hujan Harian 20 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 20 September 2026",
            tanggalBadge: "20 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/harian-20-sept.jpg",
            pdf: "/documents/buletin/hidrometeorologi/hal-2/harian-20-sept.pdf",
          },
          {
            id: "hm2_2",
            judul: "Curah Hujan Harian 19 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 19 September 2026",
            tanggalBadge: "19 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/harian-19-sept.jpg",
          },
          {
            id: "hm2_3",
            judul: "Curah Hujan Harian 18 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 18 September 2026",
            tanggalBadge: "18 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/harian-18-sept.jpg",
          },
          {
            id: "hm2_4",
            judul: "Curah Hujan Harian 17 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 17 September 2026",
            tanggalBadge: "17 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/harian-17-sept.jpg",
          },
          {
            id: "hm2_5",
            judul: "Curah Hujan Harian 16 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 16 September 2026",
            tanggalBadge: "16 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/harian-16-sept.jpg",
          },
          {
            id: "hm2_6",
            judul: "Curah Hujan Harian 15 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 15 September 2026",
            tanggalBadge: "15 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/harian-15-sept.jpg",
          },
        ],
        bmkgYogya: [
          {
            id: "bmy1",
            judul: "Buletin Informasi Iklim Edisi Juli 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 31 Juli 2026",
            tanggalBadge: "31 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-2/bmkg-iklim-juli.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-2/harian-20-sept.pdf",
          },
          {
            id: "bmy2",
            judul: "Analisis Curah Hujan Harian 29 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Rabu, 29 Juli 2026",
            tanggalBadge: "29 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/bmkg-iklim-agustus.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/29/analisis-curah-hujan-harian-26-juli-2026-2-2-2/",
          },
          {
            id: "bmy3",
            judul: "Analisis Curah Hujan Harian 23 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Kamis, 23 Juli 2026",
            tanggalBadge: "23 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/bmkg-iklim-juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/23/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy4",
            judul: "Analisis Curah Hujan Harian 21 Juli 2026 #2",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Rabu, 22 Juli 2026",
            tanggalBadge: "22 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/bmkg-prediksi-hujan-2026-2027.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/22/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy5",
            judul: "Analisis Curah Hujan Harian 22 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Rabu, 22 Juli 2026",
            tanggalBadge: "22 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/bmkg-prediksi-kemarau-2026.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/22/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy6",
            judul:
              "Prediksi Peluang Curah Hujan Dasarian Update 20 Juli 2026 #2",
            subKategori: "PREDIKSI PELUANG CURAH HUJAN",
            tanggalFormat: "Senin, 20 Juli 2026",
            tanggalBadge: "20 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-2/bmkg-peluang-hujan-20juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/20/prediksi-peluang-curah-hujan-dasarian-30-juni-2026-2-2/",
          },
        ],
        bmkgJateng: [],
      },
      // HALAMAN 3
      3: {
        bbws: [
          {
            id: "hm3_1",
            judul: "Curah Hujan Harian 14 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 14 September 2026",
            tanggalBadge: "14 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/harian-14-sept.jpg",
          },
          {
            id: "hm3_2",
            judul: "Curah Hujan Harian 13 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 13 September 2026",
            tanggalBadge: "13 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/harian-13-sept.jpg",
          },
          {
            id: "hm3_3",
            judul: "Curah Hujan Harian 12 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 12 September 2026",
            tanggalBadge: "12 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/harian-12-sept.jpg",
          },
          {
            id: "hm3_4",
            judul: "Curah Hujan Harian 11 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 11 September 2026",
            tanggalBadge: "11 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/harian-11-sept.jpg",
          },
          {
            id: "hm3_5",
            judul: "Curah Hujan Harian 10 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 10 September 2026",
            tanggalBadge: "10 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/harian-10-sept.jpg",
          },
          {
            id: "hm3_6",
            judul: "Curah Hujan Harian 9 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 09 September 2026",
            tanggalBadge: "09 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/harian-9-sept.jpg",
          },
        ],
        bmkgYogya: [
          {
            id: "bmy3_1",
            judul: "Prediksi Hujan Dasarian Update 20 Juli 2026",
            subKategori: "PRAKIRAAN CURAH HUJAN DASARIAN",
            tanggalFormat: "Senin, 20 Juli 2026",
            tanggalBadge: "20 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/bmkg-prediksi-hujan-20juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/20/prakiraan-curah-hujan-dasarian-ii-ferbruari-2024-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-3-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy3_2",
            judul: "Monitoring Hari Tanpa Hujan Dasarian II Juli 2026",
            subKategori: "PETA HARI TANPA HUJAN",
            tanggalFormat: "Senin, 20 Juli 2026",
            tanggalBadge: "20 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/bmkg-hth-20juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/20/monitoring-hari-tanpa-hujan-dasarian-i-juni-2026-2-2-2/",
          },
          {
            id: "bmy3_3",
            judul: "Analisis Curah Hujan Harian 19 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Minggu, 19 Juli 2026",
            tanggalBadge: "19 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/bmkg-harian-19juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/19/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy3_4",
            judul: "Analisis Curah Hujan Harian 13 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Rabu, 13 Juli 2026",
            tanggalBadge: "13 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/bmkg-harian-13juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/13/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy3_5",
            judul: "Analisis Curah Hujan Dasarian I Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN DASARIAN",
            tanggalFormat: "Selasa, 12 Juli 2026",
            tanggalBadge: "12 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/bmkg-dasarian-1juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/12/analisis-curah-hujan-dasarian-i-juni-2026-2-2-2/",
          },
          {
            id: "bmy3_6",
            judul: "Analisis Curah Hujan Harian 12 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Selasa, 12 Juli 2026",
            tanggalBadge: "12 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-3/bmkg-harian-12juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/12/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
        ],
        bmkgJateng: [],
      },
      // HALAMAN 4
      4: {
        bbws: [
          {
            id: "hm4_1",
            judul: "Curah Hujan Harian 8 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 08 September 2026",
            tanggalBadge: "08 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/harian-8-sept.jpg",
          },
          {
            id: "hm4_2",
            judul: "Curah Hujan Harian 7 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 07 September 2026",
            tanggalBadge: "07 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/harian-7-sept.jpg",
          },
          {
            id: "hm4_3",
            judul: "Curah Hujan Harian 6 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 06 September 2026",
            tanggalBadge: "06 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/harian-6-sept.jpg",
          },
          {
            id: "hm4_4",
            judul: "Curah Hujan Harian 5 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 05 September 2026",
            tanggalBadge: "05 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/harian-5-sept.jpg",
          },
          {
            id: "hm4_5",
            judul: "Curah Hujan Harian 4 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 04 September 2026",
            tanggalBadge: "04 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/harian-4-sept.jpg",
          },
          {
            id: "hm4_6",
            judul: "Curah Hujan Harian 3 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 03 September 2026",
            tanggalBadge: "03 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/harian-3-sept.jpg",
          },
        ],
        bmkgYogya: [
          {
            id: "bmy4_1",
            judul: "Prediksi Peluang Curah Hujan Dasarian Update 10 Juli 2026",
            subKategori: "PREDIKSI PELUANG CURAH HUJAN",
            tanggalFormat: "Jumat, 10 Juli 2026",
            tanggalBadge: "10 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/bmkg-peluang-hujan-10juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/10/prediksi-peluang-curah-hujan-dasarian-30-juni-2026-2/",
          },
          {
            id: "bmy4_2",
            judul: "Monitoring Hari Tanpa Hujan Dasarian I Juli 2026",
            subKategori: "PETA HARI TANPA HUJAN",
            tanggalFormat: "Jumat, 10 Juli 2026",
            tanggalBadge: "10 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/bmkg-hth-10juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/10/monitoring-hari-tanpa-hujan-dasarian-i-juni-2026-2-2/",
          },
          {
            id: "bmy4_3",
            judul: "Prediksi Hujan Dasarian Update 10 Juli 2026",
            subKategori: "PRAKIRAAN CURAH HUJAN DASARIAN",
            tanggalFormat: "Jumat, 10 Juli 2026",
            tanggalBadge: "10 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/bmkg-prediksi-hujan-10juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/10/prakiraan-curah-hujan-dasarian-ii-ferbruari-2024-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-3-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy4_4",
            judul: "Analisis Curah Hujan Harian 10 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Jumat, 10 Juli 2026",
            tanggalBadge: "10 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/bmkg-harian-10juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/10/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy4_5",
            judul: "Analisis Curah Hujan Harian 08 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Rabu, 08 Juli 2026",
            tanggalBadge: "08 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/bmkg-harian-8juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/08/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy4_6",
            judul: "Analisis Curah Hujan Harian 06 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Senin, 06 Juli 2026",
            tanggalBadge: "06 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-4/bmkg-harian-6juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/06/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
        ],
        bmkgJateng: [],
      },
      // HALAMAN 5
      5: {
        bbws: [
          {
            id: "hm5_1",
            judul: "Curah Hujan Harian 2 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 02 September 2026",
            tanggalBadge: "02 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/harian-2-sept.jpg",
          },
          {
            id: "hm5_2",
            judul:
              "Rekapitulasi Ketersediaan Air Setengah Bulan 16 – 31 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 02 September 2026",
            tanggalBadge: "02 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/rekap-16-31-agus.jpg",
          },
          {
            id: "hm5_3",
            judul: "Curah Hujan Harian 1 September 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 01 September 2026",
            tanggalBadge: "01 September 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/harian-1-sept.jpg",
          },
          {
            id: "hm5_4",
            judul: "Curah Hujan Harian 31 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 31 Agustus 2026",
            tanggalBadge: "31 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/harian-31-agus.jpg",
          },
          {
            id: "hm5_5",
            judul:
              "Analisis Curah Hujan Bulanan Agustus 2026, Wilayah BBWS Serayu Opak",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 31 Agustus 2026",
            tanggalBadge: "31 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/bulanan-bbws-agustus.jpg",
          },
          {
            id: "hm5_6",
            judul:
              "Analisis Curah Hujan Bulanan Agustus 2026, Wilayah Daerah Istimewa Yogyakarta",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 31 Agustus 2026",
            tanggalBadge: "31 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/bulanan-diy-agustus.jpg",
          },
        ],
        bmkgYogya: [
          {
            id: "bmy5_1",
            judul: "Analisis Curah Hujan Harian 05 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Minggu, 05 Juli 2026",
            tanggalBadge: "05 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/bmkg-harian-5juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/05/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy5_2",
            judul: "Analisis Curah Hujan Harian 04 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Sabtu, 04 Juli 2026",
            tanggalBadge: "04 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/bmkg-harian-4juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/04/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy5_3",
            judul: "Analisis Curah Hujan Harian 03 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Jumat, 03 Juli 2026",
            tanggalBadge: "03 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/bmkg-harian-3juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/03/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy5_4",
            judul: "Analisis Curah Hujan Harian 01 Juli 2026",
            subKategori: "ANALISIS CURAH HUJAN HARIAN",
            tanggalFormat: "Rabu, 01 Juli 2026",
            tanggalBadge: "01 Juli 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/bmkg-harian-1juli.jpg",
            linkExternal:
              "https://staklim-yogya.bmkg.go.id/2026/07/01/analisis-curah-hujan-harian-18-juni-2026-2-2-2-2-2-2-2-2-2-2-2-2/",
          },
          {
            id: "bmy5_5",
            judul: "Buletin Informasi Iklim Edisi Juni 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 30 Juni 2026",
            tanggalBadge: "30 Juni 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/bmkg-iklim-juni.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-5/bmkg-iklim-juni.pdf",
          },
          {
            id: "bmy5_6",
            judul: "Buletin Informasi Iklim Edisi Mei 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 31 Mei 2026",
            tanggalBadge: "31 Mei 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-5/bmkg-iklim-mei.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-5/bmkg-iklim-mei.pdf",
          },
        ],
        bmkgJateng: [],
      },
      // HALAMAN 6
      6: {
        bbws: [
          {
            id: "hm6_1",
            judul: "Curah Hujan Harian 30 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 30 Agustus 2026",
            tanggalBadge: "30 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/harian-30-agus.jpg",
          },
          {
            id: "hm6_2",
            judul: "Curah Hujan Harian 29 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 29 Agustus 2026",
            tanggalBadge: "29 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/harian-29-agus.jpg",
          },
          {
            id: "hm6_3",
            judul: "Curah Hujan Harian 28 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 28 Agustus 2026",
            tanggalBadge: "28 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/harian-28-agus.jpg",
          },
          {
            id: "hm6_4",
            judul: "Curah Hujan Harian 27 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 27 Agustus 2026",
            tanggalBadge: "27 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/harian-27-agus.jpg",
          },
          {
            id: "hm6_5",
            judul: "Curah Hujan Harian 26 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 26 Agustus 2026",
            tanggalBadge: "26 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/harian-26-agus.jpg",
          },
          {
            id: "hm6_6",
            judul: "Curah Hujan Harian 25 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 25 Agustus 2026",
            tanggalBadge: "25 Agustus 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/harian-25-agus.jpg",
          },
        ],
        bmkgYogya: [
          {
            id: "bmy6_1",
            judul: "Buletin Informasi Iklim Edisi April 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 30 April 2026",
            tanggalBadge: "30 April 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/bmkg-iklim-april.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-6/bmkg-iklim-april.pdf",
          },
          {
            id: "bmy6_2",
            judul: "Buletin Informasi Iklim Edisi Maret 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 31 Maret 2026",
            tanggalBadge: "31 Maret 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/bmkg-iklim-maret.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-6/bmkg-iklim-maret.pdf",
          },
          {
            id: "bmy6_3",
            judul: "Buletin Informasi Iklim Edisi Februari 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 28 Februari 2026",
            tanggalBadge: "28 Februari 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/bmkg-iklim-februari.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-6/bmkg-iklim-februari.pdf",
          },
          {
            id: "bmy6_4",
            judul: "Buletin Informasi Iklim Edisi Januari 2026 DIY",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 31 Januari 2026",
            tanggalBadge: "31 Januari 2026",
            gambar:
              "/images/buletin/hidrometeorologi/hal-6/bmkg-iklim-januari.png",
            pdf: "/documents/buletin/hidrometeorologi/hal-6/bmkg-iklim-januari.pdf",
          },
        ],
        bmkgJateng: [],
      },
      // HALAMAN 7
      7: {
        bbws: [
          {
            id: "hm7_1",
            judul: "Curah Hujan Harian 24 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 24 Agustus 2026",
            tanggalBadge: "24 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-7/harian-24-agus.jpg",
          },
          {
            id: "hm7_2",
            judul: "Curah Hujan Harian 23 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 23 Agustus 2026",
            tanggalBadge: "23 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-7/harian-23-agus.jpg",
          },
          {
            id: "hm7_3",
            judul: "Curah Hujan Harian 22 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 22 Agustus 2026",
            tanggalBadge: "22 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-7/harian-22-agus.jpg",
          },
          {
            id: "hm7_4",
            judul: "Curah Hujan Harian 21 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 21 Agustus 2026",
            tanggalBadge: "21 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-7/harian-21-agus.jpg",
          },
          {
            id: "hm7_5",
            judul: "Curah Hujan Harian 20 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 20 Agustus 2026",
            tanggalBadge: "20 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-7/harian-20-agus.jpg",
          },
          {
            id: "hm7_6",
            judul: "Curah Hujan Harian 19 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 19 Agustus 2026",
            tanggalBadge: "19 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-7/harian-19-agus.jpg",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      // HALAMAN 8
      8: {
        bbws: [
          {
            id: "hm8_1",
            judul: "Curah Hujan Harian 18 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 18 Agustus 2026",
            tanggalBadge: "18 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-8/harian-18-agus.jpg",
          },
          {
            id: "hm8_2",
            judul: "Curah Hujan Harian 17 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 17 Agustus 2026",
            tanggalBadge: "17 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-8/harian-17-agus.jpg",
          },
          {
            id: "hm8_3",
            judul: "Curah Hujan Harian 16 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 16 Agustus 2026",
            tanggalBadge: "16 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-8/harian-16-agus.jpg",
          },
          {
            id: "hm8_4",
            judul: "Curah Hujan Harian 15 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 15 Agustus 2026",
            tanggalBadge: "15 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-8/harian-15-agus.jpg",
          },
          {
            id: "hm8_5",
            judul: "Curah Hujan Harian 14 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 14 Agustus 2026",
            tanggalBadge: "14 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-8/harian-14-agus.jpg",
          },
          {
            id: "hm8_6",
            judul: "Curah Hujan Harian 13 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 13 Agustus 2026",
            tanggalBadge: "13 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-8/harian-13-agus.jpg",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      // HALAMAN 9
      9: {
        bbws: [
          {
            id: "hm9_1",
            judul: "Curah Hujan Harian 12 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 12 Agustus 2026",
            tanggalBadge: "12 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-9/harian-12-agus.jpg",
          },
          {
            id: "hm9_2",
            judul: "Curah Hujan Harian 11 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 11 Agustus 2026",
            tanggalBadge: "11 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-9/harian-11-agus.jpg",
          },
          {
            id: "hm9_3",
            judul: "Curah Hujan Harian 10 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 10 Agustus 2026",
            tanggalBadge: "10 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-9/harian-10-agus.jpg",
          },
          {
            id: "hm9_4",
            judul: "Curah Hujan Harian 9 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 09 Agustus 2026",
            tanggalBadge: "09 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-9/harian-9-agus.jpg",
          },
          {
            id: "hm9_5",
            judul: "Curah Hujan Harian 8 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 08 Agustus 2026",
            tanggalBadge: "08 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-9/harian-8-agus.jpg",
          },
          {
            id: "hm9_6",
            judul: "Analisis Curah Hujan Bulanan Juli 2026, Wilayah DI Yogyakarta",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 31 Juli 2026",
            tanggalBadge: "31 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-9/bulanan-diy-juli.jpg",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      // HALAMAN 10
      10: {
        bbws: [
          {
            id: "hm10_1",
            judul: "Curah Hujan Harian 5 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 05 Agustus 2026",
            tanggalBadge: "05 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-10/harian-5-agus.jpg",
          },
          {
            id: "hm10_2",
            judul: "Curah Hujan Harian 4 Agustus 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 04 Agustus 2026",
            tanggalBadge: "04 Agustus 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-10/harian-4-agus.jpg",
          },
          {
            id: "hm10_3",
            judul: "Analisis Curah Hujan Bulanan Juli 2026, Wilayah BBWS Serayu Opak",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 31 Juli 2026",
            tanggalBadge: "31 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-10/bulanan-bbws-juli.jpg",
          },
          {
            id: "hm10_4",
            judul: "Curah Hujan Harian 31 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 31 Juli 2026",
            tanggalBadge: "31 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-10/harian-31-juli.jpg",
          },
          {
            id: "hm10_5",
            judul: "Curah Hujan Harian 30 Juli 2026 (2)",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 30 Juli 2026",
            tanggalBadge: "30 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-10/harian-30-juli-2.jpg",
          },
          {
            id: "hm10_6",
            judul: "Curah Hujan Harian 30 Juli 2026 (1)",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 30 Juli 2026",
            tanggalBadge: "30 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-10/harian-30-juli-1.jpg",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      // HALAMAN 11
      11: {
        bbws: [
          {
            id: "hm11_1",
            judul: "Curah Hujan Harian 29 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 29 Juli 2026",
            tanggalBadge: "29 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-11/harian-29-juli.jpg",
          },
          {
            id: "hm11_2",
            judul: "Curah Hujan Harian 28 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 28 Juli 2026",
            tanggalBadge: "28 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-11/harian-28-juli.jpg",
          },
          {
            id: "hm11_3",
            judul: "Curah Hujan Harian 27 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 27 Juli 2026",
            tanggalBadge: "27 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-11/harian-27-juli.jpg",
          },
          {
            id: "hm11_4",
            judul: "Curah Hujan Harian 26 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 26 Juli 2026",
            tanggalBadge: "26 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-11/harian-26-juli.jpg",
          },
          {
            id: "hm11_5",
            judul: "Curah Hujan Harian 25 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 25 Juli 2026",
            tanggalBadge: "25 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-11/harian-25-juli.jpg",
          },
          {
            id: "hm11_6",
            judul: "Curah Hujan Harian 24 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 24 Juli 2026",
            tanggalBadge: "24 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-11/harian-24-juli.jpg",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      // HALAMAN 12
      12: {
        bbws: [
          {
            id: "hm12_1",
            judul: "Curah Hujan Harian 23 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 23 Juli 2026",
            tanggalBadge: "23 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-12/harian-23-juli.jpg",
          },
          {
            id: "hm12_2",
            judul: "Curah Hujan Harian 22 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 22 Juli 2026",
            tanggalBadge: "22 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-12/harian-22-juli.jpg",
          },
          {
            id: "hm12_3",
            judul: "Curah Hujan Harian 21 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 21 Juli 2026",
            tanggalBadge: "21 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-12/harian-21-juli.jpg",
          },
          {
            id: "hm12_4",
            judul: "Curah Hujan Harian 20 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 20 Juli 2026",
            tanggalBadge: "20 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-12/harian-20-juli.jpg",
          },
          {
            id: "hm12_5",
            judul: "Curah Hujan Harian 19 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 19 Juli 2026",
            tanggalBadge: "19 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-12/harian-19-juli.jpg",
          },
          {
            id: "hm12_6",
            judul: "Curah Hujan Harian 18 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 18 Juli 2026",
            tanggalBadge: "18 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-12/harian-18-juli.jpg",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      // HALAMAN 13 (HARIAN 16 & 17 JULI MENGGUNAKAN .JPG)
      13: {
        bbws: [
          {
            id: "hm13_1",
            judul: "Curah Hujan Harian 17 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 17 Juli 2026",
            tanggalBadge: "17 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-13/harian-17-juli.jpg",
          },
          {
            id: "hm13_2",
            judul: "Curah Hujan Harian 16 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 16 Juli 2026",
            tanggalBadge: "16 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-13/harian-16-juli.jpg",
          },
          {
            id: "hm13_3",
            judul: "Curah Hujan Harian 15 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 15 Juli 2026",
            tanggalBadge: "15 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-13/harian-15-juli.png",
          },
          {
            id: "hm13_4",
            judul: "Curah Hujan Harian 14 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 14 Juli 2026",
            tanggalBadge: "14 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-13/harian-14-juli.png",
          },
          {
            id: "hm13_5",
            judul: "Curah Hujan Harian 13 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 13 Juli 2026",
            tanggalBadge: "13 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-13/harian-13-juli.png",
          },
          {
            id: "hm13_6",
            judul: "Curah Hujan Harian 12 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 12 Juli 2026",
            tanggalBadge: "12 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-13/harian-12-juli.png",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      // HALAMAN 14
      14: {
        bbws: [
          {
            id: "hm14_1",
            judul: "Curah Hujan Harian 11 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 11 Juli 2026",
            tanggalBadge: "11 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-14/harian-11-juli.png",
          },
          {
            id: "hm14_2",
            judul: "Curah Hujan Harian 10 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 10 Juli 2026",
            tanggalBadge: "10 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-14/harian-10-juli.png",
          },
          {
            id: "hm14_3",
            judul: "Curah Hujan Harian 9 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 09 Juli 2026",
            tanggalBadge: "09 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-14/harian-9-juli.png",
          },
          {
            id: "hm14_4",
            judul: "Curah Hujan Harian 8 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Rabu, 08 Juli 2026",
            tanggalBadge: "08 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-14/harian-8-juli.png",
          },
          {
            id: "hm14_5",
            judul: "Curah Hujan Harian 7 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 07 Juli 2026",
            tanggalBadge: "07 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-14/harian-7-juli.png",
          },
          {
            id: "hm14_6",
            judul: "Curah Hujan Harian 6 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Senin, 06 Juli 2026",
            tanggalBadge: "06 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-14/harian-6-juli.png",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      // HALAMAN 15
      15: {
        bbws: [
          {
            id: "hm15_1",
            judul: "Curah Hujan Harian 5 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Minggu, 05 Juli 2026",
            tanggalBadge: "05 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-15/harian-5-juli.png",
          },
          {
            id: "hm15_2",
            judul: "Curah Hujan Harian 4 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Sabtu, 04 Juli 2026",
            tanggalBadge: "04 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-15/harian-4-juli.png",
          },
          {
            id: "hm15_3",
            judul: "Curah Hujan Harian 3 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Jumat, 03 Juli 2026",
            tanggalBadge: "03 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-15/harian-3-juli.png",
          },
          {
            id: "hm15_4",
            judul: "Curah Hujan Harian 2 Juli 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Kamis, 02 Juli 2026",
            tanggalBadge: "02 Juli 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-15/harian-2-juli.png",
          },
          {
            id: "hm15_5",
            judul: "Curah Hujan Harian 30 Juni 2026",
            subKategori: "HIDROMETEOROLOGI",
            tanggalFormat: "Selasa, 30 Juni 2026",
            tanggalBadge: "30 Juni 2026",
            gambar: "/images/buletin/hidrometeorologi/hal-15/harian-30-juni.png",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
    },
  },
  hidrogeologi: {
    nama: "Hidrogeologi",
    deskripsi:
      "Infografis buletin hidrogeologi Wilayah Sungai Serayu Opak dari BBWS Serayu Opak dan mitra walidata.",
    edisi: [],
  },
  kejadian: {
    nama: "Kejadian Lainnya",
    deskripsi:
      "Infografis buletin kejadian lainnya Wilayah Sungai Serayu Opak dari BBWS Serayu Opak dan mitra walidata.",
    edisi: [
      {
        id: "k1",
        judul: "Buletin Kekeringan Dasarian II September",
        subKategori: "KEJADIAN LAINNYA",
        tanggalFormat: "Rabu, 23 September 2026",
        tanggalBadge: "23 September 2026",
        gambar: "/images/buletin/kejadian/kejadian-23-sept.png",
        pdf: "/documents/buletin/kejadian/kejadian-23-sept.pdf",
      },
      {
        id: "k2",
        judul: "Buletin kekeringan Dasarian I September-3",
        subKategori: "KEJADIAN LAINNYA",
        tanggalFormat: "Senin, 21 September 2026",
        tanggalBadge: "21 September 2026",
        gambar: "/images/buletin/kejadian/kejadian-21-sept.png",
        pdf: "/documents/buletin/kejadian/kejadian-21-sept.pdf",
      },
      {
        id: "k3",
        judul: "Buletin Kekeringan Dasarian III",
        subKategori: "KEJADIAN LAINNYA",
        tanggalFormat: "Rabu, 02 September 2026",
        tanggalBadge: "02 September 2026",
        gambar: "/images/buletin/kejadian/kejadian-2-sept.png",
        pdf: "/documents/buletin/kejadian/kejadian-2-sept.pdf",
      },
      {
        id: "k4",
        judul: "Overview Kekeringan Pertanian BBWS Serayu Opak",
        subKategori: "KEJADIAN LAINNYA",
        tanggalFormat: "Senin, 24 Agustus 2026",
        tanggalBadge: "24 Agustus 2026",
        gambar: "/images/buletin/kejadian/overview-kekeringan-24-agus.png",
        pdf: "/documents/buletin/kejadian/overview-kekeringan-24-agus.pdf",
      },
    ],
  },
  elnino: {
    nama: "El Nino",
    deskripsi:
      "Infografis buletin laporan satgas El Nino Wilayah Sungai Serayu Opak dari BBWS Serayu Opak dan mitra walidata.",
    edisi: [],
    edisiPerHalaman: {
      1: {
        bbws: [
          {
            id: "e1_1",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Selasa, 20 Oktober 2026",
            tanggalBadge: "20 Oktober 2026",
            gambar: "/images/buletin/elnino/hal-1/elnino-20-okt.png",
            pdf: "/documents/buletin/elnino/hal-1/elnino-20-okt.pdf",
          },
          {
            id: "e1_2",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Senin, 19 Oktober 2026",
            tanggalBadge: "19 Oktober 2026",
            gambar: "/images/buletin/elnino/hal-1/elnino-19-okt.png",
            pdf: "/documents/buletin/elnino/hal-1/elnino-19-okt.pdf",
          },
          {
            id: "e1_3",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Minggu, 18 Oktober 2026",
            tanggalBadge: "18 Oktober 2026",
            gambar: "/images/buletin/elnino/hal-1/elnino-18-okt.png",
            pdf: "/documents/buletin/elnino/hal-1/elnino-18-okt.pdf",
          },
          {
            id: "e1_4",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Sabtu, 17 Oktober 2026",
            tanggalBadge: "17 Oktober 2026",
            gambar: "/images/buletin/elnino/hal-1/elnino-17-okt.png",
            pdf: "/documents/buletin/elnino/hal-1/elnino-17-okt.pdf",
          },
          {
            id: "e1_5",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Jumat, 16 Oktober 2026",
            tanggalBadge: "16 Oktober 2026",
            gambar: "/images/buletin/elnino/hal-1/elnino-16-okt.png",
            pdf: "/documents/buletin/elnino/hal-1/elnino-16-okt.pdf",
          },
          {
            id: "e1_6",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Kamis, 15 Oktober 2026",
            tanggalBadge: "15 Oktober 2026",
            gambar: "/images/buletin/elnino/hal-1/elnino-15-okt.png",
            pdf: "/documents/buletin/elnino/hal-1/elnino-15-okt.pdf",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      2: {
        bbws: [
          {
            id: "e2_1",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Kamis, 17 September 2026",
            tanggalBadge: "17 September 2026",
            gambar: "/images/buletin/elnino/hal-2/elnino-17-sept.png",
            pdf: "/documents/buletin/elnino/hal-2/elnino-17-sept.pdf",
          },
          {
            id: "e2_2",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Rabu, 16 September 2026",
            tanggalBadge: "16 September 2026",
            gambar: "/images/buletin/elnino/hal-2/elnino-16-sept.png",
            pdf: "/documents/buletin/elnino/hal-2/elnino-16-sept.pdf",
          },
          {
            id: "e2_3",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Selasa, 15 September 2026",
            tanggalBadge: "15 September 2026",
            gambar: "/images/buletin/elnino/hal-2/elnino-15-sept.png",
            pdf: "/documents/buletin/elnino/hal-2/elnino-15-sept.pdf",
          },
          {
            id: "e2_4",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Senin, 14 September 2026",
            tanggalBadge: "14 September 2026",
            gambar: "/images/buletin/elnino/hal-2/elnino-14-sept.png",
            pdf: "/documents/buletin/elnino/hal-2/elnino-14-sept.pdf",
          },
          {
            id: "e2_5",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Minggu, 13 September 2026",
            tanggalBadge: "13 September 2026",
            gambar: "/images/buletin/elnino/hal-2/elnino-13-sept.png",
            pdf: "/documents/buletin/elnino/hal-2/elnino-13-sept.pdf",
          },
          {
            id: "e2_6",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Sabtu, 12 September 2026",
            tanggalBadge: "12 September 2026",
            gambar: "/images/buletin/elnino/hal-2/elnino-12-sept.png",
            pdf: "/documents/buletin/elnino/hal-2/elnino-12-sept.pdf",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      3: {
        bbws: [
          {
            id: "e3_1",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Jumat, 11 September 2026",
            tanggalBadge: "11 September 2026",
            gambar: "/images/buletin/elnino/hal-3/elnino-11-sept.png",
            pdf: "/documents/buletin/elnino/hal-3/elnino-11-sept.pdf",
          },
          {
            id: "e3_2",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Kamis, 10 September 2026",
            tanggalBadge: "10 September 2026",
            gambar: "/images/buletin/elnino/hal-3/elnino-10-sept.png",
            pdf: "/documents/buletin/elnino/hal-3/elnino-10-sept.pdf",
          },
          {
            id: "e3_3",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Rabu, 09 September 2026",
            tanggalBadge: "09 September 2026",
            gambar: "/images/buletin/elnino/hal-3/elnino-09-sept.png",
            pdf: "/documents/buletin/elnino/hal-3/elnino-09-sept.pdf",
          },
          {
            id: "e3_4",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Selasa, 08 September 2026",
            tanggalBadge: "08 September 2026",
            gambar: "/images/buletin/elnino/hal-3/elnino-08-sept.png",
            pdf: "/documents/buletin/elnino/hal-3/elnino-08-sept.pdf",
          },
          {
            id: "e3_5",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Senin, 07 September 2026",
            tanggalBadge: "07 September 2026",
            gambar: "/images/buletin/elnino/hal-3/elnino-07-sept.png",
            pdf: "/documents/buletin/elnino/hal-3/elnino-07-sept.pdf",
          },
          {
            id: "e3_6",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Minggu, 06 September 2026",
            tanggalBadge: "06 September 2026",
            gambar: "/images/buletin/elnino/hal-3/elnino-06-sept.png",
            pdf: "/documents/buletin/elnino/hal-3/elnino-06-sept.pdf",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      4: {
        bbws: [
          {
            id: "e4_1",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Sabtu, 05 September 2026",
            tanggalBadge: "05 September 2026",
            gambar: "/images/buletin/elnino/hal-4/elnino-05-sept.png",
            pdf: "/documents/buletin/elnino/hal-4/elnino-05-sept.pdf",
          },
          {
            id: "e4_2",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Jumat, 04 September 2026",
            tanggalBadge: "04 September 2026",
            gambar: "/images/buletin/elnino/hal-4/elnino-04-sept.png",
            pdf: "/documents/buletin/elnino/hal-4/elnino-04-sept.pdf",
          },
          {
            id: "e4_3",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Kamis, 03 September 2026",
            tanggalBadge: "03 September 2026",
            gambar: "/images/buletin/elnino/hal-4/elnino-03-sept.png",
            pdf: "/documents/buletin/elnino/hal-4/elnino-03-sept.pdf",
          },
          {
            id: "e4_4",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Rabu, 02 September 2026",
            tanggalBadge: "02 September 2026",
            gambar: "/images/buletin/elnino/hal-4/elnino-02-sept.png",
            pdf: "/documents/buletin/elnino/hal-4/elnino-02-sept.pdf",
          },
          {
            id: "e4_5",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Selasa, 01 September 2026",
            tanggalBadge: "01 September 2026",
            gambar: "/images/buletin/elnino/hal-4/elnino-01-sept.png",
            pdf: "/documents/buletin/elnino/hal-4/elnino-01-sept.pdf",
          },
          {
            id: "e4_6",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Senin, 31 Agustus 2026",
            tanggalBadge: "31 Agustus 2026",
            gambar: "/images/buletin/elnino/hal-4/elnino-31-agus.png",
            pdf: "/documents/buletin/elnino/hal-4/elnino-31-agus.pdf",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
      5: {
        bbws: [
          {
            id: "e5_1",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Minggu, 30 Agustus 2026",
            tanggalBadge: "30 Agustus 2026",
            gambar: "/images/buletin/elnino/hal-5/elnino-30-agus.png",
            pdf: "/documents/buletin/elnino/hal-5/elnino-30-agus.pdf",
          },
          {
            id: "e5_2",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Sabtu, 29 Agustus 2026",
            tanggalBadge: "29 Agustus 2026",
            gambar: "/images/buletin/elnino/hal-5/elnino-29-agus.png",
            pdf: "/documents/buletin/elnino/hal-5/elnino-29-agus.pdf",
          },
          {
            id: "e5_3",
            judul: "LAPORAN SATGAS ANTISIPASI DAN PENANGANAN EL NINO",
            subKategori: "EL NINO",
            tanggalFormat: "Jumat, 28 Agustus 2026",
            tanggalBadge: "28 Agustus 2026",
            gambar: "/images/buletin/elnino/hal-5/elnino-28-agus.png",
            pdf: "/documents/buletin/elnino/hal-5/elnino-28-agus.pdf",
          },
        ],
        bmkgYogya: [],
        bmkgJateng: [],
      },
    },
  },
};

export default function SubBuletinPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const categoryParam = resolvedParams?.category ?? "";
  const key = categoryParam.toLowerCase();

  const info = dataPerKategori[key] || {
    nama: categoryParam || "Buletin",
    deskripsi:
      "Infografis buletin Wilayah Sungai Serayu Opak dari BBWS Serayu Opak dan mitra walidata.",
    edisi: [],
  };

  const [selectedEdisi, setSelectedEdisi] = useState<ItemBuletinDetail | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const hasPagination =
    (key === "hidrometeorologi" || key === "elnino") && !!info.edisiPerHalaman;

  const currentDataHalaman = info.edisiPerHalaman?.[currentPage] || {
    bbws: [],
    bmkgYogya: [],
    bmkgJateng: [],
  };

  const listBBWS = hasPagination
    ? currentDataHalaman.bbws || []
    : info.edisi;
  const listBMKGYogya = hasPagination
    ? currentDataHalaman.bmkgYogya || []
    : info.edisiBMKGYogya || [];
  const listBMKGJateng = hasPagination
    ? currentDataHalaman.bmkgJateng || []
    : info.edisiBMKGJateng || [];

  const totalPages =
    key === "hidrometeorologi" ? 15 : key === "elnino" ? 5 : 1;

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <>
      <DatasetHero
        kicker="Galeri"
        title={`Buletin ${info.nama}`}
        description={info.deskripsi}
      />
    <main className="min-h-screen bg-page pb-16">
      <Container as="section" className="py-8 sm:py-10">
        <div className="mb-6">
          <Link
            href="/galeri/buletin"
            className="mb-4 inline-flex items-center gap-2 text-[13px] font-medium text-[#5B6675] hover:text-[#0B5CAD]"
          >
            &larr; Kembali ke Semua Buletin
          </Link>
          <div className="mt-2">
            <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-[#1B2430] sm:text-[26px]">
              Edisi {info.nama.toLowerCase()}
            </h2>
            <p className="mt-1 text-[13px] text-[#5B6675]">
              Klik infografis untuk melihat ukuran penuh dan mengunduhnya.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-[#D5DBE3] pb-4">
          <Link
            href="/galeri/buletin"
            className="inline-flex h-8 items-center rounded-full border border-[#AEB8C5] bg-white px-3 text-[13px] font-medium text-[#1B2430] hover:border-[#14396A] hover:text-[#14396A]"
          >
            Semua
          </Link>
          <Link
            href="/galeri/buletin/hidrologi"
            className={`inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium ${
              key === "hidrologi"
                ? "border border-[#14396A] bg-[#14396A] text-white"
                : "border border-[#AEB8C5] bg-white text-[#1B2430] hover:border-[#14396A] hover:text-[#14396A]"
            }`}
          >
            Hidrologi
          </Link>
          <Link
            href="/galeri/buletin/hidrometeorologi"
            className={`inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium ${
              key === "hidrometeorologi"
                ? "border border-[#14396A] bg-[#14396A] text-white"
                : "border border-[#AEB8C5] bg-white text-[#1B2430] hover:border-[#14396A] hover:text-[#14396A]"
            }`}
          >
            Hidrometeorologi
          </Link>
          <Link
            href="/galeri/buletin/hidrogeologi"
            className={`inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium ${
              key === "hidrogeologi"
                ? "border border-[#14396A] bg-[#14396A] text-white"
                : "border border-[#AEB8C5] bg-white text-[#1B2430] hover:border-[#14396A] hover:text-[#14396A]"
            }`}
          >
            Hidrogeologi
          </Link>
          <Link
            href="/galeri/buletin/kejadian"
            className={`inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium ${
              key === "kejadian"
                ? "border border-[#14396A] bg-[#14396A] text-white"
                : "border border-[#AEB8C5] bg-white text-[#1B2430] hover:border-[#14396A] hover:text-[#14396A]"
            }`}
          >
            Kejadian Lainnya
          </Link>
          <Link
            href="/galeri/buletin/elnino"
            className={`inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium ${
              key === "elnino"
                ? "border border-[#14396A] bg-[#14396A] text-white"
                : "border border-[#AEB8C5] bg-white text-[#1B2430] hover:border-[#14396A] hover:text-[#14396A]"
            }`}
          >
            El Nino
          </Link>
        </div>

        {/* SECTION 1: BBWS SERAYU OPAK */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">BBWS Serayu Opak</h3>
          <span className="text-xs font-medium text-slate-500">
            {listBBWS.length} edisi
          </span>
        </div>

        {listBBWS.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listBBWS.map((item, index) => (
              <div
                key={item.id}
                data-reveal
                style={{ "--reveal-delay": `${Math.min(index, 5) * 50}ms` } as React.CSSProperties}
                className="flex flex-col justify-between rounded-[8px] border border-[#D5DBE3] bg-white p-4 transition-all hover:border-[#AEB8C5] hover:shadow-[0_2px_10px_rgba(14,42,78,0.08)]"
              >
                <div
                  onClick={() => setSelectedEdisi(item)}
                  className="group relative flex h-80 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.gambar}
                    alt={item.judul}
                    className="max-h-full max-w-full rounded object-contain shadow-sm transition duration-300 group-hover:scale-105"
                  />
                  <button className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white shadow backdrop-blur-sm transition hover:bg-slate-900">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                      />
                    </svg>
                    Perbesar
                  </button>
                </div>

                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">
                      {item.subKategori || info.nama}
                    </span>
                    <h4
                      onClick={() => setSelectedEdisi(item)}
                      className="mt-1 line-clamp-2 cursor-pointer text-sm font-semibold leading-snug text-[#1B2430] hover:text-[#0B5CAD]"
                    >
                      {item.judul}
                    </h4>
                  </div>

                  <div className="mt-4 flex items-center gap-4 pt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg
                        className="h-3.5 w-3.5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {item.tanggalBadge}
                    </span>
                    <button
                      onClick={() => setSelectedEdisi(item)}
                      className="flex items-center gap-1 font-semibold text-slate-700 hover:text-[#0B5CAD]"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Unduh
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm font-medium text-slate-400">
              Belum ada edisi buletin untuk halaman ini.
            </p>
          </div>
        )}

        {/* SECTION 2: STASIUN KLIMATOLOGI DI YOGYAKARTA */}
        {listBMKGYogya.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 flex items-center justify-between border-t border-slate-200 pt-8">
              <h3 className="text-xl font-bold text-slate-900">
                Stasiun Klimatologi DI Yogyakarta
              </h3>
              <span className="text-xs font-medium text-slate-500">
                {listBMKGYogya.length} edisi
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listBMKGYogya.map((item, index) => (
                <div
                  key={item.id}
                  data-reveal
                  style={{ "--reveal-delay": `${Math.min(index, 5) * 50}ms` } as React.CSSProperties}
                  className="flex flex-col justify-between rounded-[8px] border border-[#D5DBE3] bg-white p-4 transition-all hover:border-[#AEB8C5] hover:shadow-[0_2px_10px_rgba(14,42,78,0.08)]"
                >
                  <div
                    onClick={() => setSelectedEdisi(item)}
                    className="group relative flex h-80 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="max-h-full max-w-full rounded object-contain shadow-sm transition duration-300 group-hover:scale-105"
                    />
                    <button className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white shadow backdrop-blur-sm transition hover:bg-slate-900">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                      Perbesar
                    </button>
                  </div>

                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">
                        {item.subKategori || info.nama}
                      </span>
                      <h4
                        onClick={() => setSelectedEdisi(item)}
                        className="mt-1 line-clamp-2 cursor-pointer text-sm font-semibold leading-snug text-[#1B2430] hover:text-[#0B5CAD]"
                      >
                        {item.judul}
                      </h4>
                    </div>

                    <div className="mt-4 flex items-center gap-4 pt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-3.5 w-3.5 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {item.tanggalBadge}
                      </span>
                      <button
                        onClick={() => setSelectedEdisi(item)}
                        className="flex items-center gap-1 font-semibold text-slate-700 hover:text-[#0B5CAD]"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Unduh
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: STASIUN KLIMATOLOGI JAWA TENGAH */}
        {listBMKGJateng.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 flex items-center justify-between border-t border-slate-200 pt-8">
              <h3 className="text-xl font-bold text-slate-900">
                Stasiun Klimatologi Jawa Tengah
              </h3>
              <span className="text-xs font-medium text-slate-500">
                {listBMKGJateng.length} edisi
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listBMKGJateng.map((item, index) => (
                <div
                  key={item.id}
                  data-reveal
                  style={{ "--reveal-delay": `${Math.min(index, 5) * 50}ms` } as React.CSSProperties}
                  className="flex flex-col justify-between rounded-[8px] border border-[#D5DBE3] bg-white p-4 transition-all hover:border-[#AEB8C5] hover:shadow-[0_2px_10px_rgba(14,42,78,0.08)]"
                >
                  <div
                    onClick={() => setSelectedEdisi(item)}
                    className="group relative flex h-80 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-slate-100 p-2"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="max-h-full max-w-full rounded object-contain shadow-sm transition duration-300 group-hover:scale-105"
                    />
                    <button className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-md bg-slate-900/80 px-3 py-1.5 text-xs font-medium text-white shadow backdrop-blur-sm transition hover:bg-slate-900">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                      Perbesar
                    </button>
                  </div>

                  <div className="mt-4 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">
                        {item.subKategori || info.nama}
                      </span>
                      <h4
                        onClick={() => setSelectedEdisi(item)}
                        className="mt-1 line-clamp-2 cursor-pointer text-sm font-semibold leading-snug text-[#1B2430] hover:text-[#0B5CAD]"
                      >
                        {item.judul}
                      </h4>
                    </div>

                    <div className="mt-4 flex items-center gap-4 pt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <svg
                          className="h-3.5 w-3.5 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {item.tanggalBadge}
                      </span>
                      <button
                        onClick={() => setSelectedEdisi(item)}
                        className="flex items-center gap-1 font-semibold text-slate-700 hover:text-[#0B5CAD]"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Unduh
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {hasPagination && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? "bg-[#14396A] text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-200 transition"
              title="Halaman Selanjutnya"
            >
              &gt;
            </button>
          </div>
        )}
      </Container>

      {/* MODAL POP-UP */}
      {selectedEdisi && (
        <div
          onClick={() => setSelectedEdisi(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2140]/70 p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedEdisi.judul}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[8px] bg-white"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#D5DBE3] px-4 py-3">
              <div className="min-w-0">
                <h3 className="text-[14px] font-semibold leading-snug text-[#1B2430]">
                  {selectedEdisi.judul}
                </h3>
                <p className="mt-0.5 text-[12px] text-[#5B6675]">
                  {selectedEdisi.subKategori || info.nama} · {selectedEdisi.tanggalFormat}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEdisi(null)}
                aria-label="Tutup pratinjau"
                className="shrink-0 rounded-[6px] p-1.5 text-[#5B6675] hover:bg-[#F0F3F7] hover:text-[#1B2430]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-[#F5F7FA] p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedEdisi.gambar}
                alt={selectedEdisi.judul}
                className="mx-auto max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t border-[#D5DBE3] px-4 py-3">
              {selectedEdisi.linkExternal && (
                <a
                  href={selectedEdisi.linkExternal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-[#AEB8C5] bg-white px-3 text-[13px] font-medium text-[#1B2430] hover:bg-[#F0F3F7]"
                >
                  Kunjungi halaman
                  <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              )}
              {selectedEdisi.pdf && (
                <a
                  href={selectedEdisi.pdf}
                  download
                  className="inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-[#AEB8C5] bg-white px-3 text-[13px] font-medium text-[#1B2430] hover:bg-[#F0F3F7]"
                >
                  Unduh PDF
                </a>
              )}
              <a
                href={selectedEdisi.gambar}
                download
                className="inline-flex h-8 items-center gap-1.5 rounded-[6px] border border-[#14396A] bg-[#14396A] px-3 text-[13px] font-semibold text-white hover:bg-[#0E2A4E]"
              >
                <Download aria-hidden="true" className="h-3.5 w-3.5" />
                Unduh gambar
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}
