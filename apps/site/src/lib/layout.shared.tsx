import React from "react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2 text-base">
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
