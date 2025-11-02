import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import { DiscordInfo } from "@/components/discord-info";
import { GithubInfo } from "@/components/github-info";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

function docsOptions(): DocsLayoutProps {
  return {
    ...baseOptions(),
    tree: source.pageTree,
    links: [
      {
        type: "custom",
        children: (
          <GithubInfo
            owner="fuma-nama"
            repo="fumadocs"
            className="lg:-mx-2 pr-4"
          />
        ),
      },
      {
        type: "custom",
        children: (
          <DiscordInfo inviteCode="RFsTaG4HvN" className="lg:-mx-2 pr-4" />
        ),
      },
    ],
  };
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <DocsLayout {...docsOptions()} tabMode="navbar">
      {children}
    </DocsLayout>
  );
}
