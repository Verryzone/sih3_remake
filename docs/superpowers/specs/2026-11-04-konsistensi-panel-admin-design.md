# Spec — Konsistensi Panel Admin (Fase 4a)

PRD: `docs/superpowers/prd/2026-11-04-konsistensi-panel-admin.md`

## Pemisahan bingkai
- Komponen baru `components/layout/PublicChrome.tsx` (client): menerima `header` dan `footer` sebagai prop; jika `pathname` diawali `/admin`, hanya merender `children`.
- `app/layout.tsx` membungkus konten dengan `PublicChrome`. Dipilih ketimbang route group `(public)` agar tidak memindahkan ±15 folder halaman.

## Shell admin (`app/admin/layout.tsx`)
```
┌──────────────┬──────────────────────────────────────────────┐
│ [logo] SIH3  │ Judul halaman            Lihat portal ↗ | A ▾ │  ← topbar putih h-14, border-b
│ Panel Kelola │──────────────────────────────────────────────│
│              │                                              │
│ ▌Ringkasan   │   konten (bg-page, p-6, max-w 1200)          │
│  Pos         │                                              │
│  Pengukuran  │                                              │
│  Dokumen     │                                              │
│  Walidata    │                                              │
│ ──────────── │                                              │
│ nama / email │                                              │
│ Keluar       │                                              │
└──────────────┴──────────────────────────────────────────────┘
```
- Sidebar: `w-60 bg-[#0E2A4E] text-white`, sticky setinggi layar. Item: `text-[#C9D6E8]`, hover `bg-white/5 text-white`; aktif `bg-white/10 text-white font-semibold border-l-[3px] border-[#F2A900]`. Ikon `h-4 w-4`, tanpa warna khusus.
- Mobile (<md): sidebar jadi drawer dengan tombol menu di topbar.
- Label menu: "Ringkasan", "Pos Pemantauan", "Pengukuran", "Dokumen", "Walidata".

## Dashboard (`app/admin/page.tsx`)
- Header halaman: kicker 11px `#0B5CAD` "Ringkasan" + h1 22/26px semibold "Selamat datang, {nama}" + tombol utama navy "Input pengukuran".
- 4 stat tile: kartu standar; label 12px `#5B6675`, angka 28px semibold `tabular-nums`, tautan 13px `#0B5CAD`. Tanpa ikon berwarna.
- Rincian pos per bidang: satu kartu berisi tabel/daftar 3 baris (Hidrologi, Hidrometeorologi, Hidrogeologi) dengan jumlah, tanpa latar warna.
- Panduan: daftar bernomor biasa (pola halaman Walidata publik).

## Login
- Latar `bg-page`, kartu standar di tengah, logo header publik di atas, tombol navy.

## Revisi 1 (feedback: terlalu banyak ikon)
- Sidebar tanpa ikon; penanda aktif cukup garis amber + teks tebal.
- Judul halaman tanpa ikon; pakai `AdminPageHeader` (kicker + h1).
- Kartu kategori berikon (Dokumen, Pos) diganti pill kategori di atas tabel; tabel langsung tampil.
- Aksi baris tabel berupa teks "Ubah / Hapus / Unduh", bukan ikon.
- Ikon hanya untuk fungsi: tutup ×, menu mobile, tautan eksternal ↗.
- Status (Normal/Waspada/Siaga/Awas, aktif/nonaktif) memakai token `status-*` dari `tailwind.config.ts`.
- Gaya bersama ada di `components/admin/ui.tsx` (`adm`, `AdminPageHeader`, `AdminModal`).
