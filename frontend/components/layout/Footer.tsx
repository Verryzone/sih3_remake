import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

/** Grup tautan mengikuti struktur navbar agar navigasi konsisten. */
const FOOTER_GROUPS = [
  {
    title: "SIH3",
    links: [
      { label: "Status Pos Pemantauan", href: "/pos" },
      { label: "Hidrologi", href: "/hidrologi" },
      { label: "Hidrometeorologi", href: "/hidrometeorologi" },
      { label: "Hidrogeologi", href: "/hidrogeologi" },
    ],
  },
  {
    title: "Layanan",
    links: [
      { label: "FloodRouting", href: "/floodrouting" },
      { label: "Walidata", href: "/walidata" },
      { label: "Analisis Data", href: "/analisis-data" },
      { label: "Unduh Data", href: "/data-explorer" },
    ],
  },
  {
    title: "Galeri",
    links: [
      { label: "Buletin", href: "/galeri/buletin" },
      { label: "Peta", href: "/galeri/peta" },
      { label: "Album Kegiatan", href: "/galeri/album" },
      { label: "Dokumen", href: "/galeri/dokumen" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A2140] text-white">
      <Container className="grid grid-cols-2 gap-8 pt-9 pb-6 md:grid-cols-5">
        {/* Kolom 1: Profil instansi */}
        <div className="col-span-2">
          <div className="font-semibold text-base mb-1.5 text-white">
            Balai Besar Wilayah Sungai Serayu Opak
          </div>
          <p className="text-[#C9D6E8] text-[14px] leading-relaxed max-w-[380px]">
            Jl. Solo Km. 6, Ngentak, Caturtunggal, Sleman, Kabupaten Sleman,
            Daerah Istimewa Yogyakarta 55281
          </p>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <nav key={group.title} aria-label={`Tautan ${group.title}`}>
            <div className="mb-1.5 text-base font-semibold text-white">{group.title}</div>
            <ul className="space-y-1 text-[14px]">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-0.5 text-[#C9D6E8] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      {/* Copyright strip */}
      <div className="border-t border-[#1F3A64]">
        <Container className="py-3 text-[13px] text-[#C9D6E8]">
          Hak Cipta &copy; {currentYear} Balai Besar Wilayah Sungai Serayu Opak
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
