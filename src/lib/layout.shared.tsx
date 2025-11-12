import type { LinkItemType } from "fumadocs-ui/layouts/docs";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export const title = "Stackio";

export const logo = (
  <>
    <Image
      alt={title}
      src={"/logo.webp"}
      sizes="100px"
      width={32}
      height={32}
      className="size-8"
      aria-label={title}
    />
  </>
);

export const linkItems: LinkItemType[] = [];

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2 text-base">
          {logo}
          <div className="flex items-baseline gap-1">
            Stackio
            <span className="text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded">
              {process.env.VERSION}
            </span>
          </div>
        </div>
      ),
      transparentMode: "top",
    },
    themeSwitch: {
      component: <ThemeToggle mode="light-dark" />,
    },
  };
}
