# Audit Konsistensi UI/UX — Menu Sisa

Tanggal: 2026-11-04
Cakupan: menu yang **belum** dievaluasi. Menu yang sudah selesai dan dijadikan **acuan**: Beranda, FloodRouting, SIH3 (Status Pos, Hidrologi, Hidrometeorologi, Hidrogeologi).

## Standar acuan (diambil dari menu yang sudah selesai)

| Aspek | Standar |
|---|---|
| Hero | Komponen `DatasetHero` (`components/dataset/DatasetHero.tsx`): foto `hero-bendungan.jpg` + overlay `#0A2140/78`, tinggi min 320/330px, kicker amber `#F2A900` 12px uppercase, judul 28/36/40px **font-semibold**, garis amber 3px×48px, deskripsi `#C9D6E8` |
| Kontainer | Komponen `Container` → `max-w-site` (1200px), `px-4 sm:px-6` |
| Background halaman | `bg-page` (`#F5F7FA`) |
| Warna | Token di `globals.css`: primary `#14396A`, primary-dark `#0E2A4E`, text `#1B2430`, muted `#5B6675`, border `#D5DBE3`, link `#0B5CAD`, aksen `#F2A900` |
| Radius | `--radius: 4px`; kartu `rounded-lg`/`rounded-xl` |
| Tipografi | Bobot maksimum `font-semibold`; tidak ada `font-extrabold` |

## Ringkasan temuan

| Menu | Route | Status | Tingkat |
|---|---|---|---|
| Walidata | `/walidata` | ✅ Diperbaiki (Fase 1, didesain ulang jadi tabel) | — |
| Analisis Data | `/analisis-data` | ⚠️ Sebagian sesuai | Rendah |
| Galeri › Buletin | `/galeri/buletin` | ✅ Diperbaiki (Fase 1) | — |
| Galeri › Peta | `/galeri/peta` | ✅ Diperbaiki (Fase 2) | — |
| Galeri › Album Kegiatan | `/galeri/album` | ✅ Diperbaiki (Fase 1) | — |
| Galeri › Dokumen | `/galeri/dokumen` | ✅ Diperbaiki (Fase 2) | — |
| Data Explorer (tombol CTA navbar) | `/data-explorer` | ⚠️ Sebagian sesuai | Sedang |
| Publikasi (link footer) | `/publikasi` | ❌ Perlu diperbaiki / duplikat | Tinggi |

## Detail per menu

### 1. Walidata — `app/walidata/page.tsx` ❌
**Perlu diperbaiki karena tidak sesuai tema.**
- Tidak memakai `DatasetHero`; header berupa section putih polos dengan judul `font-extrabold text-slate-900` → beda total dengan hero foto+navy di menu SIH3.
- Kontainer `max-w-7xl` (1280px) + `lg:px-8`, bukan `Container`/`max-w-site` → lebar konten "melompat" saat pindah menu.
- Palet Tailwind generik (`bg-blue-600`, `bg-blue-50`, `bg-slate-*`) alih-alih token primary `#14396A`.
- Radius berlebihan (`rounded-2xl`, `rounded-full` banyak) vs standar 4px/`rounded-lg`.
- Rekomendasi: ganti header dengan `<DatasetHero kicker="…" title="Direktori Walidata" …/>`, bungkus isi dengan `Container`, ganti warna biru ke `primary`, kurangi radius.

### 2. Analisis Data — `app/analisis-data/page.tsx` ⚠️
- Sudah memakai `DatasetHero`, `Container`, `bg-page` ✅.
- Sisa minor: campuran `bg-slate-50`, `rounded-md`/`rounded-full`; satu warna hardcode `#0E2A4E` (pakai token `primary-dark`). Cukup rapikan.

### 3. Galeri › Buletin — `app/galeri/buletin/page.tsx` ❌
**Perlu diperbaiki karena tidak sesuai tema.**
- Hero buatan sendiri: warna solid `bg-[#0F2238]` **tanpa foto**, judul `font-extrabold`, tanpa garis amber → beda dengan hero standar.
- Aksen `#0284C7` (sky) bukan palet PUPR.
- `max-w-7xl`, `bg-slate-50`.
- Rekomendasi: pakai `DatasetHero` + `Container` + `bg-page`; ganti sky ke `link`/`primary`.

### 4. Galeri › Peta — `app/galeri/peta/page.tsx` ❌
**Perlu diperbaiki karena tidak sesuai tema.**
- Hero dibuat ulang via inline `style` gradient (overlay `rgba(8,22,40,.68)`, kicker `amber-400`, `font-bold`, tanpa garis amber) — mirip tapi tidak identik (opacity, warna kicker, tinggi 300/350px berbeda).
- Tombol `bg-blue-700/800` bukan token primary.
- `max-w-7xl`, `rounded-md` dominan.
- Rekomendasi: ganti dengan `DatasetHero`; seragamkan tombol ke komponen `Button` varian primary.

### 5. Galeri › Album Kegiatan — `app/galeri/album/page.tsx` ❌
**Perlu diperbaiki karena tidak sesuai tema (paling jauh).**
- **Tidak ada hero sama sekali** — langsung judul `h2` (bukan `h1`, masalah aksesibilitas/SEO) dengan emoji 📷.
- Background `bg-white`, bukan `bg-page`.
- Tab filter memakai `sky-600`; modal `rounded-3xl`, `bg-[#0b1b2d]`.
- File 1.608 baris — data album ter-hardcode di halaman; sebaiknya dipindah ke `lib/`.
- Rekomendasi: tambah `DatasetHero`, `h1`, hapus emoji, tab pakai warna primary/amber, `Container`.

### 6. Galeri › Dokumen — `app/galeri/dokumen/page.tsx` ❌
**Perlu diperbaiki karena tidak sesuai tema.**
- Hero inline-style seperti Peta, tapi tinggi 370px, judul `text-4xl md:text-5xl font-bold` (lebih besar dari standar 40px).
- Kontainer `max-w-6xl px-5` — beda lagi dari menu lain.
- Aksen `bg-sky-700`, `bg-sky-50`.
- Rekomendasi: `DatasetHero` + `Container`; warna sky → primary.

### 7. Data Explorer — `app/data-explorer/page.tsx` ⚠️
- Sudah pakai `max-w-site` dan warna token hex ✅.
- Header putih sederhana (bukan `DatasetHero`). Bisa diterima kalau sengaja sebagai "halaman alat", tapi skeleton loading masih `max-w-7xl lg:px-8` → layout bergeser saat data selesai dimuat.

### 8. Publikasi — `app/publikasi/page.tsx` ❌
- Navbar "Galeri › Dokumen" → `/galeri/dokumen`, tapi Footer "Dokumen" → `/publikasi`. **Dua halaman untuk satu fungsi** dengan tampilan berbeda.
- Gaya: header putih `font-extrabold text-slate-950`, `max-w-7xl`, `bg-slate-900` — tidak sesuai tema.
- Rekomendasi: putuskan satu halaman, redirect yang lain.

## Temuan lintas menu

1. **Navbar vs Footer tidak sinkron** (`components/layout/Footer.tsx`): Buletin, Peta, Album di footer mengarah ke situs lama (external), sedangkan navbar ke halaman internal `/galeri/*`. Footer juga tidak memuat Analisis Data & Status Pos.
2. **Lebar kontainer ada 4 versi**: `max-w-site` (1200), `max-w-7xl` (1280), `max-w-6xl` (1152), dan inline. Standarkan ke `Container`.
3. **Hero ada 4 versi**: `DatasetHero`, solid navy (Buletin), inline gradient (Peta/Dokumen), tanpa hero (Album/Walidata/Publikasi).
4. **Bobot judul**: acuan `font-semibold`, menu sisa memakai `font-bold`/`font-extrabold`.
5. **Warna aksen** `sky-*`/`blue-*` muncul di Galeri & Walidata — harus diganti ke palet PUPR (navy + amber).

## Urutan perbaikan yang disarankan
1. Album, Buletin, Walidata (selisih terbesar).
2. Peta, Dokumen (cukup ganti hero + kontainer).
3. Selesaikan duplikasi Dokumen vs Publikasi dan sinkronkan Footer.
4. Rapikan minor Analisis Data & skeleton Data Explorer.
