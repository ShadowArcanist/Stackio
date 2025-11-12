import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export function UpdateGuide() {
  const page = source.getPage(["resources/application-update-guide"]);
  if (!page) return null;

  const MDX = page.data.body;

  return <MDX components={getMDXComponents()} />;
}
