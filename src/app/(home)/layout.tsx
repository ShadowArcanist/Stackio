import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
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
          <GithubInfo owner="fuma-nama" repo="fumadocs" className="lg:-mx-2" />
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
