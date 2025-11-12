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
        "flex items-center gap-1.5 p-2 rounded-lg text-sm text-fd-foreground/80 transition-colors hover:text-fd-accent-foreground hover:bg-fd-accent",
        props.className,
      )}
    >
      <Coffee className="size-3.5" />
      <span className="md:hidden text-xs">Buy me a Coffee</span>
    </a>
  );
}
