import { baseUrl, createMetadata } from "@/lib/metadata";
import "@/styles/globals.css";
import { NextProvider } from "fumadocs-core/framework/next";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { Body } from "./layout.client";
import { Providers } from "./providers";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = createMetadata({
  title: {
    template: "%s | Stackio",
    default: "Stackio",
  },
  description: "The Next.js framework for building documentation sites",
  metadataBase: baseUrl,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#fff" },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${mono.variable} font-inter`}
      suppressHydrationWarning
    >
      <Body tree={source.pageTree}>
        <NextProvider>
          <TreeContextProvider tree={source.pageTree}>
            <Providers>{children}</Providers>
          </TreeContextProvider>
        </NextProvider>
        <script
          defer
          src={process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        ></script>
      </Body>
    </html>
  );
}
