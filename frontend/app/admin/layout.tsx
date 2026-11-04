"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Building2,
  ChevronDown,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Radio,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const NAV_ADMIN = [
  { label: "Ringkasan", href: "/admin", icon: LayoutDashboard },
  { label: "Pos Pemantauan", href: "/admin/pos", icon: Radio },
  { label: "Pengukuran", href: "/admin/pengukuran", icon: Activity },
  { label: "Dokumen", href: "/admin/dokumen", icon: FileText },
  { label: "Walidata", href: "/admin/walidata", icon: Building2 },
];

function isNavActive(href: string, pathname: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

/**
 * Logo resmi BBWS Serayu Opak di sidebar. Taruh berkasnya di
 * public/brand/logo-bbwsso.png; selama belum ada, tampil logo SIH3 + nama balai.
 */
function BrandBbwsso() {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/brand/logo-bbwsso.png"
        alt="Balai Besar Wilayah Sungai Serayu Opak"
        onError={() => setFailed(true)}
        ref={(img) => {
          if (img && img.complete && img.naturalWidth === 0) setFailed(true);
        }}
        className="h-10 w-auto max-w-full object-contain"
      />
    );
  }
  return (
    <div className="flex items-center gap-2.5">
      <Image src="/brand/logo-sih3.png" alt="" width={256} height={339} className="h-9 w-auto" />
      <div className="leading-tight">
        <p className="text-[14px] font-semibold text-white">BBWS Serayu Opak</p>
        <p className="text-[11px] text-[#9FB3CC]">Kementerian Pekerjaan Umum</p>
      </div>
    </div>
  );
}

function ProfileMenu({
  name,
  email,
  onLogout,
}: {
  name: string;
  email: string;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full py-0.5 pl-0.5 pr-1.5 hover:bg-[#F0F3F7]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF1F5] text-[13px] font-semibold text-[#14396A]">
          {name.charAt(0).toUpperCase()}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn("h-4 w-4 text-[#5B6675] transition-transform", open && "rotate-180")}
        />
        <span className="sr-only">Menu akun</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-[6px] border border-[#D5DBE3] bg-white shadow-md"
        >
          <div className="border-b border-[#E9EDF2] px-4 py-3">
            <p className="truncate text-[13px] font-semibold text-[#1B2430]">{name}</p>
            <p className="truncate text-[12px] text-[#5B6675]">{email}</p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={onLogout}
            className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[13px] font-medium text-[#8B1A12] hover:bg-[#FBE3E1]"
          >
            <LogOut aria-hidden="true" className="h-4 w-4" />
            Keluar
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, isLoading, pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-page">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-[3px] border-[#14396A] border-t-transparent" />
          <span className="text-[13px] text-[#5B6675]">Memverifikasi sesi…</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/admin/login");
  };

  const pageTitle =
    NAV_ADMIN.find((item) => isNavActive(item.href, pathname))?.label ?? "Panel Kelola";

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <BrandBbwsso />
      </div>

      <nav aria-label="Navigasi admin" className="flex-1 space-y-0.5 py-3">
        {NAV_ADMIN.map((item) => {
          const Icon = item.icon;
          const active = isNavActive(item.href, pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setDrawerOpen(false)}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 border-l-[3px] px-5 py-2.5 text-[14px] transition-colors",
                active
                  ? "border-[#F2A900] bg-white/10 font-semibold text-white"
                  : "border-transparent text-[#C9D6E8] hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

    </div>
  );

  return (
    <div className="flex min-h-screen bg-page">
      {/* Sidebar desktop */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 bg-[#0E2A4E] md:block">
        {sidebar}
      </aside>

      {/* Drawer mobile */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-[#0A2140]/60"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative h-full w-64 bg-[#0E2A4E]">
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              aria-label="Tutup menu"
              className="absolute right-3 top-5 rounded-[6px] p-1 text-[#C9D6E8] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-[#D5DBE3] bg-white px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Buka menu"
            className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#D5DBE3] text-[#1B2430] md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="truncate text-[15px] font-semibold text-[#1B2430]">{pageTitle}</span>

          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0B5CAD] hover:text-[#14396A]"
            >
              <span className="hidden sm:inline">Lihat portal</span>
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </Link>
            <ProfileMenu name={user.name} email={user.email} onLogout={handleLogout} />
          </div>
        </header>

        <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto w-full max-w-site">{children}</div>
        </main>
      </div>
    </div>
  );
}
