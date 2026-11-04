"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Download, Pencil, Trash2 } from "lucide-react";
import { AdminModal, AdminPageHeader, IconAction, adm } from "@/components/admin/ui";
import { API_BASE_URL } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { Dokumen } from "@/lib/types";
import { toast } from "sonner";

// Daftar kategori dokumen
const KATEGORI_OPTIONS = [
  {
    nama: "Regulasi",
    label: "Regulasi & Peraturan",
    deskripsi: "Peraturan perundang-undangan dan kebijakan resmi.",
  },
  {
    nama: "SOP",
    label: "Standar Operasional Prosedur (SOP)",
    deskripsi: "Prosedur langkah demi langkah pelaksanaan teknis dan administratif.",
  },
  {
    nama: "Pedoman Teknis",
    label: "Pedoman Teknis",
    deskripsi: "Panduan operasional alat, instrumen, dan tata cara lapangan.",
  },
  {
    nama: "Buletin",
    label: "Buletin Hidrologi",
    deskripsi: "Publikasi berkala, buletin informasi, dan buletin data air.",
  },
  {
    nama: "Laporan",
    label: "Laporan Tahunan",
    deskripsi: "Laporan pertanggungjawaban, evaluasi, dan rekapitulasi tahunan.",
  },
];

export default function AdminDokumenPage() {
  const { token } = useAuth();
  const [dokumenList, setDokumenList] = useState<Dokumen[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk navigasi kategori aktif & kata kunci pencarian
  const [activeKategori, setActiveKategori] = useState<string>(KATEGORI_OPTIONS[0].nama);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDokumen, setEditingDokumen] = useState<Dokumen | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    judul: "",
    kategori: "Regulasi",
    tahun: new Date().getFullYear().toString(),
    deskripsi: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchData = async (kategori: string) => {
    if (!kategori) return;
    try {
      const res = await axios.get(
        `${API_BASE_URL}/dokumen?per_page=100&kategori=${kategori}`
      );
      setDokumenList(res.data?.data || []);
    } catch {
      toast.error("Gagal memuat dokumen.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let aktif = true;
    axios
      .get(`${API_BASE_URL}/dokumen?per_page=100&kategori=${activeKategori}`)
      .then((res) => {
        if (aktif) setDokumenList(res.data?.data || []);
      })
      .catch(() => {
        if (aktif) toast.error("Gagal memuat dokumen.");
      })
      .finally(() => {
        if (aktif) setLoading(false);
      });
    return () => {
      aktif = false;
    };
  }, [activeKategori]);

  const openAddModal = (defaultKategori: string = KATEGORI_OPTIONS[0].nama) => {
    setEditingDokumen(null);
    setFormData({
      judul: "",
      kategori: defaultKategori,
      tahun: new Date().getFullYear().toString(),
      deskripsi: "",
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (doc: Dokumen) => {
    setEditingDokumen(doc);
    setFormData({
      judul: doc.judul || "",
      kategori: doc.kategori || "Regulasi",
      tahun: String(doc.tahun || new Date().getFullYear()),
      deskripsi: doc.deskripsi || "",
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus dokumen ini?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/dokumen/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Dokumen berhasil dihapus.");
      fetchData(activeKategori);
    } catch {
      toast.error("Gagal menghapus dokumen.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = new FormData();
      data.append("judul", formData.judul);
      data.append("kategori", formData.kategori);
      data.append("tahun", formData.tahun);
      data.append("deskripsi", formData.deskripsi);
      if (selectedFile) {
        data.append("file", selectedFile);
      }

      if (editingDokumen) {
        await axios.post(`${API_BASE_URL}/dokumen/${editingDokumen.id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Dokumen publikasi berhasil diperbarui!");
      } else {
        await axios.post(`${API_BASE_URL}/dokumen`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Dokumen publikasi baru berhasil ditambahkan!");
      }

      setIsModalOpen(false);
      if (formData.kategori === activeKategori) {
        fetchData(activeKategori);
      }
    } catch (err: unknown) {
      let msg = "Gagal menyimpan dokumen.";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message;
      }
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  // Filter dokumen berdasarkan kata kunci pencarian
  const filteredDokumenList = dokumenList.filter((doc) => {
    const query = searchQuery.toLowerCase();
    const judulMatch = doc.judul?.toLowerCase().includes(query) || false;
    const deskripsiMatch = doc.deskripsi?.toLowerCase().includes(query) || false;
    const tahunMatch = String(doc.tahun)?.toLowerCase().includes(query) || false;
    return judulMatch || deskripsiMatch || tahunMatch;
  });

  const aktif = KATEGORI_OPTIONS.find((k) => k.nama === activeKategori);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="Dokumen"
        title="Dokumen publikasi"
        description="Kelola regulasi, SOP, pedoman teknis, buletin, dan laporan yang tampil di portal."
        actions={
          <button type="button" onClick={() => openAddModal(activeKategori)} className={adm.btnPrimary}>
            Unggah dokumen
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {KATEGORI_OPTIONS.map((kat) => (
          <button
            key={kat.nama}
            type="button"
            onClick={() => {
              if (kat.nama === activeKategori) return;
              setLoading(true);
              setActiveKategori(kat.nama);
              setSearchQuery("");
            }}
            aria-pressed={activeKategori === kat.nama}
            className={`${adm.pill} ${activeKategori === kat.nama ? adm.pillActive : adm.pillIdle}`}
          >
            {kat.label}
          </button>
        ))}
      </div>

      <section className={`${adm.card} overflow-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D5DBE3] px-4 py-3">
          <div>
            <h2 className="text-[15px] font-semibold text-[#1B2430]">{aktif?.label}</h2>
            <p className="text-[12px] text-[#5B6675]">{aktif?.deskripsi}</p>
          </div>
          <label className="w-full sm:w-72">
            <span className="sr-only">Cari dokumen</span>
            <input
              type="search"
              placeholder="Cari judul, deskripsi, atau tahun…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={adm.input}
            />
          </label>
        </div>

        {loading ? (
          <div className={adm.empty}>Memuat dokumen…</div>
        ) : filteredDokumenList.length === 0 ? (
          <div className={adm.empty}>
            <p>
              {searchQuery
                ? `Tidak ada dokumen yang cocok dengan "${searchQuery}".`
                : "Belum ada dokumen di kategori ini."}
            </p>
            {!searchQuery && (
              <button type="button" onClick={() => openAddModal(activeKategori)} className={`${adm.btnOutline} mt-4`}>
                Unggah dokumen
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={adm.table}>
              <thead className={adm.thead}>
                <tr>
                  <th className={adm.th}>Judul</th>
                  <th className={adm.th}>Tahun</th>
                  <th className={adm.th}>Berkas</th>
                  <th className={`${adm.th} text-right`}>Diunduh</th>
                  <th className={`${adm.th} text-right`}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredDokumenList.map((doc) => (
                  <tr key={doc.id} className={adm.tr}>
                    <td className={adm.td}>
                      <p className="text-[14px] font-semibold text-[#1B2430]">{doc.judul}</p>
                      {doc.deskripsi && <p className="mt-0.5 line-clamp-1 text-[12px] text-[#5B6675]">{doc.deskripsi}</p>}
                    </td>
                    <td className={`${adm.td} tabular-nums`}>{doc.tahun}</td>
                    <td className={`${adm.td} whitespace-nowrap`}>
                      <span className="uppercase">{doc.file_extension || "PDF"}</span>
                      {Number.isFinite(Number(doc.file_size)) && Number(doc.file_size) > 0
                        ? ` · ${(Number(doc.file_size) / 1024 / 1024).toFixed(1)} MB`
                        : ""}
                    </td>
                    <td className={`${adm.td} text-right tabular-nums`}>{doc.download_count || 0}</td>
                    <td className={`${adm.td} whitespace-nowrap text-right`}>
                      <div className="inline-flex items-center gap-0.5">
                        <IconAction label="Unduh" icon={Download} href={`${API_BASE_URL}/dokumen/${doc.id}/download`} />
                        <IconAction label="Ubah" icon={Pencil} onClick={() => openEditModal(doc)} />
                        <IconAction label="Hapus" icon={Trash2} danger onClick={() => handleDelete(doc.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isModalOpen && (
        <AdminModal
          title={editingDokumen ? "Ubah dokumen" : "Unggah dokumen"}
          onClose={() => setIsModalOpen(false)}
          footer={
            <>
              <button type="button" onClick={() => setIsModalOpen(false)} className={adm.btnOutline}>
                Batal
              </button>
              <button type="submit" form="form-dokumen" disabled={saving} className={adm.btnPrimary}>
                {saving ? "Menyimpan…" : "Simpan"}
              </button>
            </>
          }
        >
          <form id="form-dokumen" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="judul" className={adm.label}>Judul</label>
              <input
                id="judul"
                type="text"
                required
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                placeholder="Contoh: SOP Pemeliharaan Pos AWLR 2026"
                className={adm.input}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="kategori" className={adm.label}>Kategori</label>
                <select
                  id="kategori"
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className={adm.input}
                >
                  {KATEGORI_OPTIONS.map((k) => (
                    <option key={k.nama} value={k.nama}>{k.nama}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="tahun" className={adm.label}>Tahun terbit</label>
                <input
                  id="tahun"
                  type="number"
                  required
                  value={formData.tahun}
                  onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                  className={adm.input}
                />
              </div>
            </div>

            <div>
              <label htmlFor="deskripsi" className={adm.label}>Deskripsi</label>
              <textarea
                id="deskripsi"
                rows={3}
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Ringkasan isi dokumen"
                className={adm.textarea}
              />
            </div>

            <div>
              <label htmlFor="berkas" className={adm.label}>Berkas</label>
              <input
                id="berkas"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="block w-full text-[13px] text-[#3D4756] file:mr-3 file:h-8 file:rounded-[6px] file:border file:border-[#AEB8C5] file:bg-white file:px-3 file:text-[13px] file:font-medium file:text-[#1B2430] hover:file:bg-[#F0F3F7]"
              />
              <span className={adm.hint}>
                PDF, DOC, XLS, atau ZIP, maksimal 20 MB.{editingDokumen ? " Kosongkan jika tidak mengganti berkas." : ""}
              </span>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
