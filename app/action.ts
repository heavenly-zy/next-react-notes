'use server';

import { redirect } from 'next/navigation';
import { addNote, updateNote, delNote } from '@/libs/redis';

export async function saveNote(title: string, body: string, noteId?: string) {
  const data = JSON.stringify({
    title,
    content: body,
    updateTime: new Date(),
  });

  if (noteId) {
    updateNote(noteId, data);
    redirect(`/note/${noteId}`);
  } else {
    const res = await addNote(data);
    redirect(`/note/${res}`);
  }
}

export async function deleteNote(noteId: string) {
  delNote(noteId);
  redirect('/');
}
