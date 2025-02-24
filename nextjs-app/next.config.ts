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
        source: "/:path*",
        destination: "/:path*",
        permanent: true,
        has: [
          {
            type: "host",
            value: "blackfaldshistoricalsociety.com",
          },
        ],
      },
      {
        source: "/:path*",
        destination: "/:path*",
        permanent: true,
        has: [
          {
            type: "host",
            value: "www.blackfaldshistoricalsociety.com",
          },
        ],
      },
      {
        source: "/index.:ext(php|html)?",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:path+(?!php|html|xml)/",
        destination: "/:path+",
        permanent: true,
      },
      {
        source: "/:path*.php",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/sitemap.php",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/donation.:(php|html)?",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/trivia.:(php|html)?",
        destination: "/",
        permanent: true,
      },
      {
        source: "/location.:(php|html)?",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact.:(php|html)?",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/veterans.:(php|html)?",
        destination: "/projects/blackfalds-veterans-memorial",
        permanent: true,
      },
      {
        source: "/faith.:(php|html)?",
        destination: "/",
        permanent: true,
      },
      {
        source: "/walkingtours.:(php|html)?",
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
        source: "/mural.:(php|html)?",
        destination: "/projects/iron-ridge-secondary-campus-mural",
        permanent: true,
      },
      {
        source: "/mural-gregson.:(php|html)?",
        destination: "/projects/arthur-d-gregson-entomologist",
        permanent: true,
      },
      {
        source: "/mural-buffalotrail.:(php|html)?",
        destination: "/projects/buffalo-lake-trail",
        permanent: true,
      },
      {
        source: "/mural-whitfordhouse.:(php|html)?",
        destination: "/projects/whitford-stopping-house",
        permanent: true,
      },
      {
        source: "/mural-CEtrail.:(php|html)?",
        destination: "/projects/c-and-e-trail",
        permanent: true,
      },
      {
        source: "/mural-early.:(php|html)?",
        destination: "/projects/early-exploration-alberta",
        permanent: true,
      },
      {
        source: "/mural-Dam.:(php|html)?",
        destination: "/projects/blindman-river-dam",
        permanent: true,
      },
      {
        source: "/mural-Name.:(php|html)?",
        destination: "/projects/how-the-blindman-river-got-its-name",
        permanent: true,
      },
      {
        source: "/translations.:(php|html)?",
        destination: "/resources/indigenous-translations",
        permanent: true,
      },
      {
        source: "/sources.:(php|html)?",
        destination: "/resources/mural-sources",
        permanent: true,
      },
      {
        source: "/membership.:(html)?",
        destination: "/",
        permanent: true,
      },
      {
        source: "/help.:(html)?",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
