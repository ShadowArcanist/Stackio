import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import Details from "@/components/details";
import { Detail } from "@/components/details";
import { ImageCard } from "@/components/image-card";
import { ImageCardGroup } from "@/components/image-card-group";
import { MediaCard } from "@/components/media-card";
import { MediaCardGroup } from "@/components/media-card-group";
import { Callout } from "@/components/callout";
import { AppData } from "@/components/app-data";
import { AppGuide } from "@/components/application-deployment-guide";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Step, Steps } from "fumadocs-ui/components/steps";

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
    Detail,
    ImageCard,
    ImageCardGroup,
    MediaCard,
    MediaCardGroup,
    Callout,
    AppData,
    AppGuide,
    Tab,
    Tabs,
    Steps,
    Step,
  };
}
