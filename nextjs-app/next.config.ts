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
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/sitemap.php",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/donation.php",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/trivia.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/trivia.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/location.php",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/location.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact.php",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/veterans.php",
        destination: "/projects/blackfalds-veterans-memorial",
        permanent: true,
      },
      {
        source: "/veterans.html",
        destination: "/projects/blackfalds-veterans-memorial",
        permanent: true,
      },
      {
        source: "/faith.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/walkingtours.php",
        destination:
          "/projects/on-this-spot-blackfalds-history-at-your-fingertips",
        permanent: true,
      },
      {
        source: "/walkingtours.html",
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
        source: "/mural.php",
        destination: "/projects/iron-ridge-secondary-campus-mural",
        permanent: true,
      },
      {
        source: "/mural-gregson.php",
        destination: "/projects/arthur-d-gregson-entomologist",
        permanent: true,
      },
      {
        source: "/mural-buffalotrail.php",
        destination: "/projects/buffalo-lake-trail",
        permanent: true,
      },
      {
        source: "/mural-whitfordhouse.php",
        destination: "/projects/whitford-stopping-house",
        permanent: true,
      },
      {
        source: "/mural-CEtrail.php",
        destination: "/projects/c-and-e-trail",
        permanent: true,
      },
      {
        source: "/mural-early.php",
        destination: "/projects/early-exploration-alberta",
        permanent: true,
      },
      {
        source: "/mural-Dam.php",
        destination: "/projects/blindman-river-dam",
        permanent: true,
      },
      {
        source: "/mural-Name.php",
        destination: "/projects/how-the-blindman-river-got-its-name",
        permanent: true,
      },
      {
        source: "/translations.php",
        destination: "/resources/indigenous-translations",
        permanent: true,
      },
      {
        source: "/sources.php",
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
      {
        source: "/faith.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/faith.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
