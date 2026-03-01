import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina classes CSS de forma segura: junta com clsx e resolve conflitos
 * do Tailwind com tailwind-merge (ex.: "p-2" + "p-4" vira só "p-4").
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
