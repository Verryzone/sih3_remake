import * as React from "react";
import { X } from "lucide-react";

/**
 * Gaya bersama panel admin. Mengikuti token portal publik
 * (lihat docs/superpowers/specs/2026-11-04-konsistensi-panel-admin-design.md).
 */
export const adm = {
  card: "rounded-[8px] border border-[#D5DBE3] bg-white",
  btnPrimary:
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] border border-[#14396A] bg-[#14396A] px-4 text-[13px] font-semibold text-white hover:bg-[#0E2A4E] disabled:opacity-60",
  btnOutline:
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] border border-[#AEB8C5] bg-white px-4 text-[13px] font-medium text-[#1B2430] hover:bg-[#F0F3F7] disabled:opacity-60",
  btnDanger:
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-[6px] border border-[#8B1A12] bg-[#8B1A12] px-4 text-[13px] font-semibold text-white hover:bg-[#6E140E] disabled:opacity-60",
  /** Aksi teks di baris tabel: Ubah / Hapus. */
  rowAction: "text-[13px] font-medium text-[#0B5CAD] hover:text-[#14396A] hover:underline",
  rowActionDanger: "text-[13px] font-medium text-[#8B1A12] hover:underline",
  input:
    "h-9 w-full rounded-[6px] border border-[#AEB8C5] bg-white px-3 text-[13px] text-[#1B2430] placeholder:text-[#8A96A6] focus:border-[#0B5CAD] focus:outline-none focus:ring-2 focus:ring-[#0B5CAD]/20",
  textarea:
    "w-full rounded-[6px] border border-[#AEB8C5] bg-white px-3 py-2 text-[13px] text-[#1B2430] placeholder:text-[#8A96A6] focus:border-[#0B5CAD] focus:outline-none focus:ring-2 focus:ring-[#0B5CAD]/20",
  label: "mb-1.5 block text-[13px] font-medium text-[#1B2430]",
  hint: "mt-1 block text-[12px] text-[#5B6675]",
  table: "w-full border-collapse text-left",
  thead: "bg-[#F5F7FA]",
  th: "border-b border-[#D5DBE3] px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#5B6675]",
  tr: "border-b border-[#E9EDF2] last:border-0 hover:bg-[#F8FAFC]",
  td: "px-4 py-3 text-[13px] text-[#3D4756]",
  pill: "inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium",
  pillActive: "border border-[#14396A] bg-[#14396A] text-white",
  pillIdle:
    "border border-[#AEB8C5] bg-white text-[#1B2430] hover:border-[#14396A] hover:text-[#14396A]",
  empty: "px-4 py-10 text-center text-[13px] text-[#5B6675]",
};

/**
 * Tombol aksi ikon di baris tabel (unduh / ubah / hapus). Label wajib karena
 * dipakai sebagai tooltip dan aria-label.
 */
export function IconAction({
  label,
  icon: Icon,
  onClick,
  href,
  danger = false,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
}) {
  const cls = `inline-flex h-8 w-8 items-center justify-center rounded-[6px] transition-colors ${
    danger
      ? "text-[#8B1A12] hover:bg-[#FBE3E1]"
      : "text-[#5B6675] hover:bg-[#EEF1F5] hover:text-[#14396A]"
  }`;
  const icon = <Icon aria-hidden="true" className="h-4 w-4" />;
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" title={label} aria-label={label} className={cls}>
        {icon}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} title={label} aria-label={label} className={cls}>
      {icon}
    </button>
  );
}

/** Header halaman admin: kicker + judul + deskripsi, aksi di kanan. */
export function AdminPageHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#0B5CAD]">
          {kicker}
        </p>
        <h1 className="mt-1 text-[22px] font-semibold tracking-[-0.01em] text-[#1B2430] sm:text-[26px]">
          {title}
        </h1>
        {description && <p className="mt-1 text-[13px] text-[#5B6675]">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Modal form standar: header + isi + footer aksi. */
export function AdminModal({
  title,
  onClose,
  children,
  footer,
  wide = false,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className="anim-fade fixed inset-0 z-50 flex items-center justify-center bg-[#0A2140]/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`anim-pop flex max-h-[90vh] w-full flex-col overflow-hidden rounded-[8px] bg-white ${wide ? "max-w-2xl" : "max-w-lg"}`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[#D5DBE3] px-5 py-3.5">
          <h2 className="text-[15px] font-semibold text-[#1B2430]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-[6px] p-1 text-[#5B6675] hover:bg-[#F0F3F7] hover:text-[#1B2430]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-[#D5DBE3] px-5 py-3">{footer}</div>
        )}
      </div>
    </div>
  );
}
