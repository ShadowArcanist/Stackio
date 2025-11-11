import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export function AppGuide() {
  const page = source.getPage(["core/application-deployment-guide"]);
  if (!page) return null;

  const MDX = page.data.body;

  return <MDX components={getMDXComponents()} />;
}
