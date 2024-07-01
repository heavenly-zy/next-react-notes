import { ZodIssue } from "zod";

export type TEditorFormState = {
  message?: string | null;
  errors?: ZodIssue[];
} | void;