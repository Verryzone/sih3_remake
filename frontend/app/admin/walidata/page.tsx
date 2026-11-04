"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { AdminModal, AdminPageHeader, IconAction, adm } from "@/components/admin/ui";
import { API_BASE_URL } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { Walidata } from "@/lib/types";
import { toast } from "sonner";

export default function AdminWalidataPage() {
  const { token } = useAuth();
  const [walidataList, setWalidataList] = useState<Walidata[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWalidata, setEditingWalidata] = useState<Walidata | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    singkatan: "",
    deskripsi: "",
    alamat: "",
    telepon: "",
    whatsapp: "",
    email: "",
    website: "",
    url_layanan_data: "",
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/walidata`);
      setWalidataList(res.data?.data || []);
    } catch {
      toast.error("Gagal memuat direktori walidata.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let aktif = true;
    axios
      .get(`${API_BASE_URL}/walidata`)
      .then((res) => {
        if (aktif) setWalidataList(res.data?.data || []);
      })
      .catch(() => {
        if (aktif) toast.error("Gagal memuat direktori walidata.");
      })
      .finally(() => {
        if (aktif) setLoading(false);
      });
    return () => {
      aktif = false;
    };
  }, []);

  const openAddModal = () => {
    setEditingWalidata(null);
    setFormData({
      nama: "",
      singkatan: "",
      deskripsi: "",
      alamat: "",
      telepon: "",
      whatsapp: "",
      email: "",
      website: "",
      url_layanan_data: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (w: Walidata) => {
    setEditingWalidata(w);
    setFormData({
      nama: w.nama || "",
      singkatan: w.singkatan || "",
      deskripsi: w.deskripsi || "",
      alamat: (w as Walidata & { alamat?: string }).alamat || "",
      telepon: w.kontak_telp || "",
      whatsapp: w.kontak_wa || "",
      email: (w as Walidata & { email?: string }).email || "",
      website: w.website_url || "",
      url_layanan_data: w.layanan_url || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data mitra walidata ini?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/walidata/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Mitra walidata berhasil dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus mitra walidata.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingWalidata) {
        await axios.put(`${API_BASE_URL}/walidata/${editingWalidata.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Data mitra walidata berhasil diperbarui!");
      } else {
        await axios.post(`${API_BASE_URL}/walidata`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Mitra walidata baru berhasil ditambahkan!");
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err: unknown) {
      let msg = "Gagal menyimpan mitra walidata.";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message;
      }
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const field = (
    id: keyof typeof formData,
    label: string,
    opts: { type?: string; required?: boolean; placeholder?: string } = {}
  ) => (
    <div>
      <label htmlFor={`f-${id}`} className={adm.label}>{label}</label>
      <input
        id={`f-${id}`}
        type={opts.type || "text"}
        required={opts.required}
        value={formData[id]}
        onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
        placeholder={opts.placeholder}
        className={adm.input}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="Walidata"
        title="Instansi walidata"
        description="Profil, kontak, dan tautan layanan instansi yang tampil di halaman Walidata publik."
        actions={
          <button type="button" onClick={openAddModal} className={adm.btnPrimary}>
            Tambah instansi
          </button>
        }
      />

      <section className={`${adm.card} overflow-hidden`}>
        {loading ? (
          <div className={adm.empty}>Memuat walidata…</div>
        ) : walidataList.length === 0 ? (
          <div className={adm.empty}>Belum ada instansi walidata.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className={adm.table}>
              <thead className={adm.thead}>
                <tr>
                  <th className={adm.th}>Instansi</th>
                  <th className={adm.th}>WhatsApp</th>
                  <th className={adm.th}>Telepon</th>
                  <th className={adm.th}>Website</th>
                  <th className={`${adm.th} text-right`}>Pos</th>
                  <th className={`${adm.th} text-right`}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {walidataList.map((item) => (
                  <tr key={item.id} className={adm.tr}>
                    <td className={adm.td}>
                      <p className="text-[14px] font-semibold text-[#1B2430]">{item.nama}</p>
                      <p className="text-[12px] text-[#5B6675]">{item.singkatan}</p>
                    </td>
                    <td className={`${adm.td} whitespace-nowrap tabular-nums`}>{item.kontak_wa || "—"}</td>
                    <td className={`${adm.td} whitespace-nowrap tabular-nums`}>{item.kontak_telp || "—"}</td>
                    <td className={`${adm.td} max-w-[220px]`}>
                      {item.website_url ? (
                        <a href={item.website_url} target="_blank" rel="noreferrer" className={`${adm.rowAction} block truncate`}>
                          {item.website_url.replace(/^https?:\/\//, "")}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className={`${adm.td} text-right tabular-nums`}>{item.pos_count || 0}</td>
                    <td className={`${adm.td} whitespace-nowrap text-right`}>
                      <div className="inline-flex items-center gap-0.5">
                        <IconAction label="Ubah" icon={Pencil} onClick={() => openEditModal(item)} />
                        <IconAction label="Hapus" icon={Trash2} danger onClick={() => handleDelete(item.id)} />
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
          title={editingWalidata ? "Ubah instansi" : "Tambah instansi"}
          onClose={() => setIsModalOpen(false)}
          footer={
            <>
              <button type="button" onClick={() => setIsModalOpen(false)} className={adm.btnOutline}>
                Batal
              </button>
              <button type="submit" form="form-walidata" disabled={saving} className={adm.btnPrimary}>
                {saving ? "Menyimpan…" : "Simpan"}
              </button>
            </>
          }
        >
          <form id="form-walidata" onSubmit={handleSubmit} className="space-y-4">
            {field("nama", "Nama instansi", { required: true, placeholder: "Balai Besar Wilayah Sungai Serayu Opak" })}
            <div className="grid grid-cols-2 gap-4">
              {field("singkatan", "Singkatan", { required: true, placeholder: "BBWS SO" })}
              {field("whatsapp", "WhatsApp", { placeholder: "+628123456789" })}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {field("telepon", "Telepon kantor", { placeholder: "(0274) 489172" })}
              {field("email", "Email", { type: "email", placeholder: "humas@instansi.go.id" })}
            </div>
            <div>
              <label htmlFor="f-alamat" className={adm.label}>Alamat kantor</label>
              <textarea
                id="f-alamat"
                rows={2}
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                className={adm.textarea}
              />
            </div>
            {field("website", "Website", { type: "url", placeholder: "https://…" })}
            {field("url_layanan_data", "Tautan permintaan data", { type: "url", placeholder: "https://…" })}
          </form>
        </AdminModal>
      )}
    </div>
  );
}
