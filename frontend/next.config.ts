import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /publikasi digabung ke Galeri › Dokumen (satu halaman resmi).
      { source: "/publikasi", destination: "/galeri/dokumen", permanent: true },
    ];
  },
};

export default nextConfig;
