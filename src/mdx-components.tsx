import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

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
    ...components,
    Details: (props) => <Details {...props} />,
    Detail: (props) => <Details.Detail {...props} />,
  };
}
