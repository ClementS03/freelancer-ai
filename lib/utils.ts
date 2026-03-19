import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price from string "2 500" → display as-is */
export function formatPrice(price: string, currency: string, vat: string) {
  return `${price}${currency} ${vat}`;
}
