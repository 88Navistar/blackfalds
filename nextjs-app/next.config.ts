import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
    SC_DISABLE_SPEEDY: "false",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/index.:ext(php|html)",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sitemap.:ext(php|html)",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/donation.:ext(php|html)",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/trivia.:ext(php|html)",
        destination: "/",
        permanent: true,
      },
      {
        source: "/location.:ext(php|html)",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact.:ext(php|html)",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/veterans.:ext(php|html)",
        destination: "/projects/blackfalds-veterans-memorial",
        permanent: true,
      },
      {
        source: "/faith.:ext(php|html)",
        destination: "/",
        permanent: true,
      },
      {
        source: "/walkingtours.:ext(php|html)",
        destination:
          "/projects/on-this-spot-blackfalds-history-at-your-fingertips",
        permanent: true,
      },
      {
        source: "/pdfs/Wigmore-Uniform-Project.pdf",
        destination: "/projects/the-wigmore-uniform-project",
        permanent: true,
      },
      {
        source: "/mural.:ext(php|html)",
        destination: "/projects/iron-ridge-secondary-campus-mural",
        permanent: true,
      },
      {
        source: "/mural-gregson.:ext(php|html)",
        destination: "/projects/arthur-d-gregson-entomologist",
        permanent: true,
      },
      {
        source: "/mural-buffalotrail.:ext(php|html)",
        destination: "/projects/buffalo-lake-trail",
        permanent: true,
      },
      {
        source: "/mural-whitfordhouse.:ext(php|html)",
        destination: "/projects/whitford-stopping-house",
        permanent: true,
      },
      {
        source: "/mural-CEtrail.:ext(php|html)",
        destination: "/projects/c-and-e-trail",
        permanent: true,
      },
      {
        source: "/mural-early.:ext(php|html)",
        destination: "/projects/early-exploration-alberta",
        permanent: true,
      },
      {
        source: "/mural-Dam.:ext(php|html)",
        destination: "/projects/blindman-river-dam",
        permanent: true,
      },
      {
        source: "/mural-Name.:ext(php|html)",
        destination: "/projects/how-the-blindman-river-got-its-name",
        permanent: true,
      },
      {
        source: "/translations.:ext(php|html)",
        destination: "/resources/indigenous-translations",
        permanent: true,
      },
      {
        source: "/sources.:ext(php|html)",
        destination: "/resources/mural-sources",
        permanent: true,
      },
      {
        source: "/membership.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/help.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
