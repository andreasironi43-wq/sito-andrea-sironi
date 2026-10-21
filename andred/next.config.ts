import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // CSS inline nell'HTML: niente richiesta bloccante prima del primo render.
  experimental: { inlineCss: true },
  async redirects() {
    // La lingua di default è l'italiano.
    return [{ source: "/", destination: "/it", permanent: false }];
  },
};

export default nextConfig;
