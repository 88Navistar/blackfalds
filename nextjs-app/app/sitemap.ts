import { MetadataRoute } from "next";
import { headers } from "next/headers";

import { sanityFetch } from "@/sanity/lib/live";
import { sitemapData } from "@/sanity/lib/queries";

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: allPostsAndPages } = await sanityFetch({
    query: sitemapData,
  });

  //console.log(allPostsAndPages);
  const headersList = await headers();
  const domain: string = headersList.get("host") as string;
  const protocol: string = headersList.get("x-forwarded-proto") || "https";

  const sitemap: MetadataRoute.Sitemap = [];

  if (allPostsAndPages != null && allPostsAndPages.length != 0) {
    // Add projects index page
    sitemap.push({
      url: `${protocol}://${domain}/projects`,
      lastModified: new Date().toISOString(),
    });

    let url = "";

    for (const p of allPostsAndPages) {
      switch (p._type) {
        case "homePageSingleton":
          url = `${protocol}://${domain}`;
          break;
        case "aboutPage":
          url = `${protocol}://${domain}/about`;
          break;
        case "contactPage":
          url = `${protocol}://${domain}/contact`;
          break;
        case "resourcePage":
          url = `${protocol}://${domain}/resources/${p.slug}`;
          break;
        case "post":
          url = `${protocol}://${domain}/projects/${p.slug}`;
          break;
      }
      sitemap.push({
        url,
        lastModified: p._updatedAt,
      });
    }
  }

  return sitemap;
}
