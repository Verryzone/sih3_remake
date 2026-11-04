"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { DatasetHero } from "@/components/dataset/DatasetHero";

/**
 * Foto dummy dari internet saat file lokal belum tersedia.
 * Seed diambil dari path sehingga foto yang sama selalu muncul untuk path yang sama.
 * Begitu file asli ditaruh di public/images/album/..., foto asli yang tampil.
 */
function gantiKeDummy(img: HTMLImageElement) {
  // Sudah dummy (atau dummy pun gagal): berhenti agar tidak berulang.
  if (img.src.includes("picsum.photos")) return;
  const seed = (img.getAttribute("src") || "sih3").replace(/[^a-z0-9]/gi, "-");
  img.src = `https://picsum.photos/seed/${seed}/1200/800`;
}

function pakaiFotoDummy(e: React.SyntheticEvent<HTMLImageElement>) {
  gantiKeDummy(e.currentTarget);
}

/** Menangkap gambar yang sudah gagal dimuat sebelum React aktif (hydration). */
function cekFotoRusak(img: HTMLImageElement | null) {
  if (img && img.complete && img.naturalWidth === 0) gantiKeDummy(img);
}

// Tipe data item kegiatan
type ItemAlbum = {
  id: string;
  judul: string;
  kategori: "ACARA" | "LAPANGAN";
  tanggalFormat: string;
  subTanggalFormat: string;
  deskripsi: string;
  gambarCover: string;
  galeriGambar: string[];
  lokasi?: string;
  youtubeUrl?: string;
};

// ============================================================================
// DATA KATEGORI "ACARA" (FOLDER public/images/album/acara/kegiatan-1 s.d. 9)
// ============================================================================
const dataAcaraHal1: ItemAlbum[] = [
  {
    id: "acara-kegiatan-1",
    judul: "Rapat Audit Internal Sertifikasi ISO",
    kategori: "ACARA",
    tanggalFormat: "26 OKTOBER 2026",
    subTanggalFormat: "Acara – Senin, 26 Oktober 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan Rapat Audit Internal Sertifikasi ISO sebagai bentuk komitmen dalam menjaga kualitas dan standar operasional pengelolaan data sumber daya air.",
    gambarCover: "/images/album/acara/kegiatan-1/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-1/cover.jpg",
      "/images/album/acara/kegiatan-1/1.jpg",
      "/images/album/acara/kegiatan-1/2.jpg",
      "/images/album/acara/kegiatan-1/3.jpg",
      "/images/album/acara/kegiatan-1/4.jpg",
      "/images/album/acara/kegiatan-1/5.jpg",
    ],
  },
  {
    id: "acara-kegiatan-2",
    judul: "Rapat Diseminasi Data Kualitas Air Tahun 2026",
    kategori: "ACARA",
    tanggalFormat: "08 SEPTEMBER 2026",
    subTanggalFormat: "Acara – Selasa, 08 September 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan Rapat Diseminasi Data Kualitas Air Tahun 2026 sebagai forum penyampaian hasil pemantauan dan evaluasi kondisi kualitas air di wilayah kerja BBWS Serayu Opak. Kegiatan ini menjadi bagian dari upaya mendukung penyediaan informasi.",
    gambarCover: "/images/album/acara/kegiatan-2/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-2/cover.jpg",
      "/images/album/acara/kegiatan-2/1.jpg",
      "/images/album/acara/kegiatan-2/2.jpg",
      "/images/album/acara/kegiatan-2/3.jpg",
      "/images/album/acara/kegiatan-2/4.jpg",
      "/images/album/acara/kegiatan-2/5.jpg",
    ],
  },
  {
    id: "acara-kegiatan-3",
    judul: "Rapat Studi Diseminasi Data Kualitas Air Tahun 2026",
    kategori: "ACARA",
    tanggalFormat: "07 SEPTEMBER 2026",
    subTanggalFormat: "Acara – Senin, 07 September 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan Rapat Studi Diseminasi Data Kualitas Air Tahun 2026 sebagai upaya menyampaikan hasil pemantauan, evaluasi, dan informasi kondisi kualitas air di wilayah kerja BBWS Serayu Opak.",
    gambarCover: "/images/album/acara/kegiatan-3/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-3/cover.jpg",
      "/images/album/acara/kegiatan-3/1.jpg",
      "/images/album/acara/kegiatan-3/2.jpg",
      "/images/album/acara/kegiatan-3/3.jpg",
      "/images/album/acara/kegiatan-3/4.jpg",
      "/images/album/acara/kegiatan-3/5.jpg",
    ],
  },
  {
    id: "acara-kegiatan-4",
    judul: "Rapat Rasionalisasi Pos Hidrologi",
    kategori: "ACARA",
    tanggalFormat: "31 AGUSTUS 2026",
    subTanggalFormat: "Acara – Senin, 31 Agustus 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Pada Senin, 31 Agustus 2026 Unit Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan Rapat Rasionalisasi Pos Hidrologi guna memastikan akurasi dan efisiensi data sumber daya air.",
    gambarCover: "/images/album/acara/kegiatan-4/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-4/cover.jpg",
      "/images/album/acara/kegiatan-4/1.jpg",
      "/images/album/acara/kegiatan-4/2.jpg",
      "/images/album/acara/kegiatan-4/3.jpg",
      "/images/album/acara/kegiatan-4/4.jpg",
      "/images/album/acara/kegiatan-4/5.jpg",
    ],
  },
  {
    id: "acara-kegiatan-5",
    judul: "Rapat Studi Rasionalisasi Pos Hidrologi",
    kategori: "ACARA",
    tanggalFormat: "28 AGUSTUS 2026",
    subTanggalFormat: "Acara – Jumat, 28 Agustus 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Unit Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan Rapat Studi Rasionalisasi Pos Hidrologi sebagai upaya mengevaluasi efektivitas dan keterwakilan jaringan pos hidrologi.",
    gambarCover: "/images/album/acara/kegiatan-5/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-5/cover.jpg",
      "/images/album/acara/kegiatan-5/1.jpg",
      "/images/album/acara/kegiatan-5/2.jpg",
      "/images/album/acara/kegiatan-5/3.jpg",
      "/images/album/acara/kegiatan-5/4.jpg",
      "/images/album/acara/kegiatan-5/5.jpg",
    ],
  },
];

const dataDokumentasiLainnyaAcaraHal1: ItemAlbum[] = [
  {
    id: "acara-kegiatan-6",
    judul: "Rapat Pengelolaan Portal SIH3",
    kategori: "ACARA",
    tanggalFormat: "24 AGUSTUS 2026",
    subTanggalFormat: "Acara – Senin, 24 Agustus 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Pada Jumat, 21 Agustus 2026, Unit Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan Rapat Pengelolaan Portal SIH3 sebagai bagian dari upaya meningkatkan pengelolaan dan penyajian data hidrologi, hidrometeorologi, dan hidrogeologi secara terpadu.",
    gambarCover: "/images/album/acara/kegiatan-6/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-6/cover.jpg",
      "/images/album/acara/kegiatan-6/1.jpg",
      "/images/album/acara/kegiatan-6/2.jpg",
      "/images/album/acara/kegiatan-6/3.jpg",
      "/images/album/acara/kegiatan-6/4.jpg",
      "/images/album/acara/kegiatan-6/5.jpg",
    ],
  },
  {
    id: "acara-kegiatan-7",
    judul: "Studi Rasionalisasi Pos Hidrologi",
    kategori: "ACARA",
    tanggalFormat: "28 JULI 2026",
    subTanggalFormat: "Acara – Selasa, 28 Juli 2026",
    lokasi: "Kantor BBWS Serayu Opak",
    deskripsi:
      "Pada Selasa, 28 Juli 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak menggelar Rapat Studi Rasionalisasi Pos Hidrologi di Kantor BBWS Serayu Opak. Kegiatan ini dilakukan untuk meninjau, mengevaluasi, serta menata ulang persebaran pos hidrologi.",
    gambarCover: "/images/album/acara/kegiatan-7/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-7/cover.jpg",
      "/images/album/acara/kegiatan-7/1.jpg",
      "/images/album/acara/kegiatan-7/2.jpg",
      "/images/album/acara/kegiatan-7/3.jpg",
      "/images/album/acara/kegiatan-7/4.jpg",
      "/images/album/acara/kegiatan-7/5.jpg",
    ],
  },
  {
    id: "acara-kegiatan-8",
    judul: "Workshop Pengelolaan SIH3",
    kategori: "ACARA",
    tanggalFormat: "17 JULI 2026",
    subTanggalFormat: "Acara – Jumat, 17 Juli 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Menindaklanjuti surat undangan Nomor: UM 0102/B/Bbws8/2026/532 tanggal 3 Juli 2026, bersama ini pada Selasa, 14 Juli 2026 di Ruang Serayu, Balai Besar Wilayah Sungai Serayu Opak, kami melaksanakan perihal Workshop Kegiatan Pengelolaan SIH3.",
    gambarCover: "/images/album/acara/kegiatan-8/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-8/cover.jpg",
      "/images/album/acara/kegiatan-8/1.jpg",
      "/images/album/acara/kegiatan-8/2.jpg",
      "/images/album/acara/kegiatan-8/3.jpg",
      "/images/album/acara/kegiatan-8/4.jpg",
      "/images/album/acara/kegiatan-8/5.jpg",
    ],
  },
  {
    id: "acara-kegiatan-9",
    judul: "Rapat Konsep Neraca Air (RAAT)",
    kategori: "ACARA",
    tanggalFormat: "17 JULI 2026",
    subTanggalFormat: "Acara – Jumat, 17 Juli 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Pada hari Jumat, 17 Juli 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak menggelar rapat intensif pembahasan konsep Neraca Air dalam rangka Rencana Alokasi Air Tahunan (RAAT).",
    gambarCover: "/images/album/acara/kegiatan-9/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-9/cover.jpg",
      "/images/album/acara/kegiatan-9/1.jpg",
      "/images/album/acara/kegiatan-9/2.jpg",
      "/images/album/acara/kegiatan-9/3.jpg",
      "/images/album/acara/kegiatan-9/4.jpg",
      "/images/album/acara/kegiatan-9/5.jpg",
    ],
  },
];

// ============================================================================
// DATA KATEGORI "LAPANGAN" - HALAMAN 1 s.d. 3
// ============================================================================
const dataLapanganHal1: ItemAlbum[] = [
  {
    id: "lapangan-kegiatan-1",
    judul: "Pengambilan Sampel Kualitas Air di Temanggung, Banjarnegara, & Purbalingga",
    kategori: "LAPANGAN",
    tanggalFormat: "27 OKTOBER 2026",
    subTanggalFormat: "Lapangan – Selasa, 27 Oktober 2026",
    lokasi: "Temanggung, Banjarnegara, Purbalingga",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan pengujian dan pengambilan sampel kualitas air di wilayah Temanggung, Banjarnegara, dan Purbalingga guna memantau kelayakan mutu air secara berkala.",
    gambarCover: "/images/album/lapangan/kegiatan-1/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-1/cover.jpg",
      "/images/album/lapangan/kegiatan-1/1.jpg",
      "/images/album/lapangan/kegiatan-1/2.jpg",
      "/images/album/lapangan/kegiatan-1/3.jpg",
      "/images/album/lapangan/kegiatan-1/4.jpg",
      "/images/album/lapangan/kegiatan-1/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-2",
    judul: "Pengukuran Debit Saluran Primer Tajum",
    kategori: "LAPANGAN",
    tanggalFormat: "23 OKTOBER 2026",
    subTanggalFormat: "Lapangan – Jumat, 23 Oktober 2026",
    lokasi: "Irigasi Primer Tajum Banyumas",
    deskripsi:
      "Ketersediaan air irigasi menjadi kebutuhan penting dalam mendukung pertanian, khususnya menjelang masa tanam. Untuk mengetahui kondisi aliran sebagai bahan evaluasi penanganan kekeringan,Tim Hidrologi & Kualitas Air melaksanakan pengukuran debit di Saluran Primer Daerah Irigasi (DI) Tajum, Kabupaten Banyumas, Jawa Tengah, pada Kamis, (22/10/2026).\n\nData kondisi lahan mencatat area terdampak luas 38 hektare di Desa Mergasana, Kecamatan Jatilawang, Kabupaten Banyumas. Lahan tersebut telah selesai panen dan tengah menunggu Masa Tanam I (MT I). Kegiatan pengukuran ini menindaklanjuti survei kekeringan di Desa Sanggreman, Kecamatan Rawalo, pada Rabu, (21/10/2026). Pengukuran dilakukan di sejumlah titik, mulai dari pengambilan Bendung Tajum, bagian hulu dan hilir talang atau terowongan, hingga outlet terowongan 1, 2, dan 3 untuk memperoleh gambaran debit pada tiap ruas saluran. Hasil pengukuran menjadi bahan evaluasi kondisi aliran dan dasar pertimbangan tindak lanjut penanganan kekeringan. Melalui pemantauan ini, diharapkan kebutuhan penanganan dapat diidentifikasi secara lebih tepat untuk mendukung ketersediaan air irigasi menjelang masa tanam serta keberlangsungan aktivitas pertanian masyarakat.",
    gambarCover: "/images/album/lapangan/kegiatan-2/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-2/cover.jpg",
      "/images/album/lapangan/kegiatan-2/1.jpg",
      "/images/album/lapangan/kegiatan-2/2.jpg",
      "/images/album/lapangan/kegiatan-2/3.jpg",
      "/images/album/lapangan/kegiatan-2/4.jpg",
      "/images/album/lapangan/kegiatan-2/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-3",
    judul: "Pengambilan Sampel Kualitas Air di Banyumas",
    kategori: "LAPANGAN",
    tanggalFormat: "21 OKTOBER 2026",
    subTanggalFormat: "Lapangan – Rabu, 21 Oktober 2026",
    lokasi: "Sungai Ijo, Bumiagung, Kabupaten Kebumen, Jawa Tengah",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melakukan pengambilan sampel kualitas air di beberapa titik sungai wilayah Kabupaten Banyumas demi memastikan kondisi mutu air tetap sesuai dengan standar baku mutu lingkungan.",
    gambarCover: "/images/album/lapangan/kegiatan-3/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-3/cover.jpg",
      "/images/album/lapangan/kegiatan-3/1.jpg",
      "/images/album/lapangan/kegiatan-3/2.jpg",
      "/images/album/lapangan/kegiatan-3/3.jpg",
      "/images/album/lapangan/kegiatan-3/4.jpg",
      "/images/album/lapangan/kegiatan-3/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-4",
    judul: "Pengambilan Sampel Kualitas Air di Waduk Sermo",
    kategori: "LAPANGAN",
    tanggalFormat: "12 OKTOBER 2026",
    subTanggalFormat: "Lapangan – Senin, 12 Oktober 2026",
    lokasi: "Waduk Sermo, Kulon Progo",
    deskripsi:
      "Kegiatan rutin pengambilan sampel air di perairan Waduk Sermo untuk memantau status mutu air waduk secara periodik dan mendukung penyediaan data kualitas air baku.",
    gambarCover: "/images/album/lapangan/kegiatan-4/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-4/cover.jpg",
      "/images/album/lapangan/kegiatan-4/1.jpg",
      "/images/album/lapangan/kegiatan-4/2.jpg",
      "/images/album/lapangan/kegiatan-4/3.jpg",
      "/images/album/lapangan/kegiatan-4/4.jpg",
      "/images/album/lapangan/kegiatan-4/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-5",
    judul: "Pemeliharaan Pos Curah Hujan Bener & Pengambilan Sampel Kualitas Air di Sungai Bogowonto",
    kategori: "LAPANGAN",
    tanggalFormat: "29 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Selasa, 29 September 2026",
    lokasi: "Sungai Bogowonto, Bener, Purworejo",
    deskripsi:
      "Pada Selasa, 29 September 2026 Tim Hidrologi & Kualitas Air Balai Besar Wilayah Sungai Serayu Opak untuk menjaga keakuratan data dan kelestarian sumber daya air. Kegiatan pemeliharaan rutin Pos Curah Hujan Bener serta pengambilan sampel kualitas air di Sungai Bogowonto demi mewujudkan pemantauan air yang andal dan berkelanjutan.",
    gambarCover: "/images/album/lapangan/kegiatan-5/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-5/cover.jpg",
      "/images/album/lapangan/kegiatan-5/1.jpg",
      "/images/album/lapangan/kegiatan-5/2.jpg",
      "/images/album/lapangan/kegiatan-5/3.jpg",
      "/images/album/lapangan/kegiatan-5/4.jpg",
      "/images/album/lapangan/kegiatan-5/5.jpg",
    ],
  },
];

const dataDokumentasiLainnyaLapanganHal1: ItemAlbum[] = [
  {
    id: "lapangan-kegiatan-6",
    judul: "Pemeliharaan Pos Curah Hujan Sendangtirto & Pundong, Tim Hidrologi & Kualitas Air BBWS Serayu Opak",
    kategori: "LAPANGAN",
    tanggalFormat: "24 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Kamis, 24 September 2026",
    lokasi: "Sampangan, Sendangtirto, Berbah, Sleman, DIY",
    deskripsi:
      "Pada 24 September 2026, Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan pemeliharaan Pos Klimatologi Sermo untuk menjaga kondisi peralatan dan memastikan data klimatologi tetap tercatat secara optimal dan berkelanjutan. Kegiatan ini menjadi bagian dari upaya menjaga keandalan data hidrologi dan klimatologi sebagai pendukung pengelolaan sumber daya air.",
    gambarCover: "/images/album/lapangan/kegiatan-6/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-6/cover.jpg",
      "/images/album/lapangan/kegiatan-6/1.jpg",
      "/images/album/lapangan/kegiatan-6/2.jpg",
      "/images/album/lapangan/kegiatan-6/3.jpg",
      "/images/album/lapangan/kegiatan-6/4.jpg",
      "/images/album/lapangan/kegiatan-6/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-7",
    judul: "Pengambilan Sampel Kualitas Air di Tambakboyo",
    kategori: "LAPANGAN",
    tanggalFormat: "24 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Kamis, 24 September 2026",
    lokasi: "Sungai Tambakbayan, Tambakboyo",
    deskripsi:
      "Pada Kamis, 24 September 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan kegiatan sampling dan pengujian kualitas air di Sungai Tambakbayan wilayah Embung Tambakboyo. Kegiatan ini merupakan bentuk komitmen pengawasan berkala dalam mengawal ketersediaan dan keamanan air baku wilayah Yogyakarta, khususnya Kabupaten Sleman.",
    gambarCover: "/images/album/lapangan/kegiatan-7/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-7/cover.jpg",
      "/images/album/lapangan/kegiatan-7/1.jpg",
      "/images/album/lapangan/kegiatan-7/2.jpg",
      "/images/album/lapangan/kegiatan-7/3.jpg",
      "/images/album/lapangan/kegiatan-7/4.jpg",
      "/images/album/lapangan/kegiatan-7/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-8",
    judul: "Pemeliharaan Pos Klimatologi Sermo, Tim Hidrologi & Kualitas Air BBWS Serayu Opak",
    kategori: "LAPANGAN",
    tanggalFormat: "03 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Kamis, 03 September 2026",
    lokasi: "Jl. Lkr. Sermo, Sremo Lor, Hargowilis, Kokap, Kab. Kulon Progo",
    deskripsi:
      "Pada 3 September 2026, Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan pemeliharaan Pos Klimatologi Sermo untuk menjaga kondisi peralatan dan memastikan data klimatologi tetap tercatat secara optimal dan berkelanjutan. Kegiatan ini menjadi bagian dari upaya menjaga keandalan data hidrologi dan klimatologi sebagai pendukung pengelolaan sumber daya air.",
    gambarCover: "/images/album/lapangan/kegiatan-8/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-8/cover.jpg",
      "/images/album/lapangan/kegiatan-8/1.jpg",
      "/images/album/lapangan/kegiatan-8/2.jpg",
      "/images/album/lapangan/kegiatan-8/3.jpg",
      "/images/album/lapangan/kegiatan-8/4.jpg",
      "/images/album/lapangan/kegiatan-8/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-9",
    judul: "Pengukuran Topografi di Sungai Bengkok & Sungai Ngrancah",
    kategori: "LAPANGAN",
    tanggalFormat: "03 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Kamis, 03 September 2026",
    lokasi: "Sungai Bengkok & Ngrancah",
    deskripsi:
      "Pada Tanggal 3 September 2026, Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan pengukuran topografi di Sungai Bengkok dan Sungai Ngrancah sebagai bagian dari kegiatan survei kondisi sungai dan penyediaan data teknis lapangan. Data hasil pengukuran menjadi dasar pendukung dalam analisis hidrologi dan pengelolaan sumber daya air yang lebih akurat.",
    gambarCover: "/images/album/lapangan/kegiatan-9/cover.png",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-9/cover.png",
      "/images/album/lapangan/kegiatan-9/1.png",
      "/images/album/lapangan/kegiatan-9/2.jpg",
      "/images/album/lapangan/kegiatan-9/3.jpg",
      "/images/album/lapangan/kegiatan-9/4.jpg",
      "/images/album/lapangan/kegiatan-9/5.jpg",
    ],
  },
];

const dataLapanganHal2: ItemAlbum[] = [
  {
    id: "lapangan-kegiatan-10",
    judul: "Pengambilan Sampel Kualitas Air di Sungai Bawah Tanah Gunungkidul",
    kategori: "LAPANGAN",
    tanggalFormat: "06 AGUSTUS 2026",
    subTanggalFormat: "Lapangan – Kamis, 06 Agustus 2026",
    lokasi: "Gunungkidul",
    deskripsi:
      "Pada Kamis, 6 Agustus 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan kegiatan sampling dan pengujian kualitas air di Sungai Bawah Tanah Bribin, Baron, serta Ngobaran. Kegiatan ini merupakan bentuk komitmen pengawasan berkala dalam mengawal ketersediaan dan keamanan air baku di kawasan karst Gunungkidul.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-7/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-7/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-7/1.jpg",
      "/images/album/semua/hal-2/kegiatan-7/2.jpg",
      "/images/album/semua/hal-2/kegiatan-7/3.jpg",
      "/images/album/semua/hal-2/kegiatan-7/4.jpg",
      "/images/album/semua/hal-2/kegiatan-7/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-11",
    judul: "Pengambilan Sampel Kualitas Air di Gunungkidul",
    kategori: "LAPANGAN",
    tanggalFormat: "04 AGUSTUS 2026",
    subTanggalFormat: "Lapangan – Selasa, 04 Agustus 2026",
    lokasi: "Gunungkidul",
    deskripsi:
      "Pada Rabu, 4 Agustus 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan pengujian dan pengambilan sampel air di Sungai Opak Bintaran, Sungai Oya Gedangsari, Sungai Oya Bunder, serta Sungai Bawah Tanah Song Gilap, Kabupaten Gunungkidul. Langkah ini rutin dilakukan demi memastikan baku mutu air permukaan dan air bawah tanah tetap aman dan terjamin.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-8/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-8/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-8/1.jpg",
      "/images/album/semua/hal-2/kegiatan-8/2.png",
      "/images/album/semua/hal-2/kegiatan-8/3.png",
      "/images/album/semua/hal-2/kegiatan-8/4.png",
      "/images/album/semua/hal-2/kegiatan-8/5.png",
    ],
  },
  {
    id: "lapangan-kegiatan-12",
    judul: "Survey Pembangunan Pos Curah Hujan Kec Dukun, Kab. Magelang",
    kategori: "LAPANGAN",
    tanggalFormat: "27 JULI 2026",
    subTanggalFormat: "Lapangan – Senin, 27 Juli 2026",
    lokasi: "Kec. Dukun, Kab. Magelang, Jawa Tengah",
    deskripsi:
      "Pada Jumat, 24 Juli 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan peninjauan pembangunan Pos Curah Hujan baru di Kecamatan Dukun, Kabupaten Magelang. Saat ini, proses pembangunan fisik pos telah hampir selesai (finishing). Tim juga telah melakukan pengujian (testing) sistem serta instrumen telemetri, dan hasilnya pos dapat berfungsi dengan baik dalam merekam serta mengirimkan data curah hujan secara real-time.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-1/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-1/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-1/1.jpg",
      "/images/album/semua/hal-3/kegiatan-1/2.jpg",
      "/images/album/semua/hal-3/kegiatan-1/3.jpg",
      "/images/album/semua/hal-3/kegiatan-1/4.jpg",
      "/images/album/semua/hal-3/kegiatan-1/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-13",
    judul: "Pengambilan Sampel Kualitas Air di Kab. Sleman",
    kategori: "LAPANGAN",
    tanggalFormat: "24 JULI 2026",
    subTanggalFormat: "Lapangan – Jumat, 24 Juli 2026",
    lokasi: "Kab. Sleman",
    deskripsi:
      "Tim Hidrologi dan Kualitas Air BBWS Serayu Opak kembali bergerak melakukan pemantauan berkala di Kab. Sleman demi menjaga ketersediaan air bersih dan baku mutu perairan.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-2/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-2/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-2/1.jpg",
      "/images/album/semua/hal-3/kegiatan-2/2.jpg",
      "/images/album/semua/hal-3/kegiatan-2/3.jpg",
      "/images/album/semua/hal-3/kegiatan-2/4.jpg",
      "/images/album/semua/hal-3/kegiatan-2/5.jpg",
    ],
  },
  {
    id: "lapangan-kegiatan-14",
    judul: "Pengambilan Sampel Kualitas Air di Rusun ASN Kementerian Pekerjaan Umum Yogyakarta",
    kategori: "LAPANGAN",
    tanggalFormat: "16 JULI 2026",
    subTanggalFormat: "Lapangan – Kamis, 16 Juli 2026",
    lokasi: "Rusun ASN PU Yogyakarta",
    deskripsi:
      "Tim Hidrologi dan Kualitas Air BBWS Serayu Opak kembali melakukan pengambilan sampel kualitas air, kali ini di Rusun ASN Kementerian Pekerjaan Umum Yogyakarta. Setelah dilakukan pengambilan sampel secara terukur di lapangan, seluruh sampel air tersebut langsung dikirimkan ke Balai Besar Laboratorium Kesehatan Masyarakat (BB Labkesmas) Yogyakarta untuk menjalani pengujian Lab. Langkah ini dilakukan demi memastikan pasokan air bersih bagi para penghuni rusun benar-benar terjamin aman, sehat, dan memenuhi baku mutu lingkungan.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-5/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-5/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-5/1.jpg",
      "/images/album/semua/hal-3/kegiatan-5/2.jpg",
      "/images/album/semua/hal-3/kegiatan-5/3.jpg",
      "/images/album/semua/hal-3/kegiatan-5/4.jpg",
      "/images/album/semua/hal-3/kegiatan-5/5.jpg",
    ],
  },
];

const dataDokumentasiLainnyaLapanganHal2: ItemAlbum[] = [
  {
    id: "lapangan-kegiatan-15",
    judul: "Alat Ukur Debit Current Meter",
    kategori: "LAPANGAN",
    tanggalFormat: "15 JULI 2026",
    subTanggalFormat: "Lapangan – Rabu, 15 Juli 2026",
    deskripsi:
      "Current meter adalah alat yang digunakan untuk mengukur kecepatan aliran air (arus) di sungai, saluran irigasi, maupun kanal. Data kecepatan ini sangat penting untuk menghitung debit air—biasanya dikombinasikan dengan luas penampang—sebagai panduan manajemen sumber daya air, irigasi, dan mitigasi banjir.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-6/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-6/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-6/1.jpg",
      "/images/album/semua/hal-3/kegiatan-6/2.png",
      "/images/album/semua/hal-3/kegiatan-6/3.png",
      "/images/album/semua/hal-3/kegiatan-6/4.png",
    ],
  },
  {
    id: "lapangan-kegiatan-16",
    judul: "Alat Ukur Debit ADCP (Acoustic Doppler Current Profiler)",
    kategori: "LAPANGAN",
    tanggalFormat: "15 JULI 2026",
    subTanggalFormat: "Lapangan – Rabu, 15 Juli 2026",
    deskripsi:
      "ADCP (Acoustic Doppler Current Profiler) adalah alat canggih yang menggunakan gelombang suara untuk mengukur kecepatan dan arah arus air. Alat ini bekerja dengan mengirimkan suara ke dalam air dan menangkap kembali pantulannya dari partikel yang bergerak. ADCP dipakai di laut, sungai, dan danau.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-7/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-7/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-7/1.jpg",
      "/images/album/semua/hal-3/kegiatan-7/2.png",
      "/images/album/semua/hal-3/kegiatan-7/3.png",
      "/images/album/semua/hal-3/kegiatan-7/4.png",
    ],
  },
  {
    id: "lapangan-kegiatan-17",
    judul: "Alat Ukur Kualitas Air",
    kategori: "LAPANGAN",
    tanggalFormat: "13 JULI 2026",
    subTanggalFormat: "Lapangan – Senin, 13 Juli 2026",
    deskripsi:
      "Multiparameter Water Quality Meter: Satu alat digital genggam yang sudah dilengkapi beberapa probe sensor sekaligus untuk membaca pH, TDS, EC (konduktivitas), salinitas, dan suhu dalam satu kali celup.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-8/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-8/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-8/1.jpg",
      "/images/album/semua/hal-3/kegiatan-8/2.jpg",
      "/images/album/semua/hal-3/kegiatan-8/3.png",
    ],
  },
  {
    id: "lapangan-kegiatan-18",
    judul: "Pengukuran Debit Sungai Progo Kranggan, Temanggung",
    kategori: "LAPANGAN",
    tanggalFormat: "10 JULI 2026",
    subTanggalFormat: "Lapangan – Jumat, 10 Juli 2026",
    lokasi: "Sungai Progo, Kranggan, Temanggung",
    deskripsi:
      "Melaksanakan kegiatan pengukuran debit Sungai Progo di Kranggan, Temanggung sebagai bagian dari upaya pemantauan ketersediaan sumber daya air. Pengukuran dilakukan untuk memperoleh data debit yang akurat sebagai dasar dalam evaluasi kondisi mata air, pengelolaan sumber daya air, serta perencanaan konservasi yang berkelanjutan.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-9/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-9/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-9/1.jpg",
      "/images/album/semua/hal-3/kegiatan-9/2.png",
      "/images/album/semua/hal-3/kegiatan-9/3.png",
      "/images/album/semua/hal-3/kegiatan-9/4.png",
    ],
  },
];

const dataLapanganHal3: ItemAlbum[] = [
  {
    id: "lapangan-kegiatan-19",
    judul: "Survey Penempatan Pos Curah Hujan di Kab. Magelang",
    kategori: "LAPANGAN",
    tanggalFormat: "03 JULI 2026",
    subTanggalFormat: "Lapangan – Jumat, 03 Juli 2026",
    lokasi: "Embung Dukun & Embung Rockland Kab. Magelang",
    youtubeUrl: "https://youtu.be/dz4Lh6UCDK4?si=JFc22gPgZnVjMSWW",
    deskripsi:
      "Melaksanakan survei lapangan di Embung Dukun & Embung Rockland Kab. Magelang untuk menentukan lokasi yang tepat bagi penempatan Pos Curah Hujan sebagai bagian dari upaya peningkatan kualitas data hidrologi dan meteorologi. Pemilihan lokasi dilakukan dengan mempertimbangkan kondisi lingkungan, keterwakilan wilayah, kemudahan akses, keamanan, serta kesesuaian dengan standar teknis agar data curah hujan yang diperoleh akurat dan representatif. Melalui survei ini, diharapkan jaringan pemantauan curah hujan semakin optimal sehingga dapat mendukung pengelolaan sumber daya air, mitigasi bencana hidrometeorologi, serta penyediaan informasi yang andal bagi masyarakat dan para pemangku kepentingan.",
    gambarCover: "/images/album/semua/hal-4/kegiatan-1/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-4/kegiatan-1/cover.jpg",
      "/images/album/semua/hal-4/kegiatan-1/1.jpg",
      "/images/album/semua/hal-4/kegiatan-1/2.png",
      "/images/album/semua/hal-4/kegiatan-1/3.png",
    ],
  },
  {
    id: "lapangan-kegiatan-20",
    judul: "Pengukuran Debit Mata Air Ledok Sambi",
    kategori: "LAPANGAN",
    tanggalFormat: "26 JUNI 2026",
    subTanggalFormat: "Lapangan – Jumat, 26 Juni 2026",
    lokasi: "Ledok Sambi, Pakem, Kab. Sleman",
    deskripsi:
      "Melaksanakan kegiatan pengukuran debit mata air di kawasan Ledok Sambi sebagai bagian dari upaya pemantauan ketersediaan sumber daya air dan memenuhi permohonan SIPA REKOMTEK PERMEN 02/2024. Pengukuran dilakukan untuk memperoleh data debit yang akurat sebagai dasar dalam evaluasi kondisi mata air, pengelolaan sumber daya air, serta perencanaan konservasi yang berkelanjutan. Pengukuran dilakukan pada tiga titik sumber mata air, untuk mendapatkan hasil yang optimal.",
    gambarCover: "/images/album/semua/hal-4/kegiatan-2/cover.png",
    galeriGambar: [
      "/images/album/semua/hal-4/kegiatan-2/cover.png",
      "/images/album/semua/hal-4/kegiatan-2/1.png",
      "/images/album/semua/hal-4/kegiatan-2/2.png",
      "/images/album/semua/hal-4/kegiatan-2/3.png",
      "/images/album/semua/hal-4/kegiatan-2/4.png",
    ],
  },
  {
    id: "lapangan-kegiatan-21",
    judul: "Survey Penempatan Pos Curah Hujan di Kab. Gunungkidul",
    kategori: "LAPANGAN",
    tanggalFormat: "03 JUNI 2026",
    subTanggalFormat: "Lapangan – Rabu, 03 Juni 2026",
    lokasi: "Kabupaten Gunungkidul",
    deskripsi:
      "Melaksanakan survei lapangan di Klumpit, Sureng, dan Wuni, Kab. Gunungkidul untuk menentukan lokasi yang tepat bagi penempatan Pos Curah Hujan sebagai bagian dari upaya peningkatan kualitas data hidrologi dan meteorologi. Pemilihan lokasi dilakukan dengan mempertimbangkan kondisi lingkungan, keterwakilan wilayah, kemudahan akses, keamanan, serta kesesuaian dengan standar teknis agar data curah hujan yang diperoleh akurat dan representatif. Melalui survei ini, diharapkan jaringan pemantauan curah hujan semakin optimal sehingga dapat mendukung pengelolaan sumber daya air, mitigasi bencana hidrometeorologi, serta penyediaan informasi yang andal bagi masyarakat dan para pemangku kepentingan.",
    gambarCover: "/images/album/semua/hal-4/kegiatan-3/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-4/kegiatan-3/cover.jpg",
      "/images/album/semua/hal-4/kegiatan-3/1.jpg",
      "/images/album/semua/hal-4/kegiatan-3/2.png",
      "/images/album/semua/hal-4/kegiatan-3/3.png",
    ],
  },
];

const dataDokumentasiLainnyaLapanganHal3: ItemAlbum[] = [];

// ============================================================================
// DATA KATEGORI "SEMUA" - HALAMAN 1 s.d. 4
// ============================================================================
const dataSemuaHal1: ItemAlbum[] = [
  {
    id: "kegiatan-1-hal1",
    judul: "Pengambilan Sampel Kualitas Air di Temanggung, Banjarnegara, & Purbalingga",
    kategori: "LAPANGAN",
    tanggalFormat: "27 OKTOBER 2026",
    subTanggalFormat: "Lapangan – Selasa, 27 Oktober 2026",
    lokasi: "Temanggung, Banjarnegara, Purbalingga",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan pengujian dan pengambilan sampel kualitas air di wilayah Temanggung, Banjarnegara, dan Purbalingga guna memantau kelayakan mutu air secara berkala.",
    gambarCover: "/images/album/lapangan/kegiatan-1/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-1/cover.jpg",
      "/images/album/lapangan/kegiatan-1/1.jpg",
      "/images/album/lapangan/kegiatan-1/2.jpg",
      "/images/album/lapangan/kegiatan-1/3.jpg",
      "/images/album/lapangan/kegiatan-1/4.jpg",
      "/images/album/lapangan/kegiatan-1/5.jpg",
    ],
  },
  {
    id: "kegiatan-2-hal1",
    judul: "Rapat Audit Internal Sertifikasi ISO",
    kategori: "ACARA",
    tanggalFormat: "26 OKTOBER 2026",
    subTanggalFormat: "Acara – Senin, 26 Oktober 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan Rapat Audit Internal Sertifikasi ISO sebagai bentuk komitmen dalam menjaga kualitas dan standar operasional pengelolaan data sumber daya air.",
    gambarCover: "/images/album/acara/kegiatan-1/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-1/cover.jpg",
      "/images/album/acara/kegiatan-1/1.jpg",
      "/images/album/acara/kegiatan-1/2.jpg",
      "/images/album/acara/kegiatan-1/3.jpg",
      "/images/album/acara/kegiatan-1/4.jpg",
    ],
  },
  {
    id: "kegiatan-3-hal1",
    judul: "Pengukuran Debit Saluran Primer Tajum",
    kategori: "LAPANGAN",
    tanggalFormat: "23 OKTOBER 2026",
    subTanggalFormat: "Lapangan – Jumat, 23 Oktober 2026",
    lokasi: "Irigasi Primer Tajum Banyumas",
    deskripsi:
      "Ketersediaan air irigasi menjadi kebutuhan penting dalam mendukung pertanian, khususnya menjelang masa tanam. Untuk mengetahui kondisi aliran sebagai bahan evaluasi penanganan kekeringan,Tim Hidrologi & Kualitas Air melaksanakan pengukuran debit di Saluran Primer Daerah Irigasi (DI) Tajum, Kabupaten Banyumas, Jawa Tengah, pada Kamis, (22/10/2026).\n\nData kondisi lahan mencatat area terdampak luas 38 hektare di Desa Mergasana, Kecamatan Jatilawang, Kabupaten Banyumas.",
    gambarCover: "/images/album/lapangan/kegiatan-2/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-2/cover.jpg",
      "/images/album/lapangan/kegiatan-2/1.jpg",
      "/images/album/lapangan/kegiatan-2/2.jpg",
      "/images/album/lapangan/kegiatan-2/3.jpg",
      "/images/album/lapangan/kegiatan-2/4.jpg",
      "/images/album/lapangan/kegiatan-2/5.jpg",
    ],
  },
  {
    id: "kegiatan-4-hal1",
    judul: "Pengambilan Sampel Kualitas Air di Banyumas",
    kategori: "LAPANGAN",
    tanggalFormat: "21 OKTOBER 2026",
    subTanggalFormat: "Lapangan – Rabu, 21 Oktober 2026",
    lokasi: "Sungai Ijo, Bumiagung, Kabupaten Kebumen, Jawa Tengah",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melakukan pengambilan sampel kualitas air di beberapa titik sungai wilayah Kabupaten Banyumas demi memastikan kondisi mutu air tetap sesuai dengan standar baku mutu lingkungan.",
    gambarCover: "/images/album/lapangan/kegiatan-3/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-3/cover.jpg",
      "/images/album/lapangan/kegiatan-3/1.jpg",
      "/images/album/lapangan/kegiatan-3/2.jpg",
      "/images/album/lapangan/kegiatan-3/3.jpg",
      "/images/album/lapangan/kegiatan-3/4.jpg",
      "/images/album/lapangan/kegiatan-3/5.jpg",
    ],
  },
  {
    id: "kegiatan-5-hal1",
    judul: "Pengambilan Sampel Kualitas Air di Waduk Sermo",
    kategori: "LAPANGAN",
    tanggalFormat: "12 OKTOBER 2026",
    subTanggalFormat: "Lapangan – Senin, 12 Oktober 2026",
    lokasi: "Waduk Sermo, Kulon Progo",
    deskripsi:
      "Kegiatan rutin pengambilan sampel air di perairan Waduk Sermo untuk memantau status mutu air waduk secara periodik dan mendukung penyediaan data kualitas air baku.",
    gambarCover: "/images/album/lapangan/kegiatan-4/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-4/cover.jpg",
      "/images/album/lapangan/kegiatan-4/1.jpg",
      "/images/album/lapangan/kegiatan-4/2.jpg",
      "/images/album/lapangan/kegiatan-4/3.jpg",
      "/images/album/lapangan/kegiatan-4/4.jpg",
      "/images/album/lapangan/kegiatan-4/5.jpg",
    ],
  },
];

const dataDokumentasiLainnyaHal1: ItemAlbum[] = [
  {
    id: "kegiatan-6-hal1",
    judul: "Pemeliharaan Pos Curah Hujan Bener & Pengambilan Sampel Kualitas Air di Sungai Bogowonto",
    kategori: "LAPANGAN",
    tanggalFormat: "29 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Selasa, 29 September 2026",
    lokasi: "Sungai Bogowonto, Bener, Purworejo",
    deskripsi:
      "Kegiatan pemeliharaan rutin Pos Curah Hujan Bener serta pengambilan sampel kualitas air di Sungai Bogowonto demi mewujudkan pemantauan air yang andal dan berkelanjutan.",
    gambarCover: "/images/album/lapangan/kegiatan-5/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-5/cover.jpg",
      "/images/album/lapangan/kegiatan-5/1.jpg",
      "/images/album/lapangan/kegiatan-5/2.jpg",
      "/images/album/lapangan/kegiatan-5/3.jpg",
      "/images/album/lapangan/kegiatan-5/4.jpg",
      "/images/album/lapangan/kegiatan-5/5.jpg",
    ],
  },
  {
    id: "kegiatan-7-hal1",
    judul: "Pemeliharaan Pos Curah Hujan Sendangtirto & Pundong, Tim Hidrologi & Kualitas Air BBWS Serayu Opak",
    kategori: "LAPANGAN",
    tanggalFormat: "24 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Kamis, 24 September 2026",
    lokasi: "Sampangan, Sendangtirto, Berbah, Sleman, DIY",
    deskripsi:
      "Pada 24 September 2026, Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan pemeliharaan Pos Klimatologi Sermo untuk menjaga kondisi peralatan.",
    gambarCover: "/images/album/lapangan/kegiatan-6/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-6/cover.jpg",
      "/images/album/lapangan/kegiatan-6/1.jpg",
      "/images/album/lapangan/kegiatan-6/2.jpg",
      "/images/album/lapangan/kegiatan-6/3.jpg",
      "/images/album/lapangan/kegiatan-6/4.jpg",
      "/images/album/lapangan/kegiatan-6/5.jpg",
    ],
  },
  {
    id: "kegiatan-8-hal1",
    judul: "Pengambilan Sampel Kualitas Air di Tambakboyo",
    kategori: "LAPANGAN",
    tanggalFormat: "24 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Kamis, 24 September 2026",
    lokasi: "Sungai Tambakbayan, Tambakboyo",
    deskripsi:
      "Kegiatan sampling dan pengujian kualitas air di Sungai Tambakbayan wilayah Embung Tambakboyo.",
    gambarCover: "/images/album/lapangan/kegiatan-7/cover.jpg",
    galeriGambar: [
      "/images/album/lapangan/kegiatan-7/cover.jpg",
      "/images/album/lapangan/kegiatan-7/1.jpg",
      "/images/album/lapangan/kegiatan-7/2.jpg",
      "/images/album/lapangan/kegiatan-7/3.jpg",
      "/images/album/lapangan/kegiatan-7/4.jpg",
      "/images/album/lapangan/kegiatan-7/5.jpg",
    ],
  },
  {
    id: "kegiatan-9-hal1",
    judul: "Rapat Diseminasi Data Kualitas Air Tahun 2026",
    kategori: "ACARA",
    tanggalFormat: "08 SEPTEMBER 2026",
    subTanggalFormat: "Acara – Selasa, 08 September 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan Rapat Diseminasi Data Kualitas Air Tahun 2026 sebagai forum penyampaian hasil pemantauan.",
    gambarCover: "/images/album/acara/kegiatan-2/cover.jpg",
    galeriGambar: [
      "/images/album/acara/kegiatan-2/cover.jpg",
      "/images/album/acara/kegiatan-2/1.jpg",
      "/images/album/acara/kegiatan-2/2.jpg",
      "/images/album/acara/kegiatan-2/3.jpg",
      "/images/album/acara/kegiatan-2/4.jpg",
      "/images/album/acara/kegiatan-2/5.jpg",
    ],
  },
];

const dataSemuaHal2: ItemAlbum[] = [
  {
    id: "kegiatan-1-hal2",
    judul: "Rapat Studi Diseminasi Data Kualitas Air Tahun 2026",
    kategori: "ACARA",
    tanggalFormat: "07 SEPTEMBER 2026",
    subTanggalFormat: "Acara – Senin, 07 September 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan Rapat Studi Diseminasi Data Kualitas Air Tahun 2026.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-1/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-1/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-1/1.jpg",
      "/images/album/semua/hal-2/kegiatan-1/2.jpg",
      "/images/album/semua/hal-2/kegiatan-1/3.jpg",
      "/images/album/semua/hal-2/kegiatan-1/4.jpg",
      "/images/album/semua/hal-2/kegiatan-1/5.jpg",
    ],
  },
  {
    id: "kegiatan-2-hal2",
    judul: "Pemeliharaan Pos Klimatologi Sermo, Tim Hidrologi & Kualitas Air BBWS Serayu Opak",
    kategori: "LAPANGAN",
    tanggalFormat: "03 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Kamis, 03 September 2026",
    lokasi: "Jl. Lkr. Sermo, Sremo Lor, Hargowilis, Kokap, Kab. Kulon Progo",
    deskripsi:
      "Pada 3 September 2026, Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan pemeliharaan Pos Klimatologi Sermo.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-2/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-2/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-2/1.jpg",
      "/images/album/semua/hal-2/kegiatan-2/2.jpg",
      "/images/album/semua/hal-2/kegiatan-2/3.jpg",
      "/images/album/semua/hal-2/kegiatan-2/4.jpg",
      "/images/album/semua/hal-2/kegiatan-2/5.jpg",
    ],
  },
  {
    id: "kegiatan-3-hal2",
    judul: "Pengukuran Topografi di Sungai Bengkok & Sungai Ngrancah",
    kategori: "LAPANGAN",
    tanggalFormat: "03 SEPTEMBER 2026",
    subTanggalFormat: "Lapangan – Kamis, 03 September 2026",
    lokasi: "Sungai Bengkok & Ngrancah",
    deskripsi:
      "Pada Tanggal 3 September 2026, Tim Hidrologi & Kualitas Air BBWS Serayu Opak melaksanakan pengukuran topografi di Sungai Bengkok dan Sungai Ngrancah.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-3/cover.png",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-3/cover.png",
      "/images/album/semua/hal-2/kegiatan-3/1.png",
      "/images/album/semua/hal-2/kegiatan-3/2.jpg",
      "/images/album/semua/hal-2/kegiatan-3/3.jpg",
      "/images/album/semua/hal-2/kegiatan-3/4.jpg",
      "/images/album/semua/hal-2/kegiatan-3/5.jpg",
    ],
  },
  {
    id: "kegiatan-4-hal2",
    judul: "Rapat Rasionalisasi Pos Hidrologi",
    kategori: "ACARA",
    tanggalFormat: "31 AGUSTUS 2026",
    subTanggalFormat: "Acara – Senin, 31 Agustus 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Pada Senin, 31 Agustus 2026 Unit Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan Rapat Rasionalisasi Pos Hidrologi.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-4/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-4/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-4/1.jpg",
      "/images/album/semua/hal-2/kegiatan-4/2.jpg",
      "/images/album/semua/hal-2/kegiatan-4/3.jpg",
      "/images/album/semua/hal-2/kegiatan-4/4.jpg",
      "/images/album/semua/hal-2/kegiatan-4/5.jpg",
    ],
  },
  {
    id: "kegiatan-5-hal2",
    judul: "Rapat Studi Rasionalisasi Pos Hidrologi",
    kategori: "ACARA",
    tanggalFormat: "28 AGUSTUS 2026",
    subTanggalFormat: "Acara – Jumat, 28 Agustus 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Unit Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan Rapat Studi Rasionalisasi Pos Hidrologi.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-5/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-5/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-5/1.jpg",
      "/images/album/semua/hal-2/kegiatan-5/2.jpg",
      "/images/album/semua/hal-2/kegiatan-5/3.jpg",
      "/images/album/semua/hal-2/kegiatan-5/4.jpg",
      "/images/album/semua/hal-2/kegiatan-5/5.jpg",
    ],
  },
];

const dataDokumentasiLainnyaHal2: ItemAlbum[] = [
  {
    id: "kegiatan-6-hal2",
    judul: "Rapat Pengelolaan Portal SIH3",
    kategori: "ACARA",
    tanggalFormat: "24 AGUSTUS 2026",
    subTanggalFormat: "Acara – Senin, 24 Agustus 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Pada Jumat, 21 Agustus 2026, Unit Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan Rapat Pengelolaan Portal SIH3.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-6/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-6/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-6/1.jpg",
      "/images/album/semua/hal-2/kegiatan-6/2.jpg",
      "/images/album/semua/hal-2/kegiatan-6/3.jpg",
      "/images/album/semua/hal-2/kegiatan-6/4.jpg",
      "/images/album/semua/hal-2/kegiatan-6/5.jpg",
    ],
  },
  {
    id: "kegiatan-7-hal2",
    judul: "Pengambilan Sampel Kualitas Air di Sungai Bawah Tanah Gunungkidul",
    kategori: "LAPANGAN",
    tanggalFormat: "06 AGUSTUS 2026",
    subTanggalFormat: "Lapangan – Kamis, 06 Agustus 2026",
    lokasi: "Gunungkidul",
    deskripsi:
      "Pada Kamis, 6 Agustus 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan kegiatan sampling dan pengujian kualitas air di Sungai Bawah Tanah Bribin, Baron, serta Ngobaran.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-7/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-7/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-7/1.jpg",
      "/images/album/semua/hal-2/kegiatan-7/2.jpg",
      "/images/album/semua/hal-2/kegiatan-7/3.jpg",
      "/images/album/semua/hal-2/kegiatan-7/4.jpg",
      "/images/album/semua/hal-2/kegiatan-7/5.jpg",
    ],
  },
  {
    id: "kegiatan-8-hal2",
    judul: "Pengambilan Sampel Kualitas Air di Gunungkidul",
    kategori: "LAPANGAN",
    tanggalFormat: "04 AGUSTUS 2026",
    subTanggalFormat: "Lapangan – Selasa, 04 Agustus 2026",
    lokasi: "Gunungkidul",
    deskripsi:
      "Pada Rabu, 4 Agustus 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan pengujian dan pengambilan sampel air di Sungai Opak Bintaran, Sungai Oya Gedangsari, Sungai Oya Bunder, serta Sungai Bawah Tanah Song Gilap.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-8/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-8/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-8/1.jpg",
      "/images/album/semua/hal-2/kegiatan-8/2.png",
      "/images/album/semua/hal-2/kegiatan-8/3.png",
      "/images/album/semua/hal-2/kegiatan-8/4.png",
      "/images/album/semua/hal-2/kegiatan-8/5.png",
    ],
  },
  {
    id: "kegiatan-9-hal2",
    judul: "Studi Rasionalisasi Pos Hidrologi",
    kategori: "ACARA",
    tanggalFormat: "28 JULI 2026",
    subTanggalFormat: "Acara – Selasa, 28 Juli 2026",
    lokasi: "Kantor BBWS Serayu Opak",
    deskripsi:
      "Pada Selasa, 28 Juli 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak menggelar Rapat Studi Rasionalisasi Pos Hidrologi.",
    gambarCover: "/images/album/semua/hal-2/kegiatan-9/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-2/kegiatan-9/cover.jpg",
      "/images/album/semua/hal-2/kegiatan-9/1.jpg",
      "/images/album/semua/hal-2/kegiatan-9/2.jpg",
      "/images/album/semua/hal-2/kegiatan-9/3.jpg",
      "/images/album/semua/hal-2/kegiatan-9/4.jpg",
      "/images/album/semua/hal-2/kegiatan-9/5.jpg",
    ],
  },
];

const dataSemuaHal3: ItemAlbum[] = [
  {
    id: "kegiatan-1-hal3",
    judul: "Survey Pembangunan Pos Curah Hujan Kec Dukun, Kab. Magelang",
    kategori: "LAPANGAN",
    tanggalFormat: "27 JULI 2026",
    subTanggalFormat: "Lapangan – Senin, 27 Juli 2026",
    lokasi: "Kec. Dukun, Kab. Magelang, Jawa Tengah",
    deskripsi:
      "Pada Jumat, 24 Juli 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak melaksanakan peninjauan pembangunan Pos Curah Hujan baru di Kecamatan Dukun, Kabupaten Magelang.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-1/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-1/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-1/1.jpg",
      "/images/album/semua/hal-3/kegiatan-1/2.jpg",
      "/images/album/semua/hal-3/kegiatan-1/3.jpg",
      "/images/album/semua/hal-3/kegiatan-1/4.jpg",
      "/images/album/semua/hal-3/kegiatan-1/5.jpg",
    ],
  },
  {
    id: "kegiatan-2-hal3",
    judul: "Pengambilan Sampel Kualitas Air di Kab. Sleman",
    kategori: "LAPANGAN",
    tanggalFormat: "24 JULI 2026",
    subTanggalFormat: "Lapangan – Jumat, 24 Juli 2026",
    lokasi: "Kab. Sleman",
    deskripsi:
      "Tim Hidrologi dan Kualitas Air BBWS Serayu Opak kembali bergerak melakukan pemantauan berkala di Kab. Sleman.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-2/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-2/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-2/1.jpg",
      "/images/album/semua/hal-3/kegiatan-2/2.jpg",
      "/images/album/semua/hal-3/kegiatan-2/3.jpg",
      "/images/album/semua/hal-3/kegiatan-2/4.jpg",
      "/images/album/semua/hal-3/kegiatan-2/5.jpg",
    ],
  },
  {
    id: "kegiatan-3-hal3",
    judul: "Workshop Pengelolaan SIH3",
    kategori: "ACARA",
    tanggalFormat: "17 JULI 2026",
    subTanggalFormat: "Acara – Jumat, 17 Juli 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Workshop Kegiatan Pengelolaan SIH3 di Wilayah Sungai Progo Opak Serang dan Wilayah Sungai Serayu Bogowonto.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-3/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-3/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-3/1.jpg",
      "/images/album/semua/hal-3/kegiatan-3/2.jpg",
      "/images/album/semua/hal-3/kegiatan-3/3.jpg",
      "/images/album/semua/hal-3/kegiatan-3/4.jpg",
      "/images/album/semua/hal-3/kegiatan-3/5.jpg",
    ],
  },
  {
    id: "kegiatan-4-hal3",
    judul: "Rapat Konsep Neraca Air (RAAT)",
    kategori: "ACARA",
    tanggalFormat: "17 JULI 2026",
    subTanggalFormat: "Acara – Jumat, 17 Juli 2026",
    lokasi: "BBWS Serayu Opak",
    deskripsi:
      "Pada hari Jumat, 17 Juli 2026, Tim Hidrologi dan Kualitas Air BBWS Serayu Opak menggelar rapat intensif pembahasan konsep Neraca Air.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-4/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-4/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-4/1.jpg",
      "/images/album/semua/hal-3/kegiatan-4/2.jpg",
      "/images/album/semua/hal-3/kegiatan-4/3.jpg",
      "/images/album/semua/hal-3/kegiatan-4/4.jpg",
      "/images/album/semua/hal-3/kegiatan-4/5.jpg",
    ],
  },
  {
    id: "kegiatan-5-hal3",
    judul: "Pengambilan Sampel Kualitas Air di Rusun ASN Kementerian Pekerjaan Umum Yogyakarta",
    kategori: "LAPANGAN",
    tanggalFormat: "16 JULI 2026",
    subTanggalFormat: "Lapangan – Kamis, 16 Juli 2026",
    lokasi: "Rusun ASN PU Yogyakarta",
    deskripsi:
      "Tim Hidrologi dan Kualitas Air BBWS Serayu Opak kembali melakukan pengambilan sampel kualitas air di Rusun ASN Kementerian PU Yogyakarta.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-5/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-5/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-5/1.jpg",
      "/images/album/semua/hal-3/kegiatan-5/2.jpg",
      "/images/album/semua/hal-3/kegiatan-5/3.jpg",
      "/images/album/semua/hal-3/kegiatan-5/4.jpg",
      "/images/album/semua/hal-3/kegiatan-5/5.jpg",
    ],
  },
];

const dataDokumentasiLainnyaHal3: ItemAlbum[] = [
  {
    id: "kegiatan-6-hal3",
    judul: "Alat Ukur Debit Current Meter",
    kategori: "LAPANGAN",
    tanggalFormat: "15 JULI 2026",
    subTanggalFormat: "Lapangan – Rabu, 15 Juli 2026",
    deskripsi:
      "Current meter adalah alat yang digunakan untuk mengukur kecepatan aliran air (arus) di sungai, saluran irigasi, maupun kanal.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-6/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-6/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-6/1.jpg",
      "/images/album/semua/hal-3/kegiatan-6/2.png",
      "/images/album/semua/hal-3/kegiatan-6/3.png",
      "/images/album/semua/hal-3/kegiatan-6/4.png",
    ],
  },
  {
    id: "kegiatan-7-hal3",
    judul: "Alat Ukur Debit ADCP (Acoustic Doppler Current Profiler)",
    kategori: "LAPANGAN",
    tanggalFormat: "15 JULI 2026",
    subTanggalFormat: "Lapangan – Rabu, 15 Juli 2026",
    deskripsi:
      "ADCP (Acoustic Doppler Current Profiler) adalah alat canggih yang menggunakan gelombang suara untuk mengukur kecepatan dan arah arus air.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-7/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-7/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-7/1.jpg",
      "/images/album/semua/hal-3/kegiatan-7/2.png",
      "/images/album/semua/hal-3/kegiatan-7/3.png",
      "/images/album/semua/hal-3/kegiatan-7/4.png",
    ],
  },
  {
    id: "kegiatan-8-hal3",
    judul: "Alat Ukur Kualitas Air",
    kategori: "LAPANGAN",
    tanggalFormat: "13 JULI 2026",
    subTanggalFormat: "Lapangan – Senin, 13 Juli 2026",
    deskripsi:
      "Multiparameter Water Quality Meter: Satu alat digital genggam yang sudah dilengkapi beberapa probe sensor sekaligus.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-8/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-8/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-8/1.jpg",
      "/images/album/semua/hal-3/kegiatan-8/2.jpg",
      "/images/album/semua/hal-3/kegiatan-8/3.png",
    ],
  },
  {
    id: "kegiatan-9-hal3",
    judul: "Pengukuran Debit Sungai Progo Kranggan, Temanggung",
    kategori: "LAPANGAN",
    tanggalFormat: "10 JULI 2026",
    subTanggalFormat: "Lapangan – Jumat, 10 Juli 2026",
    lokasi: "Sungai Progo, Kranggan, Temanggung",
    deskripsi:
      "Melaksanakan kegiatan pengukuran debit Sungai Progo di Kranggan, Temanggung sebagai bagian dari upaya pemantauan ketersediaan sumber daya air.",
    gambarCover: "/images/album/semua/hal-3/kegiatan-9/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-3/kegiatan-9/cover.jpg",
      "/images/album/semua/hal-3/kegiatan-9/1.jpg",
      "/images/album/semua/hal-3/kegiatan-9/2.png",
      "/images/album/semua/hal-3/kegiatan-9/3.png",
      "/images/album/semua/hal-3/kegiatan-9/4.png",
    ],
  },
];

const dataSemuaHal4: ItemAlbum[] = [
  {
    id: "kegiatan-1-hal4",
    judul: "Survey Penempatan Pos Curah Hujan di Kab. Magelang",
    kategori: "LAPANGAN",
    tanggalFormat: "03 JULI 2026",
    subTanggalFormat: "Lapangan – Jumat, 03 Juli 2026",
    lokasi: "Embung Dukun & Embung Rockland Kab. Magelang",
    youtubeUrl: "https://youtu.be/dz4Lh6UCDK4?si=JFc22gPgZnVjMSWW",
    deskripsi:
      "Melaksanakan survei lapangan di Embung Dukun & Embung Rockland Kab. Magelang untuk menentukan lokasi yang tepat bagi penempatan Pos Curah Hujan sebagai bagian dari upaya peningkatan kualitas data hidrologi dan meteorologi.",
    gambarCover: "/images/album/semua/hal-4/kegiatan-1/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-4/kegiatan-1/cover.jpg",
      "/images/album/semua/hal-4/kegiatan-1/1.jpg",
      "/images/album/semua/hal-4/kegiatan-1/2.png",
      "/images/album/semua/hal-4/kegiatan-1/3.png",
    ],
  },
  {
    id: "kegiatan-2-hal4",
    judul: "Pengukuran Debit Mata Air Ledok Sambi",
    kategori: "LAPANGAN",
    tanggalFormat: "26 JUNI 2026",
    subTanggalFormat: "Lapangan – Jumat, 26 Juni 2026",
    lokasi: "Ledok Sambi, Pakem, Kab. Sleman",
    deskripsi:
      "Melaksanakan kegiatan pengukuran debit mata air di kawasan Ledok Sambi sebagai bagian dari upaya pemantauan ketersediaan sumber daya air.",
    gambarCover: "/images/album/semua/hal-4/kegiatan-2/cover.png",
    galeriGambar: [
      "/images/album/semua/hal-4/kegiatan-2/cover.png",
      "/images/album/semua/hal-4/kegiatan-2/1.png",
      "/images/album/semua/hal-4/kegiatan-2/2.png",
      "/images/album/semua/hal-4/kegiatan-2/3.png",
      "/images/album/semua/hal-4/kegiatan-2/4.png",
    ],
  },
  {
    id: "kegiatan-3-hal4",
    judul: "Survey Penempatan Pos Curah Hujan di Kab. Gunungkidul",
    kategori: "LAPANGAN",
    tanggalFormat: "03 JUNI 2026",
    subTanggalFormat: "Lapangan – Rabu, 03 Juni 2026",
    lokasi: "Kabupaten Gunungkidul",
    deskripsi:
      "Melaksanakan survei lapangan di Klumpit, Sureng, dan Wuni, Kab. Gunungkidul untuk menentukan lokasi yang tepat bagi penempatan Pos Curah Hujan.",
    gambarCover: "/images/album/semua/hal-4/kegiatan-3/cover.jpg",
    galeriGambar: [
      "/images/album/semua/hal-4/kegiatan-3/cover.jpg",
      "/images/album/semua/hal-4/kegiatan-3/1.jpg",
      "/images/album/semua/hal-4/kegiatan-3/2.png",
      "/images/album/semua/hal-4/kegiatan-3/3.png",
    ],
  },
];

const dataDokumentasiLainnyaHal4: ItemAlbum[] = [];

// ============================================================================
// KOMPONEN UTAMA PAGE
// ============================================================================
export default function AlbumKegiatanPage() {
  const [selectedItem, setSelectedItem] = useState<ItemAlbum | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"SEMUA" | "ACARA" | "LAPANGAN">("SEMUA");

  // Penentuan jumlah total halaman berdasarkan Tab Aktif
  const maxPage = activeTab === "SEMUA" ? 4 : activeTab === "LAPANGAN" ? 3 : 1;

  // Memilih data berdasarkan Tab Aktif & Nomor Halaman
  const getActiveSemuaData = () => {
    if (activeTab === "ACARA") return dataAcaraHal1;

    if (activeTab === "LAPANGAN") {
      if (currentPage === 1) return dataLapanganHal1;
      if (currentPage === 2) return dataLapanganHal2;
      return dataLapanganHal3;
    }

    if (currentPage === 1) return dataSemuaHal1;
    if (currentPage === 2) return dataSemuaHal2;
    if (currentPage === 3) return dataSemuaHal3;
    return dataSemuaHal4;
  };

  const getActiveDokumentasiLainnya = () => {
    if (activeTab === "ACARA") return dataDokumentasiLainnyaAcaraHal1;

    if (activeTab === "LAPANGAN") {
      if (currentPage === 1) return dataDokumentasiLainnyaLapanganHal1;
      if (currentPage === 2) return dataDokumentasiLainnyaLapanganHal2;
      return dataDokumentasiLainnyaLapanganHal3;
    }

    if (currentPage === 1) return dataDokumentasiLainnyaHal1;
    if (currentPage === 2) return dataDokumentasiLainnyaHal2;
    if (currentPage === 3) return dataDokumentasiLainnyaHal3;
    return dataDokumentasiLainnyaHal4;
  };

  const activeSemuaData = getActiveSemuaData();
  const activeDokumentasiLainnya = getActiveDokumentasiLainnya();

  const heroItem = activeSemuaData[0] || null;
  const sideItem = activeSemuaData[1] || null;
  const threeGridItems = activeSemuaData.slice(2, 5);

  const handleOpenModal = (item: ItemAlbum) => {
    setSelectedItem(item);
    setActivePhotoIndex(0);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? selectedItem.galeriGambar.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedItem) return;
    setActivePhotoIndex((prev) =>
      prev === selectedItem.galeriGambar.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
    <DatasetHero
      kicker="Galeri"
      title="Album Kegiatan"
      description="Dokumentasi kegiatan lapangan dan acara Balai Besar Wilayah Sungai Serayu Opak dalam pengelolaan data hidrologi, hidrometeorologi, dan hidrogeologi."
    />
    <main className="min-h-screen bg-page pb-20">
      <Container as="section" className="py-8 sm:py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">
          Album
        </p>
        <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-[#1B2430] sm:text-[26px]">
          Galeri kegiatan
        </h2>
        <p className="mt-1 text-[13px] text-[#5B6675]">
          Klik album untuk melihat seluruh foto dokumentasi kegiatan.
        </p>

        {/* TAB FILTER */}
        <div className="mt-6 flex border-b border-[#D5DBE3] text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => {
              setActiveTab("SEMUA");
              setCurrentPage(1);
            }}
            className={`mr-8 pb-3 border-b-2 transition ${
              activeTab === "SEMUA"
                ? "border-[#0B5CAD] text-[#0B5CAD] font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            SEMUA
          </button>
          <button
            onClick={() => {
              setActiveTab("ACARA");
              setCurrentPage(1);
            }}
            className={`mr-8 pb-3 border-b-2 transition ${
              activeTab === "ACARA"
                ? "border-[#0B5CAD] text-[#0B5CAD] font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            ACARA
          </button>
          <button
            onClick={() => {
              setActiveTab("LAPANGAN");
              setCurrentPage(1);
            }}
            className={`pb-3 border-b-2 transition ${
              activeTab === "LAPANGAN"
                ? "border-[#0B5CAD] text-[#0B5CAD] font-semibold"
                : "border-transparent text-slate-400 hover:text-slate-600"
            }`}
          >
            LAPANGAN
          </button>
        </div>

        {/* HERO GRID */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* HERO KIRI */}
          {heroItem && (
            <div
              className="lg:col-span-7 cursor-pointer group"
              onClick={() => handleOpenModal(heroItem)}
            >
              <div className="relative overflow-hidden rounded-xl bg-slate-900 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  onError={pakaiFotoDummy}
                  ref={cekFotoRusak}
                  src={heroItem.gambarCover}
                  alt={heroItem.judul}
                  className="h-[400px] w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#F2A900]">
                    {heroItem.kategori}
                  </span>
                  <h3 className="mt-1 text-2xl font-semibold leading-snug">
                    {heroItem.judul}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    {heroItem.tanggalFormat}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* KARTU KANAN HERO */}
          {sideItem && (
            <div
              className="lg:col-span-5 cursor-pointer group"
              onClick={() => handleOpenModal(sideItem)}
            >
              <div className="overflow-hidden rounded-[8px] bg-white border border-[#D5DBE3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  onError={pakaiFotoDummy}
                  ref={cekFotoRusak}
                  src={sideItem.gambarCover}
                  alt={sideItem.judul}
                  className="h-[230px] w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B5CAD]">
                    {sideItem.kategori}
                  </span>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400 uppercase">
                    {sideItem.tanggalFormat}
                  </p>
                  <h4 className="mt-1 text-base font-bold text-[#1B2430] group-hover:text-[#0B5CAD] leading-snug">
                    {sideItem.judul}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                    {sideItem.deskripsi}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3 GRID SEJAJAR DI BAWAH */}
        {threeGridItems.length > 0 && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {threeGridItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer overflow-hidden rounded-[8px] bg-white border border-[#D5DBE3] transition-all hover:border-[#AEB8C5] hover:shadow-[0_2px_10px_rgba(14,42,78,0.08)]"
                onClick={() => handleOpenModal(item)}
              >
                <div className="overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                  onError={pakaiFotoDummy}
                  ref={cekFotoRusak}
                    src={item.gambarCover}
                    alt={item.judul}
                    className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B5CAD]">
                    {item.kategori}
                  </span>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400 uppercase">
                    {item.tanggalFormat}
                  </p>
                  <h4 className="mt-1 text-base font-bold text-[#1B2430] line-clamp-2 group-hover:text-[#0B5CAD] leading-snug">
                    {item.judul}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION DOKUMENTASI LAINNYA */}
        {activeDokumentasiLainnya.length > 0 && (
          <div className="mt-20">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-[#1B2430] uppercase mb-12">
              DOKUMENTASI LAINNYA
            </h2>

            <div className="space-y-16">
              {activeDokumentasiLainnya.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
                  >
                    <div
                      className={`lg:col-span-7 cursor-pointer group ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                      onClick={() => handleOpenModal(item)}
                    >
                      <div className="overflow-hidden rounded-xl bg-slate-100 shadow-sm border border-slate-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                  onError={pakaiFotoDummy}
                  ref={cekFotoRusak}
                          src={item.gambarCover}
                          alt={item.judul}
                          className="h-[320px] w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>

                    <div
                      className={`lg:col-span-5 ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <span className="text-[#0B5CAD]">{item.kategori}</span>
                        <span>•</span>
                        <span>{item.tanggalFormat}</span>
                      </div>
                      <h3
                        onClick={() => handleOpenModal(item)}
                        className="mt-3 text-2xl font-semibold leading-snug text-[#1B2430] hover:text-[#0B5CAD] cursor-pointer transition"
                      >
                        {item.judul}
                      </h3>
                      <p className="mt-4 text-xs leading-relaxed text-slate-500 line-clamp-4 whitespace-pre-line">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PAGINATION DINAMIS */}
        {maxPage > 1 && (
          <div className="mt-16 flex items-center justify-center space-x-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex h-11 w-11 items-center justify-center rounded-full border text-base font-semibold transition ${
                currentPage === 1
                  ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white"
                  : "border-slate-200 text-slate-700 hover:border-[#0B5CAD] hover:text-[#0B5CAD] bg-white shadow-xs"
              }`}
              title="Halaman Sebelumnya"
            >
              ‹
            </button>

            {Array.from({ length: maxPage }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                  currentPage === page
                    ? "bg-[#14396A] text-white shadow-md border border-[#14396A]"
                    : "bg-white border border-slate-200 text-slate-700 hover:border-[#0B5CAD] hover:text-[#0B5CAD] shadow-xs"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, maxPage))}
              disabled={currentPage === maxPage}
              className={`flex h-11 w-11 items-center justify-center rounded-full border text-base font-semibold transition ${
                currentPage === maxPage
                  ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white"
                  : "border-slate-200 text-slate-700 hover:border-[#0B5CAD] hover:text-[#0B5CAD] bg-white shadow-xs"
              }`}
              title="Halaman Selanjutnya"
            >
              ›
            </button>
          </div>
        )}
      </Container>

      {/* POP-UP MODAL LIGHTBOX SLIDER FOTO - DISPLAY ASLI 100% UTUH TANPA TERPOTONG */}
      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 sm:p-6 backdrop-blur-xs"
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute right-6 top-6 text-2xl font-semibold text-white/80 transition hover:text-white z-50"
            title="Tutup"
          >
            ✕
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-y-auto rounded-xl bg-white p-6 sm:p-8 shadow-2xl"
          >
            {/* CONTAINER FLEKSIBEL MENYESUAIKAN GAMBAR DENGAN BATAS TINGGI LAYAR MODAL */}
            <div className="relative w-full overflow-hidden rounded-xl bg-[#0E2A4E] flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                  onError={pakaiFotoDummy}
                  ref={cekFotoRusak}
                src={selectedItem.galeriGambar[activePhotoIndex]}
                alt={`${selectedItem.judul} foto ${activePhotoIndex + 1}`}
                className="w-full max-h-[60vh] object-contain transition duration-300"
              />

              {/* BADGE LOKASI DI ATAS GAMBAR JIKA ADA */}
              {selectedItem.lokasi && (
                <div className="absolute bottom-4 left-4 flex items-center space-x-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-800 shadow-md backdrop-blur-xs z-10">
                  <span className="text-red-500">📍</span>
                  <span>{selectedItem.lokasi}</span>
                </div>
              )}

              {selectedItem.galeriGambar.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-md transition hover:bg-white z-10"
                    title="Foto Sebelumnya"
                  >
                    &#10094;
                  </button>

                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-800 shadow-md transition hover:bg-white z-10"
                    title="Foto Selanjutnya"
                  >
                    &#10095;
                  </button>
                </>
              )}
            </div>

            <div className="mt-6 flex flex-col text-center">
              <h3 className="text-xl font-semibold text-[#1B2430] sm:text-2xl">
                {selectedItem.judul}
              </h3>
              <p className="mt-1 text-xs italic text-slate-500">
                {selectedItem.subTanggalFormat}
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-sm whitespace-pre-line text-justify">
                {selectedItem.deskripsi}
              </p>

              {/* TOMBOL LINK YOUTUBE */}
              {selectedItem.youtubeUrl && (
                <div className="mt-6">
                  <a
                    href={selectedItem.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 rounded-full bg-red-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-red-700"
                  >
                    <svg
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span>Tonton Dokumentasi di YouTube</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  );
}