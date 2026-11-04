# PRD — Konsistensi Tema Menu (Fase 1)

Tanggal: 2026-11-04
Sumber: `docs/qa/audit-ui-konsistensi-menu.md`

## Latar belakang
Menu Beranda, FloodRouting, dan SIH3 sudah memakai tema terpadu (hero foto + navy, kontainer 1200px, palet PUPR). Menu lainnya dibangun terpisah dengan header, lebar, warna, dan tipografi sendiri. Akibatnya pengguna yang berpindah menu merasakan "situs yang berbeda": hero berubah bentuk, lebar konten melompat, warna aksen berganti biru langit.

## Tujuan
Menu dengan selisih terbesar terasa sebagai satu produk yang sama dengan menu acuan.

## Cakupan Fase 1
1. Galeri › Album Kegiatan (`/galeri/album`)
2. Galeri › Buletin (`/galeri/buletin`)
3. Walidata (`/walidata`)

Di luar cakupan (fase berikutnya): Peta, Dokumen, Publikasi/duplikasi, Footer, Analisis Data, Data Explorer. Perubahan fungsi, data, atau API juga di luar cakupan.

## Kebutuhan
| ID | Kebutuhan |
|---|---|
| R1 | Setiap halaman diawali `DatasetHero` dengan kicker, judul, dan deskripsi |
| R2 | Konten dibungkus `Container` (max 1200px, gutter `px-4 sm:px-6`) |
| R3 | Latar halaman `bg-page` |
| R4 | Warna aksen/tombol/tab memakai palet PUPR (primary `#14396A`, link `#0B5CAD`, amber `#F2A900`), tanpa `sky-*`/`blue-*`/`teal-*` |
| R5 | Judul maksimum `font-semibold`; judul section mengikuti pola `DatasetPage` (kicker 11px biru + h2 22/26px) |
| R6 | Satu `h1` per halaman (dari hero); hilangkan emoji di heading/label |
| R7 | Skeleton loading memakai lebar yang sama dengan konten |

## Kriteria keberhasilan
- Ketiga halaman lolos checklist R1–R7.
- Fungsi lama (filter tab, modal, pagination, kartu link) tetap berjalan.
- `npm run build` dan `npm run lint` lolos tanpa error baru.

## Fase 2 (2026-11-04)
Cakupan: Galeri › Peta (`/galeri/peta`) dan Galeri › Dokumen (`/galeri/dokumen`). Kebutuhan R1–R7 berlaku, ditambah Revisi 1 spec (satu aksen, kartu gaya Beranda, tab pill `DatasetPage`).
