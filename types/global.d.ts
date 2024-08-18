interface Notes {
  [noteId: string]: string;
}

interface Note {
  id?: string;
  title: string;
  content?: string;
  updateTime?: string;
  slug?: string;
  updatedAt?: string;
}

