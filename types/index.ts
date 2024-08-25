import { PrismaClient } from '@prisma/client';
import { ZodIssue } from 'zod';

export type TEditorFormState = {
  message?: string | null;
  errors?: ZodIssue[];
} | void;

declare global {
  var prisma: PrismaClient | undefined;
}