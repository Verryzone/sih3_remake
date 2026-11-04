# PRD — Konsistensi Panel Admin (Fase 4)

Tanggal: 2026-11-04

## Masalah
1. Header (strip identitas + navbar publik + tombol "Unduh Data") dan footer publik ikut tampil di `/admin`. Admin terasa seperti halaman publik yang ditempeli sidebar, dan ada dua navigasi yang bersaing.
2. Gaya admin melenceng dari tema publik: gradient biru `#00008B → #4682B4`, kartu statistik dengan ikon berwarna-warni (biru/kuning/hijau/ungu), kartu kategori berlatar warna, banner sambutan gradient, sudut `rounded-xl/2xl`, font `bold/extrabold`.

## Tujuan
Panel admin memakai bahasa visual yang sama dengan portal publik (palet PUPR, kartu Beranda, tipografi `semibold`), tapi dengan bingkai sendiri yang khas aplikasi kerja: tanpa navbar/footer publik.

## Cakupan
- **4a**: pemisahan bingkai publik vs admin; shell admin (sidebar + topbar); dashboard `/admin`; halaman login.
- **4b** (berikutnya): halaman CRUD `/admin/pos`, `/admin/pengukuran`, `/admin/dokumen`, `/admin/walidata`.

Di luar cakupan: logika auth, API, dan alur data.

## Kebutuhan
| ID | Kebutuhan |
|---|---|
| A1 | `/admin/*` tidak menampilkan Navbar, Footer, dan skip-link publik |
| A2 | Sidebar navy `#0E2A4E` solid (tanpa gradient), item aktif memakai pola dropdown publik: latar tipis + garis amber kiri |
| A3 | Topbar putih tipis: judul halaman, tautan "Lihat portal", info akun, keluar |
| A4 | Warna hanya token publik; ikon statistik netral abu; tanpa latar per kategori |
| A5 | Kartu `rounded-[8px] border-[#D5DBE3] bg-white`; judul maksimum `font-semibold` |
| A6 | Sidebar bisa dibuka-tutup di mobile |

## Kriteria keberhasilan
- A1–A6 terpenuhi di dashboard dan login.
- Redirect login/logout tetap berjalan.
- eslint + tsc lolos untuk file yang diubah.
