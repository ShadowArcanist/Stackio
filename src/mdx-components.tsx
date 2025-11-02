import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
  Changelog,
  ChangelogItem,
  ChangelogItemDescription,
  ChangelogItemTitle,
  ChangelogItemVersion,
} from "@/components/changelog";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Changelog,
    ChangelogItem,
    ChangelogItemTitle,
    ChangelogItemDescription,
    ChangelogItemVersion,
    ...components,
  };
}
