'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { importNote } from '@/actions';
import { useFormStatus } from 'react-dom';

export default function SidebarImport() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  async function upload(formData: FormData) {
    const file = formData.get('file');
    if (!file) {
      console.warn('files list is empty');
      return;
    }

    try {
      const data = await importNote(formData);
      router.push(`/note/${data.uid}`);
    } catch (error) {
      console.error('something went wrong');
    }

    // 重置 file input
    formRef.current?.reset();
  }

  return (
    <form style={{ textAlign: 'center' }} action={upload} ref={formRef}>
      <label htmlFor="file" style={{ cursor: 'pointer' }}>
        Import .md File
      </label>
      <input type="file" id="file" name="file" accept=".md" />
      <div>
        <Submit />
      </div>
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>{pending ? 'Submitting' : 'Submit'}</button>
  );
}
