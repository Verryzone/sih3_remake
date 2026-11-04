"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      toast.success("Login berhasil! Mengalihkan ke Panel Admin...");
      router.push("/admin");
    } else {
      setErrorMsg(res.message || "Gagal masuk. Periksa kembali email dan password Anda.");
      toast.error(res.message || "Gagal masuk.");
    }
  };

  const inputCls =
    "h-10 w-full rounded-[6px] border border-[#AEB8C5] bg-white px-3 text-[14px] text-[#1B2430] placeholder:text-[#8A96A6] focus:border-[#0B5CAD] focus:outline-none focus:ring-2 focus:ring-[#0B5CAD]/20";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-page px-4 py-12">
      <Image
        src="/brand/logo-header.png"
        alt="Portal SIH3 — Wilayah Sungai Serayu-Bogowonto dan Progo-Opak-Serang"
        width={363}
        height={60}
        priority
        className="mb-6 h-11 w-auto"
      />

      <div className="w-full max-w-sm rounded-[8px] border border-[#D5DBE3] bg-white p-6 sm:p-7">
        <h1 className="text-[20px] font-semibold text-[#1B2430]">Masuk Panel Kelola</h1>
        <p className="mt-1 text-[13px] text-[#5B6675]">Khusus pengelola data BBWS Serayu Opak.</p>

        {errorMsg && (
          <div role="alert" className="mt-4 rounded-[6px] border border-[#E88B84] bg-[#FBE3E1] px-3 py-2.5 text-[13px] text-[#8B1A12]">
            {errorMsg}
          </div>
        )}

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-[#1B2430]">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-[#1B2430]">
              Kata sandi
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 w-full items-center justify-center rounded-[6px] bg-[#14396A] text-[14px] font-semibold text-white transition-colors hover:bg-[#0E2A4E] disabled:opacity-60"
          >
            {loading ? "Memverifikasi…" : "Masuk"}
          </button>
        </form>
      </div>

      <Link href="/" className="mt-5 text-[13px] text-[#5B6675] hover:text-[#0B5CAD]">
        &larr; Kembali ke portal
      </Link>
    </div>
  );
}
