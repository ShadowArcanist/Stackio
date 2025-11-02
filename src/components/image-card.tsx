import { Card } from "fumadocs-ui/components/card";

interface ImageCardProps {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt?: string;
}

export function ImageCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt = title,
}: ImageCardProps) {
  return (
    <Card
      className="transition hover:shadow-lg hover:bg-fd-muted cursor-pointer"
      title={
        <a href={href} className="block no-underline text-inherit">
          <div className="flex flex-col">
            <div className="-mx-4 -mt-4 mb-4">
              {/* biome-ignore lint/performance/noImgElement: static export */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto object-cover rounded-t-xl"
              />
            </div>
            <div>{title}</div>
          </div>
        </a>
      }
      description={description}
    />
  );
}
