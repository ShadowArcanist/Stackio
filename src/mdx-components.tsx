import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
  Changelog,
  ChangelogItem,
  ChangelogItemDescription,
  ChangelogItemTitle,
  ChangelogItemVersion,
} from "@/components/changelog";

import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

import Details from "@/components/details";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: ({ src, alt, width, height, ...props }) => (
      <ImageZoom
        src={src as string}
        alt={alt as string}
        width="1280"
        height="720"
        {...props}
      />
    ),
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
