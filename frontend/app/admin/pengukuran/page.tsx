"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Activity,
  Plus,
  Trash2,
  Loader2,
  X,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
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
    fetchData();
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
      case "Normal":   return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Waspada":  return "bg-amber-50 text-amber-700 border-amber-200";
      case "Siaga":    return "bg-orange-50 text-orange-700 border-orange-200";
      case "Awas":     return "bg-red-50 text-red-700 border-red-200";
      default:         return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#14396A]" />
            <span>Pengukuran &amp; Deret Waktu Sensor</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Input rekaman tinggi muka air (TMA), curah hujan harian, dan pantau status ambang siaga.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={openCsvModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Import CSV</span>
          </button>
          {/* Tombol Manual */}
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0E2A4E] hover:bg-[#14396A] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Input Manual</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <select
            value={filterPos}
            onChange={(e) => {
              setFilterPos(e.target.value);
              setPage(1);
            }}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#14396A]"
          >
            <option value="">Semua Pos Pemantauan</option>
            {posList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nama} ({p.kode_pos})
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPage(1);
            }}
            className="w-full sm:w-auto px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#14396A]"
          >
            <option value="">Semua Status Siaga</option>
            <option value="Normal">Normal</option>
            <option value="Waspada">Waspada</option>
            <option value="Siaga">Siaga</option>
            <option value="Awas">Awas</option>
          </select>
        </div>
      </div>

      {/* Table Data */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-2 text-[#0E2A4E]" />
            <span className="text-sm">Memuat data pengukuran...</span>
          </div>
        ) : pengukuranList.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            Tidak ada rekaman pengukuran yang ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="bg-[#0A2140] text-white text-xs uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Pos Pemantauan</th>
                  <th className="py-3 px-4">Waktu Rekam</th>
                  <th className="py-3 px-4">Nilai Terukur</th>
                  <th className="py-3 px-4">Satuan</th>
                  <th className="py-3 px-4">Ambang Batas Siaga</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pengukuranList.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900">
                        {item.pos?.nama || `Pos #${item.pos_id}`}
                      </div>
                      <div className="text-xs text-gray-400 font-mono">
                        {item.pos?.kode_pos}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-gray-600">
                      {new Date(item.recorded_at).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900 font-mono">
                      {item.nilai}
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-500">
                      {item.satuan}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(
                          item.status_siaga
                        )}`}
                      >
                        {item.status_siaga}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Hapus Rekaman"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Halaman {page} dari {totalPages}</span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
              >
                Sebelumnya
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded border border-gray-300 disabled:opacity-40 hover:bg-gray-50"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                Input Data Pengukuran Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Pilih Pos Pemantauan *
                </label>
                <select
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
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#14396A]"
                >
                  {posList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nama} ({p.jenis} - {p.kode_pos})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Waktu Rekaman (Tanggal &amp; Jam) *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.recorded_at}
                  onChange={(e) => setFormData({ ...formData, recorded_at: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#14396A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Nilai Angka *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.nilai}
                    onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
                    placeholder="Contoh: 1.85"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#14396A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Satuan *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.satuan}
                    onChange={(e) => setFormData({ ...formData, satuan: e.target.value })}
                    placeholder="m / mm"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#14396A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Status Ambang Batas Siaga
                </label>
                <select
                  value={formData.status_siaga}
                  onChange={(e) => setFormData({ ...formData, status_siaga: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#14396A]"
                >
                  <option value="Normal">Normal (Aman)</option>
                  <option value="Waspada">Waspada (Kuning)</option>
                  <option value="Siaga">Siaga (Oranye)</option>
                  <option value="Awas">Awas (Merah)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-lg bg-[#0E2A4E] hover:bg-[#14396A] text-white text-sm font-semibold shadow-sm transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {saving ? "Menyimpan..." : "Simpan Pengukuran"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-900">
                  Import Data dari CSV
                </h3>
              </div>
              <button
                onClick={() => setIsCsvModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-5">
          
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Petakan ke Pos Pemantauan *
                </label>
                <div className="relative">
                  <select
                    value={csvPosId}
                    onChange={(e) => setCsvPosId(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 pr-8 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#14396A]"
                  >
                    <option value="">— Pilih Pos —</option>
                    {posList.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.nama} ({p.jenis} — {p.kode_pos})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Upload File */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Pilih File CSV *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-emerald-400 rounded-xl p-6 text-center cursor-pointer transition-colors group"
                >
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-emerald-500 mx-auto mb-2 transition-colors" />
                  {csvFileName ? (
                    <p className="text-sm font-semibold text-gray-700">{csvFileName}</p>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Klik untuk pilih file <strong>.csv</strong>
                    </p>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,text/csv"
                    onChange={handleCsvFile}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Preview hasil parsing */}
              {csvParsed.length > 0 && (
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">
                      Hasil Parsing — {csvParsed.length} blok bulan ditemukan
                    </span>
                    <span className="text-xs text-emerald-700 font-bold">
                      Total {totalCsvRows.toLocaleString("id-ID")} rekaman siap diimpor
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto">
                    {csvParsed.map((block, idx) => (
                      <div key={idx} className="px-4 py-2.5 flex items-center justify-between text-sm">
                        <div>
                          <span className="font-semibold text-gray-800 capitalize">
                            {block.bulan} {block.tahun}
                          </span>
                          <span className="ml-2 text-xs text-gray-500">
                            Stasiun: {block.stasiun}
                          </span>
                        </div>
                        <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                          {block.rows.length} rekaman
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress bar */}
              {csvImporting && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Mengimpor rekaman...</span>
                    <span>{csvProgress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${csvProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Hasil import */}
              {csvDone && !csvImporting && (
                <div className={`rounded-lg p-4 border text-sm ${csvErrors.length === 0 ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                  {csvErrors.length === 0 ? (
                    <div className="flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="w-5 h-5" />
                      Import berhasil! Semua rekaman telah tersimpan di database.
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 font-semibold mb-2">
                        <AlertCircle className="w-5 h-5" />
                        Import selesai dengan {csvErrors.length} error
                      </div>
                      <ul className="text-xs space-y-1 max-h-24 overflow-y-auto">
                        {csvErrors.map((e, i) => (
                          <li key={i} className="font-mono truncate">{e}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tombol aksi */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCsvModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50"
                >
                  {csvDone ? "Tutup" : "Batal"}
                </button>
                {!csvDone && (
                  <button
                    type="button"
                    disabled={!csvPosId || csvParsed.length === 0 || csvImporting}
                    onClick={handleCsvImport}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold shadow-sm transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {csvImporting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Mengimpor {csvProgress}%...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Import {totalCsvRows > 0 ? `${totalCsvRows.toLocaleString("id-ID")} Rekaman` : ""}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
