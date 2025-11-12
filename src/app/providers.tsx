"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { RootProvider } from "fumadocs-ui/provider/base";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <RootProvider
        search={{
          options: {
            type: "static",
          },
        }}
      >
        <ProgressProvider
          height="2px"
          color="var(--color-primary)"
          options={{
            showSpinner: false,
          }}
          stopDelay={1000}
          delay={1000}
          startOnLoad
          shallowRouting
        >
          {children}
        </ProgressProvider>
      </RootProvider>
    </ThemeProvider>
  );
}
