# Plan — Konsistensi Tema Menu (Fase 1)

Spec: `docs/superpowers/specs/2026-11-04-konsistensi-tema-menu-design.md`

- [x] 1. Buletin (`app/galeri/buletin/page.tsx`): ganti header → `DatasetHero`; `main bg-page`; `Container`; section header baku; tipografi & hover sesuai pemetaan.
- [x] 2. Album (`app/galeri/album/page.tsx`): tambah `DatasetHero`; ganti header emoji/`h2`; `bg-page`; `Container`; tab & modal sesuai pemetaan.
- [x] 3. Walidata (`app/walidata/page.tsx`): ganti section header → `DatasetHero`; skeleton & isi ke `max-w-site`; warna biru → palet PUPR; radius.
- [x] 4. Verifikasi: `npx tsc --noEmit` lolos; `npm run build` gagal karena unduhan Google Font (jaringan), bukan kode; eslint: 1 error `set-state-in-effect` di Walidata sudah ada sebelumnya.
- [x] 5. Update status di `docs/qa/audit-ui-konsistensi-menu.md`.

## Fase 2
- [x] 6. Peta (`app/galeri/peta/page.tsx`): hero inline → `DatasetHero`; `Container`; `bg-page`; tombol biru → primary; kartu & filter sesuai Revisi 1.
- [x] 7. Dokumen (`app/galeri/dokumen/page.tsx`): hero inline → `DatasetHero`; `max-w-6xl px-5` → `Container`; sky → palet PUPR; kartu sesuai Revisi 1.
- [x] 8. Verifikasi eslint + tsc; update audit.
