"use client";

import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";

export interface DetailProps {
  /**
   * The label remains a simple string.
   */
  label: string;
  /**
   * The value can be any ReactNode (e.g. backticks, JSX).
   */
  value: ReactNode;
  /**
   * Optional icon element. If provided, will be cloned to apply sizing classes.
   */
  icon?: ReactElement<{ className?: string }>;
  /**
   * Optional size string for the icon (e.g. "h-5 w-5").
   * Defaults to "h-5 w-5" if not provided.
   */
  iconSize?: string;
  /**
   * Optional className for the Detail li element.
   */
  className?: string;
}

export function Detail({
  label,
  value,
  icon,
  iconSize = "h-5 w-5",
  className,
}: DetailProps) {
  const [copied, setCopied] = useState(false);
  let renderedIcon: ReactNode = null;

  if (icon && isValidElement(icon)) {
    renderedIcon = cloneElement(icon, {
      className: `${iconSize} ${(icon.props as { className?: string }).className || ""}`,
    });
  }

  const handleCopy = async () => {
    if (typeof value === "string") {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <li
      className={`flex items-center gap-2 whitespace-nowrap pr-4 ${className || ""}`}
    >
      {renderedIcon && (
        <span className="text-sm shrink-0 text-foreground dark:text-white flex items-center">
          {renderedIcon}
        </span>
      )}
      <div className="min-w-0 flex items-center">
        <span className="font-semibold text-foreground dark:text-white mr-2">
          {label}:
        </span>
        <code
          className="text-muted-foreground break-all shrink-0 pr-2 bg-muted px-1 py-0.5 rounded text-sm cursor-pointer hover:bg-muted/80 transition-colors"
          onClick={handleCopy}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleCopy();
            }
          }}
          title="Click to copy"
        >
          {value}
        </code>
        {copied && <span className="ml-1 text-green-500 text-xs">Copied!</span>}
      </div>
    </li>
  );
}

export interface DetailsProps {
  className?: string;
  children: ReactNode;
}

/**
 * Container for a list of details with an always-visible, faint scrollbar when overflowing.
 * Ensures items won’t wrap by using non-shrinking value spans.
 */
function Details({ className = "", children }: DetailsProps) {
  return (
    <div
      className={
        `rounded-xl border border-border bg-background pl-2 pr-4 py-2 overflow-x-auto ` +
        `scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-600 ` +
        `${className}`
      }
      style={{
        // Firefox: thin track + thumb coloring
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(156, 163, 175, 0.5) rgba(229, 231, 235, 0.3)",
      }}
    >
      <ul className="flex flex-col gap-2 min-w-full pr-4">{children}</ul>
    </div>
  );
}

// Attach subcomponent for convenient namespacing
Details.Detail = Detail;

export default Details;
