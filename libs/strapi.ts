export async function getAllNotes() {
  const response = await fetch(`http://127.0.0.1:9999/api/notes`);
  const data: { data: { attributes: Note }[] } = await response.json();

  const res: { [key: string]: string } = {};

  data.data.forEach(({ attributes: { title, content, slug, updatedAt } }) => {
    if (!slug) return;
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt,
    });
  });

  return res;
}

export async function addNote(data: string) {
  const response = await fetch(`http://127.0.0.1:9999/api/notes`, {
    method: 'POST',
    headers: {
      Authorization:
        'bearer 66221159254071be3d6a3d9893801749eb360683c67b4a83dfb046b95d6cf3ca3be2b329f14a8976590c046f271e0a85453dcaaa6d2b34405bc08a019a631b6ca34b03a3447a3a77f9710677b55016b4dcdad170f2648430c8472ca41e13ca48e6409f1d14600373c2c9d8934063a9c7f8c72f9660f01e06cede7a0c13658844',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
  return res.data.attributes.slug;
}

export async function updateNote(uuid: string, data: string) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://127.0.0.1:9999/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization:
        'bearer 66221159254071be3d6a3d9893801749eb360683c67b4a83dfb046b95d6cf3ca3be2b329f14a8976590c046f271e0a85453dcaaa6d2b34405bc08a019a631b6ca34b03a3447a3a77f9710677b55016b4dcdad170f2648430c8472ca41e13ca48e6409f1d14600373c2c9d8934063a9c7f8c72f9660f01e06cede7a0c13658844',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: JSON.parse(data),
    }),
  });
  const res = await response.json();
}

export async function getNote(uuid: string): Promise<Note> {
  const response = await fetch(
    `http://127.0.0.1:9999/api/notes?filters[slug][$eq]=${uuid}`
  );
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id,
  };
}

export async function delNote(uuid: string) {
  const { id } = await getNote(uuid);
  const response = await fetch(`http://127.0.0.1:9999/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization:
        'bearer 66221159254071be3d6a3d9893801749eb360683c67b4a83dfb046b95d6cf3ca3be2b329f14a8976590c046f271e0a85453dcaaa6d2b34405bc08a019a631b6ca34b03a3447a3a77f9710677b55016b4dcdad170f2648430c8472ca41e13ca48e6409f1d14600373c2c9d8934063a9c7f8c72f9660f01e06cede7a0c13658844',
      'Content-Type': 'application/json',
    },
  });
  const res = await response.json();
}
