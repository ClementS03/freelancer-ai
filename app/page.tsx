import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/i18n";

// The middleware handles locale detection on first visit.
// This page is only reached if middleware somehow passes through.
export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
