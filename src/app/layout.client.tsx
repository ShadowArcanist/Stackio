"use client";

import type { Folder, Page, Root } from "fumadocs-core/page-tree";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Body({ children, tree }: { children: ReactNode; tree: Root }) {
  const mode = useMode(tree);

  return (
    <body className={cn(mode, "relative flex min-h-screen flex-col")}>
      {children}
    </body>
  );
}

export function useMode(tree: Root): string | undefined {
  const pathname = usePathname();
  const page = findPage(tree, pathname);

  const id = page?.$id ?? "";
  return id.split("/")[0];
}

function findPage(tree: Root, pathname: string) {
  // Simple implementation, assuming flat structure
  for (const node of tree.children) {
    if (node.type === "page" && node.url === pathname) {
      return node;
    }
    if (node.type === "folder") {
      const found = findPageInFolder(node, pathname);
      if (found) return found;
    }
  }
  return null;
}

function findPageInFolder(folder: Folder, pathname: string): Page | null {
  if (folder.index && folder.index.url === pathname) return folder.index;
  for (const child of folder.children) {
    if (child.type === "page" && child.url === pathname) return child;
    if (child.type === "folder") {
      const found = findPageInFolder(child, pathname);
      if (found) return found;
    }
  }
  return null;
}
