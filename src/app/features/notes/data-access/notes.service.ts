import { Injectable, signal, computed } from '@angular/core';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  starred: boolean;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type NoteFilter = 'all' | 'starred' | 'archived';

const MOCK_NOTES: Note[] = [
  {
    id: '1',
    title: 'Welcome to Amar Notes!',
    content: 'This is your personal notes app. Create, organize, and manage your notes effortlessly. Click "+ New Note" to get started.',
    category: 'Personal',
    color: '#dbeafe',
    starred: true,
    archived: false,
    createdAt: new Date('2026-05-01'),
    updatedAt: new Date('2026-05-14')
  },
  {
    id: '2',
    title: 'Angular 21 Features',
    content: 'Angular 21 introduces improved standalone components, better SSR support, and enhanced Signals API. Zoneless change detection is now stable.',
    category: 'Work',
    color: '#ede9fe',
    starred: false,
    archived: false,
    createdAt: new Date('2026-05-10'),
    updatedAt: new Date('2026-05-12')
  },
  {
    id: '3',
    title: 'Weekend Plan',
    content: 'Saturday: Morning run, breakfast at cafe\nSunday: Family dinner, movie night\nGroceries: milk, eggs, bread, butter',
    category: 'Personal',
    color: '#fef3c7',
    starred: false,
    archived: false,
    createdAt: new Date('2026-05-13'),
    updatedAt: new Date('2026-05-13')
  },
  {
    id: '4',
    title: 'Project Ideas',
    content: '1. Notes app with AI summary\n2. Habit tracker with streaks\n3. Recipe manager with shopping list\n4. Budget tracker with graphs',
    category: 'Ideas',
    color: '#dcfce7',
    starred: true,
    archived: false,
    createdAt: new Date('2026-05-08'),
    updatedAt: new Date('2026-05-11')
  },
  {
    id: '5',
    title: 'Meeting Notes — Q2 Planning',
    content: 'Key decisions: Launch v2.0 by June 30. Focus on mobile UX improvements. Add dark mode support. Team size: 6 developers.',
    category: 'Work',
    color: '#ffedd5',
    starred: false,
    archived: false,
    createdAt: new Date('2026-05-09'),
    updatedAt: new Date('2026-05-09')
  },
  {
    id: '6',
    title: 'Book List',
    content: 'Reading: Atomic Habits by James Clear\nNext: The Pragmatic Programmer\nWishlist: Clean Code, Deep Work, Building a Second Brain',
    category: 'Personal',
    color: '#fce7f3',
    starred: false,
    archived: false,
    createdAt: new Date('2026-05-05'),
    updatedAt: new Date('2026-05-07')
  },
  {
    id: '7',
    title: 'Old Shopping List',
    content: 'Coffee, Tea bags, Sugar, Milk, Bread',
    category: 'Personal',
    color: '#ffffff',
    starred: false,
    archived: true,
    createdAt: new Date('2026-04-20'),
    updatedAt: new Date('2026-04-20')
  }
];

const NOTE_COLORS = ['#fef3c7', '#dbeafe', '#dcfce7', '#fce7f3', '#ede9fe', '#ffedd5'];

@Injectable({ providedIn: 'root' })
export class NotesService {
  private readonly _notes = signal<Note[]>(MOCK_NOTES);

  readonly filter = signal<NoteFilter>('all');
  readonly searchQuery = signal('');

  readonly counts = computed(() => ({
    all: this._notes().filter(n => !n.archived).length,
    starred: this._notes().filter(n => n.starred && !n.archived).length,
    archived: this._notes().filter(n => n.archived).length
  }));

  readonly displayedNotes = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();

    let notes: Note[];
    switch (this.filter()) {
      case 'starred':
        notes = this._notes().filter(n => n.starred && !n.archived);
        break;
      case 'archived':
        notes = this._notes().filter(n => n.archived);
        break;
      default:
        notes = this._notes().filter(n => !n.archived);
    }

    if (!q) return notes;
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
    );
  });

  setFilter(filter: NoteFilter): void {
    this.filter.set(filter);
  }

  setSearch(query: string): void {
    this.searchQuery.set(query);
  }

  addNote(): void {
    const color = NOTE_COLORS[Math.floor(Math.random() * NOTE_COLORS.length)];
    const note: Note = {
      id: crypto.randomUUID(),
      title: 'New Note',
      content: 'Start writing your note here...',
      category: 'Personal',
      color,
      starred: false,
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this._notes.update(notes => [note, ...notes]);
    this.filter.set('all');
  }

  deleteNote(id: string): void {
    this._notes.update(notes => notes.filter(n => n.id !== id));
  }

  toggleStar(id: string): void {
    this._notes.update(notes =>
      notes.map(n => n.id === id ? { ...n, starred: !n.starred } : n)
    );
  }

  archiveNote(id: string): void {
    this._notes.update(notes =>
      notes.map(n => n.id === id ? { ...n, archived: true } : n)
    );
  }

  unarchiveNote(id: string): void {
    this._notes.update(notes =>
      notes.map(n => n.id === id ? { ...n, archived: false } : n)
    );
  }
}
