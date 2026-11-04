"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { AdminModal, AdminPageHeader, IconAction, adm } from "@/components/admin/ui";
import { API_BASE_URL } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { Pos } from "@/lib/types";
import { toast } from "sonner";

interface PengukuranItem {
  id: number;
  pos_id: number;
  recorded_at: string;
  nilai: number;
  satuan: string;
  status_siaga: "Normal" | "Waspada" | "Siaga" | "Awas";
  pos?: {
    id: number;
    nama: string;
    kode_pos: string;
    jenis: string;
    tipe: string;
  };
}

// ─── CSV Parser ────────────────────────────────────────────────────────────────
// Format: CSV ekspor Excel laporan ARR (Automatic Rain Recorder) / format BMKG-DPUP
// Setiap blok bulan dipisahkan baris #REF!
// Kolom: Tanggal, H.B, H.O, Jam 0-23 (24 kolom), Keterangan
// Kita ambil H.O (Hujan Otomatis) per jam → satuan mm

const BULAN_MAP: Record<string, number> = {
  januari: 1, febuari: 2, februari: 2, maret: 3, april: 4,
  mei: 5, juni: 6, juli: 7, agustus: 8, september: 9,
  oktober: 10, nopember: 11, november: 11, desember: 12,
};

interface ParsedRow {
  recorded_at: string; // ISO datetime string
  nilai: number;        // mm curah hujan
  satuan: string;
  status_siaga: string;
}

interface ParsedBlock {
  stasiun: string;
  bulan: string;
  tahun: number;
  rows: ParsedRow[];
}

/** RFC-4180 CSV parser — menghormati nilai bertanda-kutip yang berisi koma */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQ = !inQ;
    } else if (ch === "," && !inQ) {
      result.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

/** Konversi string angka format Indonesia ("1,5" → 1.5) ke float */
function parseVal(raw: string): number {
  if (!raw || raw.trim() === "" || raw.trim() === "-") return 0;
  const cleaned = raw.trim().replace(",", ".");
  const v = parseFloat(cleaned);
  return isNaN(v) ? 0 : v;
}

function parseArrCsv(csvText: string): ParsedBlock[] {
  const lines = csvText.split(/\r?\n/);
  const results: ParsedBlock[] = [];

  // Temukan posisi setiap blok bulan (diawali "#REF!")
  const blockStarts: number[] = [];
  lines.forEach((line, idx) => {
    if (line.startsWith("#REF!")) blockStarts.push(idx);
  });
  blockStarts.push(lines.length); // sentinel

  for (let b = 0; b < blockStarts.length - 1; b++) {
    const blockLines = lines.slice(blockStarts[b], blockStarts[b + 1]);

    let stasiun = "";
    let bulanStr = "";
    let tahun = 0;
    let dataStart = -1;

    for (let i = 0; i < blockLines.length; i++) {
      const cols = parseCsvLine(blockLines[i]);

      if (cols[0]?.trim() === "Stasiun" && cols[1]?.trim().startsWith(":")) {
        // cols[1] = ":  KALIBAWANG" → ambil setelah tanda ":"
        stasiun = cols[1].replace(/^:\s*/, "").trim() || cols[2]?.trim() || "";
      }
      if (cols[0]?.trim() === "Bulan" && cols[1]?.trim().startsWith(":")) {
        bulanStr = (cols[1].replace(/^:\s*/, "").trim() || cols[2]?.trim() || "").toLowerCase();
      }
      if (cols[0]?.trim() === "Tahun" && cols[1]?.trim().startsWith(":")) {
        tahun = parseInt(cols[1].replace(/^:\s*/, "").trim() || cols[2]?.trim() || "0") || 0;
      }
      // Header baris jam: cols[3]="0", cols[4]="1", ..., cols[26]="23"
      if (cols[3]?.trim() === "0" && cols[4]?.trim() === "1" && cols[26]?.trim() === "23") {
        dataStart = i + 1;
        break;
      }
    }

    if (!stasiun || !bulanStr || !tahun || dataStart < 0) continue;
    if (stasiun.toLowerCase().includes("sapon")) continue; // lewati sheet sapon

    const bulanNum = BULAN_MAP[bulanStr];
    if (!bulanNum) continue;

    const rows: ParsedRow[] = [];

    for (let i = dataStart; i < blockLines.length; i++) {
      const cols = parseCsvLine(blockLines[i]);
      const tanggal = parseInt(cols[0]?.trim());
      if (isNaN(tanggal) || tanggal < 1 || tanggal > 31) continue;

      // cols[3..26] = nilai curah hujan per jam 0..23
      for (let jam = 0; jam <= 23; jam++) {
        const nilai = parseVal(cols[3 + jam] || "");
        if (nilai <= 0) continue; // skip nol & kosong

        const dd = String(tanggal).padStart(2, "0");
        const mm = String(bulanNum).padStart(2, "0");
        const hh = String(jam).padStart(2, "0");

        rows.push({
          recorded_at: `${tahun}-${mm}-${dd}T${hh}:00:00`,
          nilai,
          satuan: "mm",
          status_siaga: "Normal",
        });
      }
    }

    if (rows.length > 0) {
      results.push({ stasiun, bulan: bulanStr, tahun, rows });
    }
  }

  return results;
}
// ──────────────────────────────────────────────────────────────────────────────

export default function AdminPengukuranPage() {
  const { token } = useAuth();
  const [pengukuranList, setPengukuranList] = useState<PengukuranItem[]>([]);
  const [posList, setPosList] = useState<Pos[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterPos, setFilterPos] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Modal Manual
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    pos_id: "",
    recorded_at: new Date().toISOString().slice(0, 16),
    nilai: "",
    satuan: "m",
    status_siaga: "Normal",
  });

  // Modal CSV
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvParsed, setCsvParsed] = useState<ParsedBlock[]>([]);
  const [csvPosId, setCsvPosId] = useState("");
  const [csvFileName, setCsvFileName] = useState("");
  const [csvImporting, setCsvImporting] = useState(false);
  const [csvProgress, setCsvProgress] = useState(0);
  const [csvDone, setCsvDone] = useState(false);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resPos, resPengukuran] = await Promise.all([
        axios.get(`${API_BASE_URL}/pos?per_page=100`),
        axios.get(
          `${API_BASE_URL}/pengukuran?page=${page}&per_page=20${
            filterPos ? `&pos_id=${filterPos}` : ""
          }${filterStatus ? `&status_siaga=${filterStatus}` : ""}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
      ]);

      setPosList(resPos.data?.data || []);
      setPengukuranList(resPengukuran.data?.data || []);
      setTotalPages(resPengukuran.data?.pagination?.last_page || 1);
    } catch {
      toast.error("Gagal memuat data pengukuran.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sinkronisasi data dari API saat filter/halaman berubah
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filterPos, filterStatus]);

  const openAddModal = () => {
    setFormData({
      pos_id: posList[0]?.id ? String(posList[0].id) : "",
      recorded_at: new Date().toISOString().slice(0, 16),
      nilai: "",
      satuan: "m",
      status_siaga: "Normal",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Hapus data rekaman pengukuran ini?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/pengukuran/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Data pengukuran berhasil dihapus.");
      fetchData();
    } catch {
      toast.error("Gagal menghapus data.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.post(
        `${API_BASE_URL}/pengukuran`,
        {
          ...formData,
          pos_id: parseInt(formData.pos_id),
          nilai: parseFloat(formData.nilai),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Rekaman pengukuran berhasil disimpan!");
      setIsModalOpen(false);
      fetchData();
    } catch (err: unknown) {
      let msg = "Gagal menyimpan rekaman pengukuran.";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.message || err.message;
      }
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  // ── CSV Handlers ──────────────────────────────────────────────────────────
  const openCsvModal = () => {
    setCsvParsed([]);
    setCsvPosId(posList[0]?.id ? String(posList[0].id) : "");
    setCsvFileName("");
    setCsvImporting(false);
    setCsvProgress(0);
    setCsvDone(false);
    setCsvErrors([]);
    setIsCsvModalOpen(true);
  };

  const handleCsvFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFileName(file.name);
    setCsvDone(false);
    setCsvErrors([]);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      try {
        const parsed = parseArrCsv(text);
        setCsvParsed(parsed);
        if (parsed.length === 0) {
          toast.error("Tidak ada data yang dapat dibaca dari CSV ini atau hanya berisi stasiun yang dikecualikan (misal Sapon).");
        } else {
          // Deteksi stasiun otomatis dan cocokkan dengan posList
          const detectedStation = parsed[0]?.stasiun?.toLowerCase() || "";
          const matchedPos = posList.find((p) =>
            p.nama.toLowerCase().includes(detectedStation) ||
            detectedStation.includes(p.nama.toLowerCase().replace(/arr|awlr|mat/g, "").trim())
          );
          if (matchedPos) {
            setCsvPosId(String(matchedPos.id));
            toast.info(`Pos otomatis terpetakan ke: ${matchedPos.nama}`);
          }
        }
      } catch {
        toast.error("Gagal membaca file CSV. Pastikan formatnya sesuai.");
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  const totalCsvRows = csvParsed.reduce((s, b) => s + b.rows.length, 0);

  const handleCsvImport = async () => {
    if (!csvPosId || csvParsed.length === 0) return;
    setCsvImporting(true);
    setCsvProgress(0);
    setCsvErrors([]);

    const allRows = csvParsed.flatMap((b) => b.rows);
    let success = 0;
    const errors: string[] = [];

    // Kirim batch 500 data ke endpoint batch
    const BATCH = 500;
    for (let i = 0; i < allRows.length; i += BATCH) {
      const batch = allRows.slice(i, i + BATCH);
      try {
        const res = await axios.post(
          `${API_BASE_URL}/pengukuran/batch`,
          {
            pos_id: parseInt(csvPosId),
            records: batch,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        success += res.data?.count || batch.length;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          errors.push(err.response?.data?.message || err.message);
        } else {
          errors.push("Gagal menyimpan batch data.");
        }
      }
      setCsvProgress(Math.min(100, Math.round(((i + batch.length) / allRows.length) * 100)));
    }

    setCsvImporting(false);
    setCsvDone(true);
    setCsvErrors(errors.slice(0, 10));

    if (success > 0) {
      toast.success(`${success} rekaman berhasil diimpor ke database!`);
      fetchData();
    }
    if (errors.length > 0) {
      toast.error(`${errors.length} batch gagal diimpor.`);
    }
  };
  // ─────────────────────────────────────────────────────────────────────────

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Normal":   return "border-status-good-border bg-status-good-bg text-status-good-fg";
      case "Waspada":  return "border-status-watch-border bg-status-watch-bg text-status-watch-fg";
      case "Siaga":    return "border-status-warning-border bg-status-warning-bg text-status-warning-fg";
      case "Awas":     return "border-status-danger-border bg-status-danger-bg text-status-danger-fg";
      default:         return "border-status-neutral-border bg-status-neutral-bg text-status-neutral-fg";
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        kicker="Pengukuran"
        title="Data pengukuran"
        description="Rekaman tinggi muka air dan curah hujan beserta status ambang siaga."
        actions={
          <>
            <button type="button" onClick={openCsvModal} className={adm.btnOutline}>
              Impor CSV
            </button>
            <button type="button" onClick={openAddModal} className={adm.btnPrimary}>
              Input manual
            </button>
          </>
        }
      />

      <section className={`${adm.card} overflow-hidden`}>
        <div className="flex flex-col gap-3 border-b border-[#D5DBE3] px-4 py-3 sm:flex-row sm:items-center">
          <label className="w-full sm:w-80">
            <span className="sr-only">Filter pos</span>
            <select
              value={filterPos}
              onChange={(e) => {
                setFilterPos(e.target.value);
                setPage(1);
              }}
              className={adm.input}
            >
              <option value="">Semua pos</option>
              {posList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nama} ({p.kode_pos})
                </option>
              ))}
            </select>
          </label>
          <label className="w-full sm:w-48">
            <span className="sr-only">Filter status</span>
            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setPage(1);
              }}
              className={adm.input}
            >
              <option value="">Semua status</option>
              <option value="Normal">Normal</option>
              <option value="Waspada">Waspada</option>
              <option value="Siaga">Siaga</option>
              <option value="Awas">Awas</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className={adm.empty}>Memuat data pengukuran…</div>
        ) : pengukuranList.length === 0 ? (
          <div className={adm.empty}>Tidak ada rekaman pengukuran.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className={adm.table}>
              <thead className={adm.thead}>
                <tr>
                  <th className={adm.th}>Pos</th>
                  <th className={adm.th}>Waktu rekam</th>
                  <th className={`${adm.th} text-right`}>Nilai</th>
                  <th className={adm.th}>Status</th>
                  <th className={`${adm.th} text-right`}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pengukuranList.map((item) => (
                  <tr key={item.id} className={adm.tr}>
                    <td className={adm.td}>
                      <p className="text-[14px] font-semibold text-[#1B2430]">{item.pos?.nama || `Pos #${item.pos_id}`}</p>
                      <p className="text-[12px] text-[#5B6675]">{item.pos?.kode_pos}</p>
                    </td>
                    <td className={`${adm.td} whitespace-nowrap tabular-nums`}>
                      {new Date(item.recorded_at).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                    </td>
                    <td className={`${adm.td} whitespace-nowrap text-right tabular-nums`}>
                      <span className="font-semibold text-[#1B2430]">{item.nilai}</span> {item.satuan}
                    </td>
                    <td className={adm.td}>
                      <span className={`inline-flex h-6 items-center rounded-full border px-2.5 text-[12px] font-medium ${getStatusBadge(item.status_siaga)}`}>
                        {item.status_siaga}
                      </span>
                    </td>
                    <td className={`${adm.td} text-right`}>
                      <IconAction label="Hapus" icon={Trash2} danger onClick={() => handleDelete(item.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between gap-3 border-t border-[#D5DBE3] px-4 py-3 text-[13px] text-[#5B6675]">
            <span>Halaman {page} dari {totalPages}</span>
            <div className="flex gap-2">
              <button type="button" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className={`${adm.btnOutline} h-8 px-3`}>
                Sebelumnya
              </button>
              <button type="button" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className={`${adm.btnOutline} h-8 px-3`}>
                Berikutnya
              </button>
            </div>
          </div>
        )}
      </section>

      {isModalOpen && (
        <AdminModal
          title="Input pengukuran"
          onClose={() => setIsModalOpen(false)}
          footer={
            <>
              <button type="button" onClick={() => setIsModalOpen(false)} className={adm.btnOutline}>
                Batal
              </button>
              <button type="submit" form="form-pengukuran" disabled={saving} className={adm.btnPrimary}>
                {saving ? "Menyimpan…" : "Simpan"}
              </button>
            </>
          }
        >
          <form id="form-pengukuran" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="pg-pos" className={adm.label}>Pos pemantauan</label>
              <select
                id="pg-pos"
                required
                value={formData.pos_id}
                onChange={(e) => {
                  const selPos = posList.find((p) => String(p.id) === e.target.value);
                  setFormData({
                    ...formData,
                    pos_id: e.target.value,
                    satuan: selPos?.tipe === "hidrometeorologi" ? "mm" : "m",
                  });
                }}
                className={adm.input}
              >
                {posList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama} ({p.jenis} · {p.kode_pos})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pg-waktu" className={adm.label}>Waktu rekaman</label>
              <input
                id="pg-waktu"
                type="datetime-local"
                required
                value={formData.recorded_at}
                onChange={(e) => setFormData({ ...formData, recorded_at: e.target.value })}
                className={adm.input}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pg-nilai" className={adm.label}>Nilai</label>
                <input
                  id="pg-nilai"
                  type="number"
                  step="0.01"
                  required
                  value={formData.nilai}
                  onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
                  placeholder="1.85"
                  className={adm.input}
                />
              </div>
              <div>
                <label htmlFor="pg-satuan" className={adm.label}>Satuan</label>
                <input
                  id="pg-satuan"
                  type="text"
                  required
                  value={formData.satuan}
                  onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                  placeholder="m / mm"
                  className={adm.input}
                />
              </div>
            </div>

            <div>
              <label htmlFor="pg-status" className={adm.label}>Status ambang siaga</label>
              <select
                id="pg-status"
                value={formData.status_siaga}
                onChange={(e) => setFormData({ ...formData, status_siaga: e.target.value })}
                className={adm.input}
              >
                <option value="Normal">Normal</option>
                <option value="Waspada">Waspada</option>
                <option value="Siaga">Siaga</option>
                <option value="Awas">Awas</option>
              </select>
            </div>
          </form>
        </AdminModal>
      )}

      {isCsvModalOpen && (
        <AdminModal
          title="Impor data dari CSV"
          onClose={() => setIsCsvModalOpen(false)}
          wide
          footer={
            <>
              <button type="button" onClick={() => setIsCsvModalOpen(false)} className={adm.btnOutline}>
                {csvDone ? "Tutup" : "Batal"}
              </button>
              {!csvDone && (
                <button
                  type="button"
                  disabled={!csvPosId || csvParsed.length === 0 || csvImporting}
                  onClick={handleCsvImport}
                  className={adm.btnPrimary}
                >
                  {csvImporting
                    ? `Mengimpor ${csvProgress}%…`
                    : `Impor${totalCsvRows > 0 ? ` ${totalCsvRows.toLocaleString("id-ID")} rekaman` : ""}`}
                </button>
              )}
            </>
          }
        >
          <div className="space-y-5">
            <div>
              <label htmlFor="csv-pos" className={adm.label}>Petakan ke pos</label>
              <select id="csv-pos" value={csvPosId} onChange={(e) => setCsvPosId(e.target.value)} className={adm.input}>
                <option value="">Pilih pos…</option>
                {posList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama} ({p.jenis} · {p.kode_pos})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="csv-file" className={adm.label}>Berkas CSV</label>
              <input
                id="csv-file"
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleCsvFile}
                className="block w-full text-[13px] text-[#3D4756] file:mr-3 file:h-8 file:rounded-[6px] file:border file:border-[#AEB8C5] file:bg-white file:px-3 file:text-[13px] file:font-medium file:text-[#1B2430] hover:file:bg-[#F0F3F7]"
              />
              <span className={adm.hint}>
                {csvFileName ? `Dipilih: ${csvFileName}` : "Format laporan ARR (BMKG/DPUP), satu blok per bulan."}
              </span>
            </div>

            {csvParsed.length > 0 && (
              <div className="overflow-hidden rounded-[6px] border border-[#D5DBE3]">
                <div className="flex items-center justify-between gap-3 border-b border-[#D5DBE3] bg-[#F5F7FA] px-4 py-2.5 text-[12px]">
                  <span className="font-semibold text-[#1B2430]">{csvParsed.length} blok bulan ditemukan</span>
                  <span className="text-[#5B6675]">{totalCsvRows.toLocaleString("id-ID")} rekaman siap diimpor</span>
                </div>
                <ul className="max-h-48 divide-y divide-[#E9EDF2] overflow-y-auto">
                  {csvParsed.map((block, idx) => (
                    <li key={idx} className="flex items-center justify-between px-4 py-2.5 text-[13px]">
                      <span>
                        <span className="font-semibold capitalize text-[#1B2430]">{block.bulan} {block.tahun}</span>
                        <span className="ml-2 text-[12px] text-[#5B6675]">Stasiun {block.stasiun}</span>
                      </span>
                      <span className="tabular-nums text-[#3D4756]">{block.rows.length} rekaman</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {csvImporting && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[12px] text-[#5B6675]">
                  <span>Mengimpor rekaman…</span>
                  <span className="tabular-nums">{csvProgress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#EEF1F5]">
                  <div className="h-full rounded-full bg-[#14396A] transition-all duration-300" style={{ width: `${csvProgress}%` }} />
                </div>
              </div>
            )}

            {csvDone && !csvImporting && (
              <div
                role="status"
                className={`rounded-[6px] border px-4 py-3 text-[13px] ${
                  csvErrors.length === 0
                    ? "border-status-good-border bg-status-good-bg text-status-good-fg"
                    : "border-status-watch-border bg-status-watch-bg text-status-watch-fg"
                }`}
              >
                {csvErrors.length === 0 ? (
                  <p className="font-semibold">Impor berhasil. Semua rekaman tersimpan.</p>
                ) : (
                  <>
                    <p className="font-semibold">Impor selesai dengan {csvErrors.length} galat.</p>
                    <ul className="mt-2 max-h-24 space-y-1 overflow-y-auto text-[12px]">
                      {csvErrors.map((e, i) => (
                        <li key={i} className="truncate font-mono">{e}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </AdminModal>
      )}
    </div>
  );
}
