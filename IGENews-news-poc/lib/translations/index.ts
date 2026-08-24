import { en } from "./en";
import { hi } from "./hi";
import { ta } from "./ta";
import { kn } from "./kn";

export type Language = "en" | "hi" | "ta" | "kn";

export const translations = {
  en,
  hi,
  ta,
  kn,
};

export type TranslationKeys = typeof en;
