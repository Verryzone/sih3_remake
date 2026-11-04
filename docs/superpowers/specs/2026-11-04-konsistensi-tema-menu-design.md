# Spec — Konsistensi Tema Menu (Fase 1)

PRD: `docs/superpowers/prd/2026-11-04-konsistensi-tema-menu.md`

## Pola halaman baku
```tsx
<>
  <DatasetHero kicker="…" title="…" description="…" />
  <main className="min-h-screen bg-page pb-16">
    <Container className="py-8 sm:py-10">
      {/* section header */}
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">KICKER</p>
      <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-[#1B2430] sm:text-[26px]">Judul</h2>
      <p className="mt-1 text-[13px] text-[#5B6675]">Deskripsi</p>
      …
    </Container>
  </main>
</>
```

## Pemetaan kelas (ganti → menjadi)
| Lama | Baru |
|---|---|
| `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | `Container` / `mx-auto w-full max-w-site px-4 sm:px-6` |
| `bg-slate-50`, `bg-white` (latar halaman) | `bg-page` |
| `font-extrabold`, `font-bold` (judul) | `font-semibold` |
| `text-slate-900/950` | `text-[#1B2430]` |
| `text-slate-500/600` | `text-[#5B6675]` |
| `border-slate-200` | `border-[#D5DBE3]` |
| `sky-600`, `blue-600` (aktif/hover/link) | `text-[#0B5CAD]` / `border-[#0B5CAD]` |
| `bg-blue-600` (tombol utama) | `bg-[#14396A] hover:bg-[#0E2A4E]` |
| `bg-blue-50` (latar lembut) | `bg-[#EEF1F5]` |
| `rounded-2xl`/`rounded-3xl` (kartu/modal) | `rounded-xl` |

~~Warna semantik per kategori data boleh tetap~~ — dibatalkan oleh Revisi 1 di bawah.

## Per halaman
**Album** — hero: kicker "Galeri", judul "Album Kegiatan", deskripsi dokumentasi kegiatan BBWS. Header lama (emoji + `h2`) diganti section header baku. Tab aktif `border-[#0B5CAD] text-[#0B5CAD]`. Modal `rounded-xl`.

**Buletin** — hero mengganti `<header bg-[#0F2238]>`. Badge "📰 BULETIN" diganti kicker section. Hover judul kartu `text-[#0B5CAD]`. Kartu `rounded-xl`.

**Walidata** — section header putih diganti `DatasetHero` (kicker "Mitra Data", judul "Direktori Walidata"). Isi & skeleton ke `max-w-site`. Biru generik → palet PUPR.

## Revisi 1 (feedback: terlalu banyak warna)
- **Satu aksen saja:** warna per kategori (buletin) dan per instansi (walidata) dihapus. Label kategori memakai kicker `#0B5CAD`, tombol/pill aktif `#14396A`, sorotan `#F2A900`.
- **Kartu mengikuti Beranda (`ServicesSection`):** `rounded-[8px] border border-[#D5DBE3] bg-white`, hover `border-[#AEB8C5]` + `shadow-[0_2px_10px_rgba(14,42,78,0.08)]`.
- **Tab/filter mengikuti `DatasetPage`:** pill `h-8 rounded-full border-[#AEB8C5]`, aktif `bg-[#14396A] text-white`.
- Pengecualian yang tetap: warna status/error (rose), indikator online (emerald), tombol YouTube.
- Subhalaman `/galeri/buletin/[category]` ikut disesuaikan.
