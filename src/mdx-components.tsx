import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import * as LucideIcons from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { AppData } from "@/components/app-data";
import { AppGuide } from "@/components/application-deployment-guide";
import { UpdateGuide } from "@/components/application-update-guide";
import { Callout } from "@/components/callout";
import Details, { Detail } from "@/components/details";
import { ImageCard } from "@/components/image-card";
import { ImageCardGroup } from "@/components/image-card-group";
import { MediaCard } from "@/components/media-card";
import { MediaCardGroup } from "@/components/media-card-group";

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
    UpdateGuide,
    Tab,
    Tabs,
    Steps,
    Step,
    Accordion,
    Accordions,
    ...LucideIcons,
  };
}
