'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { TEditorFormState } from '@/types';
import { addNote, delNote, updateNote } from '@/libs/prisma';

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100'),
});

export async function saveNote(
  prevState: TEditorFormState,
  formData: FormData
) {
  const noteId = formData.get('noteId') as string | undefined;

  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  };

  // 校验数据
  const validated = schema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    };
  }

  if (noteId) {
    await updateNote(noteId, JSON.stringify(data));
    revalidatePath('/', 'layout');
  } else {
    await addNote(JSON.stringify(data));
    revalidatePath('/', 'layout');
  }
  return { message: `Add Success!` };
}

export async function deleteNote(
  prevState: TEditorFormState,
  formData: FormData
) {
  const noteId = formData.get('noteId') as string | undefined;
  if (!noteId) return;
  delNote(noteId);
  revalidatePath('/', 'layout');
  redirect('/');
}
