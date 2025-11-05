import { Coffee } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export function BuyMeACoffeeInfo({
  username,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  username: string;
}) {
  return (
    <a
      href={`https://buymeacoffee.com/${username}`}
      rel="noreferrer noopener"
      target="_blank"
      {...props}
      className={cn(
        "flex flex-col gap-1.5 p-2 rounded-lg text-sm text-fd-foreground/80 transition-colors lg:flex-row lg:items-center hover:text-fd-accent-foreground hover:bg-fd-accent",
        props.className,
      )}
    >
      <p className="flex items-center gap-2 truncate">
        <Coffee className="size-3.5" />
        Buy me a coffee
      </p>
    </a>
  );
}
