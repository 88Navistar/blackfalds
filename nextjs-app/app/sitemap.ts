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
  const sitemap: MetadataRoute.Sitemap = [];
  const domain: String = headersList.get("host") as string;

  if (allPostsAndPages != null && allPostsAndPages.length != 0) {
    // Add resources index page
    sitemap.push({
      url: `${domain}/resources`,
      lastModified: new Date().toISOString(),
    });

    let url = "";

    for (const p of allPostsAndPages) {
      switch (p._type) {
        case "homePageSingleton":
          url = `${domain}`;
          break;
        case "aboutPage":
          url = `${domain}/about`;
          break;
        case "contactPage":
          url = `${domain}/contact`;
          break;
        case "resourcePage":
          url = `${domain}/resources/${p.slug}`;
          break;
        case "post":
          url = `${domain}/projects/${p.slug}`;
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
