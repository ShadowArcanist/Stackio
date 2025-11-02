import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
  Changelog,
  ChangelogItem,
  ChangelogItemDescription,
  ChangelogItemTitle,
  ChangelogItemVersion,
} from "@/components/changelog";

import Details from "@/components/details";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Changelog,
    ChangelogItem,
    ChangelogItemTitle,
    ChangelogItemDescription,
    ChangelogItemVersion,
    ...components,
    Details: (props) => <Details {...props} />,
    Detail: (props) => <Details.Detail {...props} />,
  };
}
