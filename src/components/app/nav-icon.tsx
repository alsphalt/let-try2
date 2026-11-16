import {
  Bot,
  Braces,
  LayoutDashboard,
  Mail,
  Settings,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

const icons: Record<string, LucideIcon> = {
  "/dashboard": LayoutDashboard,
  "/bot": Bot,
  "/api": Braces,
  "/contact": Mail,
  "/wallet": Wallet,
  "/settings": Settings,
};

export function NavIcon({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  const Icon = icons[href] ?? LayoutDashboard;
  return <Icon aria-hidden className={cn("h-4 w-4", className)} />;
}
