import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // La lingua di default è l'italiano.
    return [{ source: "/", destination: "/it", permanent: false }];
  },
};

export default nextConfig;
