import ar from "./messages/ar";
import en from "./messages/en";
import fa from "./messages/fa";
import tr from "./messages/tr";

export const locales = ["fa", "en", "tr", "ar"] as const;

export const defaultLocale = "fa";

export type Locale = (typeof locales)[number];

export const messages = {
  fa,
  en,
  tr,
  ar,
} as const;

export function getMessages(locale: Locale) {
  return messages[locale];
}