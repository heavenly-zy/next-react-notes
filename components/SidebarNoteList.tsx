
import { getAllNotes } from '@/libs/prisma';
import SidebarNoteListFilter from './SidebarNoteListFilter';
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader';

export default async function SidebarNoteList() {
  const notes = await getAllNotes();

  const arr = Object.entries(notes);

  if (arr.length == 0) {
    return <div className="notes-empty">{'No notes created yet!'}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={arr.map(([noteId, note]) => {
        const noteData = JSON.parse(note) as Note;
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
}
