import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export function AppGuide() {
  const page = source.getPage(["app-guide"]);
  if (!page) return null;

  const MDX = page.data.body;

  return <MDX components={getMDXComponents()} />;
}
