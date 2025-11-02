'use client';

import { Card } from "fumadocs-ui/components/card";
import { ImageZoom } from "fumadocs-ui/components/image-zoom"; 

interface MediaCardProps {
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export function MediaCard({
  description,
  imageSrc,
  imageAlt = description,
}: MediaCardProps) {
  return (
    <Card
      title={
        <div className="flex flex-col">
          <div className="-mx-4 -mt-4 mb-4">
            <ImageZoom src={imageSrc} alt={imageAlt}>
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto object-cover rounded-t-xl cursor-zoom-in"
              />
            </ImageZoom>
          </div>
        </div>
      }
      description={description}
    />
  );
}
