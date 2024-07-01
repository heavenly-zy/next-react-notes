'use server';

import { redirect } from 'next/navigation';
import { addNote, updateNote, delNote } from '@/libs/redis';
import { revalidatePath } from 'next/cache';

export async function saveNote(
  prevState: TEditorFormState,
  formData: FormData
) {
  const noteId = formData.get('noteId') as string | undefined;

  const data = JSON.stringify({
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date(),
  });

  if (noteId) {
    updateNote(noteId, data);
    revalidatePath('/', 'layout');
  } else {
    const res = await addNote(data);
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
