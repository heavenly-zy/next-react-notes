interface Notes {
  [noteId: string]: string;
}

interface Note {
  title: string;
  content?: string;
  updateTime?: string;
}

type TEditorFormState = {
  message?: string | null;
} | void;
