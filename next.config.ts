import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ] as RemotePattern[],
  },
};

export default nextConfig;
