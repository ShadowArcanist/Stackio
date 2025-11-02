import { Users } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";
import { cn } from "../lib/cn";

async function getDiscordServerInfo(
  inviteCode: string,
  token?: string,
): Promise<{
  name: string;
  memberCount: number;
}> {
  const endpoint = `https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`;
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (token) headers.set("Authorization", `Bot ${token}`);

  const response = await fetch(endpoint, {
    headers,
    next: {
      revalidate: 60,
    },
  } as RequestInit);

  if (!response.ok) {
    const message = await response.text();

    throw new Error(`Failed to fetch Discord server data: ${message}`);
  }

  const data = await response.json();
  return {
    name: data.guild.name,
    memberCount: data.approximate_member_count,
  };
}

export async function DiscordInfo({
  inviteCode,
  token,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  inviteCode: string;
  token?: string;
}) {
  const { name, memberCount } = await getDiscordServerInfo(inviteCode, token);
  const humanizedMembers = humanizeNumber(memberCount);

  return (
    <a
      href={`https://discord.gg/${inviteCode}`}
      rel="noreferrer noopener"
      target="_blank"
      {...props}
      className={cn(
        "flex flex-col gap-1.5 p-2 rounded-lg text-sm text-fd-foreground/80 transition-colors lg:flex-row lg:items-center hover:text-fd-accent-foreground hover:bg-fd-accent",
        props.className,
      )}
    >
      <p className="flex items-center gap-2 truncate">
        <svg fill="currentColor" viewBox="0 0 24 24" className="size-3.5">
          <title>Discord</title>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
        {name}
      </p>
      <p className="flex text-xs items-center gap-1 text-fd-muted-foreground">
        <Users className="size-3" />
        {humanizedMembers}
      </p>
    </a>
  );
}

/**
 * Converts a number to a human-readable string with K suffix for thousands
 * @example 1500 -> "1.5K", 1000000 -> "1000000"
 */
function humanizeNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 100000) {
    // For numbers between 1,000 and 99,999, show with one decimal (e.g., 1.5K)
    const value = (num / 1000).toFixed(1);
    // Remove trailing .0 if present
    const formattedValue = value.endsWith(".0") ? value.slice(0, -2) : value;

    return `${formattedValue}K`;
  }

  if (num < 1000000) {
    // For numbers between 10,000 and 999,999, show as whole K (e.g., 10K, 999K)
    return `${Math.floor(num / 1000)}K`;
  }

  // For 1,000,000 and above, just return the number
  return num.toString();
}
