"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

/**
 * Met à jour l'attribut lang de <html> côté client selon la locale active.
 * Nécessaire car le root layout est partagé et ne connaît pas la locale.
 * suppressHydrationWarning sur <html> dans root layout évite l'erreur de hydration.
 */
export function HtmlLangSetter({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
