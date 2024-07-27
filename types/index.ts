import { locales } from "@/config";
import { ZodIssue } from "zod";

export type TEditorFormState = {
  message?: string | null;
  errors?: ZodIssue[];
} | void;

export type TLocale = (typeof locales)[number];