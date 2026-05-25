import { Link, useLocation } from "@tanstack/react-router";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { pathname } = useLocation();
  // Preserve current path, just change query param
  const base = pathname;
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gold" />
      <Link
        to={base}
        search={{ lang: "pt" }}
        className="text-xs text-gold hover:text-gold-bright transition-colors"
      >
        PT
      </Link>
      <span className="text-xs text-muted-foreground">/</span>
      <Link
        to={base}
        search={{ lang: "en" }}
        className="text-xs text-gold hover:text-gold-bright transition-colors"
      >
        EN
      </Link>
    </div>
  );
}
