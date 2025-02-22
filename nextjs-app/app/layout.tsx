import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import { draftMode } from "next/headers";
import { toPlainText, VisualEditing } from "next-sanity";
import { Toaster } from "sonner";

import DraftModeToast from "@/components/DraftModeToast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

import { handleError } from "./client-utils";
import { ThemeProvider } from "./providers";
/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : new URL("https://www.blackfaldshistoricalsociety.com");
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const crimson = Crimson_Pro({
  variable: "--font-headings",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${crimson.variable} text-stone-900 dark:text-stone-100`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <section className="min-h-screen pt-24">
            {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
            <Toaster />
            {isDraftMode && (
              <>
                <DraftModeToast />
                {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
                <VisualEditing />
              </>
            )}
            {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
            <SanityLive onError={handleError} />

            <Header />
            <main className="mx-auto max-w-screen overflow-x-hidden">
              {children}
              <TailwindIndicator />
            </main>
            <Footer />
          </section>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
