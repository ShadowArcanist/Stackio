import { Card } from "fumadocs-ui/components/card";
import { Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppDataProps {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
  githubHref: string;
  websiteHref: string;
}

export function AppData({
  title,
  description,
  href,
  imageSrc,
  imageAlt = title,
  githubHref,
  websiteHref,
}: AppDataProps) {
  return (
    <Card
      className="transition w-full"
      title={
        <a href={href} className="block no-underline text-inherit">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* biome-ignore lint/performance/noImgElement: static export */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="text-base">{title}</div>
            </div>
            <div className="flex gap-2">
              <a href={githubHref} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant={"secondary"}>
                  <Github className="w-4 h-4 mr-1" />
                  GitHub
                </Button>
              </a>
              <a href={websiteHref} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant={"secondary"}>
                  <Globe className="w-4 h-4 mr-1" />
                  Website
                </Button>
              </a>
            </div>
          </div>
        </a>
      }
      description={<div className="mt-4 text-base">{description}</div>}
    />
  );
}
