"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * Bingkai portal publik (skip-link, navbar, footer). Halaman /admin punya
 * shell sendiri, jadi bingkai publik tidak dirender di sana.
 */
export function PublicChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Lewati ke konten utama
      </a>
      {header}
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      {footer}
    </>
  );
}

export default PublicChrome;
