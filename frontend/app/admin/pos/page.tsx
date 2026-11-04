 "use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, X } from "lucide-react";
import { AdminPageHeader, IconAction, adm } from "@/components/admin/ui";
import { API_BASE_URL } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { Pos, Walidata } from "@/lib/types";
import { toast } from "sonner";

// Daftar kategori tipe pos
const KATEGORI_POS = [
  {
    tipe: "hidrologi",
    label: "Pos Hidrologi",
    deskripsi: "Stasiun duga air (AWLR) dan pemantauan aliran sungai.",
  },
  {
    tipe: "hidrometeorologi",
    label: "Pos Hidrometeorologi",
    deskripsi: "Pos curah hujan (ARR) dan parameter klimatologi wilayah.",
  },
  {
    tipe: "hidrogeologi",
    label: "Pos Hidrogeologi",
    deskripsi: "Sumur pantau air tanah (MAT) dan investigasi akuifer.",
  },
];

// Mapping jenis alat yang valid sesuai dengan database
const PILIHAN_JENIS_ALAT: Record<string, string[]> = {
  hidrologi: ["AWLR", "Kualitas Air"],
  hidrometeorologi: ["ARR", "Klimatologi"],
  hidrogeologi: ["MAT"],
};

// Daftar Kabupaten/Kota berdasarkan Provinsi
const DAFTAR_KABUPATEN: Record<string, string[]> = {
  "D.I. Yogyakarta": [
    "Gunungkidul",
    "Kota Yogyakarta",
    "Kulon Progo",
    "Sleman",
  ],
  "Jawa Tengah": [
    "Banjarnegara",
    "Banyumas",
    "Batang",
    "Boyolali",
    "Brebes",
    "Cilacap",
    "Kebumen",
    "Kendal",
    "Klaten",
    "Kota Magelang",
    "Magelang",
    "Pekalongan",
    "Pemalang",
    "Purbalingga",
    "Purworejo",
    "Semarang",
    "Sukoharjo",
    "Temanggung",
    "Wonogiri",
    "Wonosobo",
  ],
};

export default function AdminPosPage() {
  const { token } = useAuth();
  const [posList, setPosList] = useState<Pos[]>([]);
  const [walidataList, setWalidataList] = useState<Walidata[]>([]);
  const [loading, setLoading] = useState(false);
 
  // State untuk navigasi kategori aktif
  const [activeTipe, setActiveTipe] = useState<string>("");
  const [search, setSearch] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPos, setEditingPos] = useState<Pos | null>(null);
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    nama: "",
    kode_pos: "",
    tipe: "hidrologi",
    jenis: "AWLR",
    wilayah_sungai: "WS Progo-Opak-Serang",
    das: "DAS Progo",
    sub_das: "",
    sungai: "",
    desa: "",
    kecamatan: "",
    kabupaten: "Sleman",
    provinsi: "D.I. Yogyakarta",
    latitude: "",
    longitude: "",
    status_alat: "aktif",
    foto_path: "",
    walidata_id: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resPos, resWali] = await Promise.all([
        axios.get(`${API_BASE_URL}/pos?per_page=100`),
        axios.get(`${API_BASE_URL}/walidata`),
      ]);
      setPosList(resPos.data?.data || []);
      setWalidataList(resWali.data?.data || []);
    } catch {
      toast.error("Gagal memuat daftar pos pemantauan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- muat data awal dari API
    fetchData();
  }, []);

  const openAddModal = (defaultTipe = "hidrologi") => {
    setEditingPos(null);
    const defaultJenis = PILIHAN_JENIS_ALAT[defaultTipe]?.[0] || "AWLR";
    setFormData({
      nama: "",
      kode_pos: "",
      tipe: defaultTipe,
      jenis: defaultJenis,
      wilayah_sungai: "WS Progo-Opak-Serang",
      das: "DAS Progo",
      sub_das: "",
      sungai: "",
      desa: "",
      kecamatan: "",
      kabupaten: "Sleman",
      provinsi: "D.I. Yogyakarta",
      latitude: "",
      longitude: "",
      status_alat: "aktif",
      foto_path: "",
      walidata_id: walidataList[0]?.id ? String(walidataList[0].id) : "",
    });
    setIsModalOpen(true);
  };
  const openEditModal = (pos: Pos) => {
    setEditingPos(pos);
    setFormData({
      nama: pos.nama || "",
      kode_pos: pos.kode_pos || "",
      tipe: pos.tipe || "hidrologi",
      jenis: pos.jenis || "AWLR",
      wilayah_sungai: pos.wilayah_sungai || "WS Progo-Opak-Serang",
      das: pos.das || "",
      sub_das: pos.sub_das || "",
      sungai: pos.sungai || "",
      desa: pos.desa || "",
      kecamatan: pos.kecamatan || "",
      kabupaten: pos.kabupaten || "",
      provinsi: pos.provinsi || "D.I. Yogyakarta",
      latitude: pos.latitude ? String(pos.latitude) : "",
      longitude: pos.longitude ? String(pos.longitude) : "",
      status_alat: pos.status_alat || "aktif",
      foto_path: pos.foto_path || "",
      walidata_id: pos.walidata_id ? String(pos.walidata_id) : "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus pos pemantauan ini?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/pos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Pos pemantauan berhasil dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus pos pemantauan.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        walidata_id: formData.walidata_id ? parseInt(formData.walidata_id) : null,
      };

      if (editingPos) {
        await axios.put(`${API_BASE_URL}/pos/${editingPos.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Data pos berhasil diperbarui!");
      } else {
        await axios.post(`${API_BASE_URL}/pos`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Pos pemantauan baru berhasil ditambahkan!");
      }

      setIsModalOpen(false);
      fetchData();
    } catch (err: unknown) {
      let msg = "Gagal menyimpan data pos.";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message;
      }
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  // Filter data berdasarkan kategori tipe aktif dan pencarian
  const filteredList = posList.filter((item) => {
    const matchesTipe = activeTipe ? item.tipe === activeTipe : true;
    const matchesSearch =
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.kode_pos.toLowerCase().includes(search.toLowerCase()) ||
      (item.das && item.das.toLowerCase().includes(search.toLowerCase())) ||
      (item.kabupaten && item.kabupaten.toLowerCase().includes(search.toLowerCase()));

    return matchesTipe && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="Pos pemantauan"
        title="Pos pemantauan"
        description="Data stasiun hidrologi, hidrometeorologi, dan hidrogeologi yang tampil di portal."
        actions={
          <button type="button" onClick={() => openAddModal(activeTipe || "hidrologi")} className={adm.btnPrimary}>
            Tambah pos
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTipe("")}
          aria-pressed={activeTipe === ""}
          className={`${adm.pill} ${activeTipe === "" ? adm.pillActive : adm.pillIdle}`}
        >
          Semua <span className="ml-1 tabular-nums opacity-80">{posList.length}</span>
        </button>
        {KATEGORI_POS.map((kat) => (
          <button
            key={kat.tipe}
            type="button"
            onClick={() => setActiveTipe(kat.tipe)}
            aria-pressed={activeTipe === kat.tipe}
            className={`${adm.pill} ${activeTipe === kat.tipe ? adm.pillActive : adm.pillIdle}`}
          >
            {kat.label.replace("Pos ", "")}
            <span className="ml-1 tabular-nums opacity-80">{posList.filter((p) => p.tipe === kat.tipe).length}</span>
          </button>
        ))}
      </div>

      <section className={`${adm.card} overflow-hidden`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D5DBE3] px-4 py-3">
          <p className="text-[13px] text-[#5B6675]">
            {KATEGORI_POS.find((k) => k.tipe === activeTipe)?.deskripsi ?? "Semua pos pemantauan."}
          </p>
          <label className="w-full sm:w-72">
            <span className="sr-only">Cari pos</span>
            <input
              type="search"
              placeholder="Cari nama, kode, DAS, kabupaten…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={adm.input}
            />
          </label>
        </div>

        {loading ? (
          <div className={adm.empty}>Memuat data pos…</div>
        ) : filteredList.length === 0 ? (
          <div className={adm.empty}>
            <p>Tidak ada pos yang sesuai.</p>
            <button type="button" onClick={() => openAddModal(activeTipe || "hidrologi")} className={`${adm.btnOutline} mt-4`}>
              Tambah pos
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={adm.table}>
              <thead className={adm.thead}>
                <tr>
                  <th className={adm.th}>Pos</th>
                  <th className={adm.th}>Jenis</th>
                  <th className={adm.th}>DAS / Sungai</th>
                  <th className={adm.th}>Kabupaten</th>
                  <th className={adm.th}>Status alat</th>
                  <th className={`${adm.th} text-right`}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.map((pos) => (
                  <tr key={pos.id} className={adm.tr}>
                    <td className={adm.td}>
                      <p className="text-[14px] font-semibold text-[#1B2430]">{pos.nama}</p>
                      <p className="text-[12px] tabular-nums text-[#5B6675]">{pos.kode_pos}</p>
                    </td>
                    <td className={`${adm.td} whitespace-nowrap`}>{pos.jenis}</td>
                    <td className={adm.td}>
                      <p>{pos.das || "—"}</p>
                      {pos.sungai && <p className="text-[12px] text-[#5B6675]">{pos.sungai}</p>}
                    </td>
                    <td className={adm.td}>{pos.kabupaten || "—"}</td>
                    <td className={adm.td}>
                      <span
                        className={`inline-flex h-6 items-center rounded-full border px-2.5 text-[12px] font-medium capitalize ${
                          (pos.status_alat || "aktif") === "aktif"
                            ? "border-status-good-border bg-status-good-bg text-status-good-fg"
                            : "border-status-neutral-border bg-status-neutral-bg text-status-neutral-fg"
                        }`}
                      >
                        {pos.status_alat || "aktif"}
                      </span>
                    </td>
                    <td className={`${adm.td} whitespace-nowrap text-right`}>
                      <div className="inline-flex items-center gap-0.5">
                        <IconAction label="Ubah" icon={Pencil} onClick={() => openEditModal(pos)} />
                        <IconAction label="Hapus" icon={Trash2} danger onClick={() => handleDelete(pos.id)} />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A2140]/60 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[8px] bg-white">
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#D5DBE3] bg-white px-5 py-3.5">
              <h3 className="text-[15px] font-semibold text-[#1B2430]">
                {editingPos ? "Ubah Data Pos Pemantauan" : "Tambah Pos Pemantauan Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Tutup" className="rounded-[6px] p-1 text-[#5B6675] hover:bg-[#F0F3F7] hover:text-[#1B2430]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={adm.label}>
                    Nama Pos *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Contoh: AWLR Kranggan"
                    className={adm.input}
                  />
                </div>
                <div>
                  <label className={adm.label}>
                    Kode Pos *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.kode_pos}
                    onChange={(e) => setFormData({ ...formData, kode_pos: e.target.value })}
                    placeholder="Contoh: KRG-01"
                    className={adm.input}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={adm.label}>
                    Tipe Data *
                  </label>
                  <select
                    value={formData.tipe}
                    onChange={(e) => {
                      const newTipe = e.target.value;
                      const defaultJenis = PILIHAN_JENIS_ALAT[newTipe]?.[0] || "AWLR";
                      setFormData({
                        ...formData,
                        tipe: newTipe,
                        jenis: defaultJenis
                      });
                    }}
                    className={adm.input}
                  >
                    <option value="hidrologi">Hidrologi</option>
                    <option value="hidrometeorologi">Hidrometeorologi</option>
                    <option value="hidrogeologi">Hidrogeologi</option>
                  </select>
                </div>
                <div>
                  <label className={adm.label}>
                    Jenis Alat *
                  </label>
                  <select
                    required
                    value={formData.jenis}
                    onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                    className={adm.input}
                  >
                    {(PILIHAN_JENIS_ALAT[formData.tipe] || ["AWLR"]).map((j) => (
                      <option key={j} value={j}>
                        {j}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={adm.label}>
                    Wilayah Sungai *
                  </label>
                  <select
                    required
                    value={formData.wilayah_sungai}
                    onChange={(e) => setFormData({ ...formData, wilayah_sungai: e.target.value })}
                    className={adm.input}
                  >
                    <option value="WS Progo-Opak-Serang">WS Progo-Opak-Serang</option>
                    <option value="WS Serayu Bogowonto">WS Serayu Bogowonto</option>
                  </select>
                </div>
                <div>
                  <label className={adm.label}>
                    DAS
                  </label>
                  <input
                    type="text"
                    value={formData.das}
                    onChange={(e) => setFormData({ ...formData, das: e.target.value })}
                    placeholder="DAS Progo"
                    className={adm.input}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={adm.label}>
                    Sub-DAS
                  </label>
                  <input
                    type="text"
                    value={formData.sub_das}
                    onChange={(e) => setFormData({ ...formData, sub_das: e.target.value })}
                    placeholder="Sub-DAS Bedog"
                    className={adm.input}
                  />
                </div>
                <div>
                  <label className={adm.label}>
                    Sungai
                  </label>
                  <input
                    type="text"
                    value={formData.sungai}
                    onChange={(e) => setFormData({ ...formData, sungai: e.target.value })}
                    placeholder="Sungai Progo"
                    className={adm.input}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={adm.label}>
                    Desa / Kelurahan
                  </label>
                  <input
                    type="text"
                    value={formData.desa}
                    onChange={(e) => setFormData({ ...formData, desa: e.target.value })}
                    placeholder="Desa Sinduadi"
                    className={adm.input}
                  />
                </div>
                <div>
                  <label className={adm.label}>
                    Kecamatan
                  </label>
                  <input
                    type="text"
                    value={formData.kecamatan}
                    onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                    placeholder="Kecamatan Mlati"
                    className={adm.input}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={adm.label}>
                    Provinsi *
                  </label>
                  <select
                    required
                    value={formData.provinsi}
                    onChange={(e) => {
                      const newProvinsi = e.target.value;
                      const defaultKabupaten = DAFTAR_KABUPATEN[newProvinsi]?.[0] || "";
                      setFormData({
                        ...formData,
                        provinsi: newProvinsi,
                        kabupaten: defaultKabupaten,
                      });
                    }}
                    className={adm.input}
                  >
                    <option value="D.I. Yogyakarta">D.I. Yogyakarta</option>
                    <option value="Jawa Tengah">Jawa Tengah</option>
                  </select>
                </div>
                <div>
                  <label className={adm.label}>
                    Kabupaten / Kota *
                  </label>
                  <select
                    required
                    value={formData.kabupaten}
                    onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
                    className={adm.input}
                  >
                    {(DAFTAR_KABUPATEN[formData.provinsi] || []).map((kab) => (
                      <option key={kab} value={kab}>
                        {kab}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={adm.label}>
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    placeholder="-7.765432"
                    className={adm.input}
                  />
                </div>
                <div>
                  <label className={adm.label}>
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    placeholder="110.345678"
                    className={adm.input}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={adm.label}>
                    Mitra Walidata Pengelola
                  </label>
                  <select
                    value={formData.walidata_id}
                    onChange={(e) => setFormData({ ...formData, walidata_id: e.target.value })}
                    className={adm.input}
                  >
                    <option value="">-- Tanpa Mitra / BBWS SO Langsung --</option>
                    {walidataList.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.nama} ({w.singkatan})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={adm.label}>
                    Status Operasional Alat
                  </label>
                  <select
                    value={formData.status_alat}
                    onChange={(e) => setFormData({ ...formData, status_alat: e.target.value })}
                    className={adm.input}
                  >
                    <option value="aktif">Aktif (Beroperasi)</option>
                    <option value="rusak">Rusak / Tidak Aktif</option>
                    <option value="perbaikan">Dalam Perbaikan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={adm.label}>
                  URL / Path Foto Pos (`foto_path`)
                </label>
                <input
                  type="text"
                  value={formData.foto_path}
                  onChange={(e) => setFormData({ ...formData, foto_path: e.target.value })}
                  placeholder="/images/pos/awlr-kranggan.jpg"
                  className={adm.input}
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={adm.btnOutline}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={adm.btnPrimary}
                >
                  {saving ? "Menyimpan..." : "Simpan Data Pos"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 