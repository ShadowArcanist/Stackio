import { LargeSearchToggle } from "fumadocs-ui/components/layout/search-toggle";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import type { CSSProperties, ReactNode } from "react";
import { BuyMeACoffeeInfo } from "@/components/buymeacoffee-info";
import { DiscordInfo } from "@/components/discord-info";
import { GithubInfo } from "@/components/github-info";
import { baseOptions, linkItems, logo } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  const base = baseOptions();

  return (
    <DocsLayout
      {...base}
      links={linkItems
        .concat([
          {
            type: "custom",
            children: (
              <BuyMeACoffeeInfo
                username="shadowarcanist"
                className="lg:-mx-2"
              />
            ),
          },
          {
            type: "custom",
            children: (
              <GithubInfo
                owner="fuma-nama"
                repo="fumadocs"
                className="lg:-mx-2 pr-2"
              />
            ),
          },
          {
            type: "custom",
            children: (
              <DiscordInfo inviteCode="RFsTaG4HvN" className="lg:-mx-2 pr-4" />
            ),
          },
        ])
        .filter((item) => item.type === "icon" || item.type === "custom")}
      tree={source.pageTree}
      sidebar={{
        collapsible: false,
        tabs: {
          transform(option, node) {
            const meta = source.getNodeMeta(node);
            if (!meta || !node.icon) return option;

            const segments = meta.path.split("/");
            const segment = serializeSegment(segments[0]);

            const color = `var(--${segment}-color, var(--color-fd-foreground))`;
            return {
              ...option,
              icon: (
                <div
                  className="size-full rounded-lg text-(--tab-color) max-md:border max-md:bg-(--tab-color)/10 max-md:p-1.5 [&_svg]:size-full"
                  style={
                    {
                      "--tab-color": color,
                    } as CSSProperties
                  }
                >
                  {node.icon}
                </div>
              ),
            };
          },
        },
      }}
      tabMode="navbar"
      searchToggle={{
        components: {
          lg: (
            <div className="flex gap-1.5 max-md:hidden">
              <LargeSearchToggle className="flex-1 rounded-xl" />
            </div>
          ),
        },
      }}
      nav={{
        ...base.nav,
        mode: "top",
        title: (
          <>
            {logo}
            <div className="flex items-baseline gap-1">
              Stackio
              <span className="text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded">
                {process.env.VERSION}
              </span>
            </div>
          </>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}

function serializeSegment(segment: string | undefined): string {
  const raw = (segment ?? "").trim();

  const kebab = raw
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
  return kebab || "fd";
}
