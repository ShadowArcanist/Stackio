import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2 text-base">
          <Image src="/logo.webp" alt="Logo" width={32} height={32} />
          <div className="flex items-baseline gap-1">
            Stackio
            <span className="text-xs bg-muted text-muted-foreground px-1 py-0.5 rounded">
              {process.env.VERSION}
            </span>
          </div>
        </div>
      ),
    },
  };
}
