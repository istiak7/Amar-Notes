import { Component, inject } from '@angular/core';
import { NotesService, NoteFilter } from './data-access/notes.service';
import { NoteCard } from './ui/note-card/note-card';

@Component({
  selector: 'app-notes',
  imports: [NoteCard],
  templateUrl: './notes.html',
  styleUrl: './notes.scss'
})
export class Notes {
  readonly notesService = inject(NotesService);
  readonly notes = this.notesService.displayedNotes;
  readonly filter = this.notesService.filter;

  readonly filterLabels: Record<NoteFilter, string> = {
    all: 'All Notes',
    starred: 'Starred',
    archived: 'Archive'
  };

  onSearch(event: Event): void {
    this.notesService.setSearch((event.target as HTMLInputElement).value);
  }

  onDelete(id: string): void {
    this.notesService.deleteNote(id);
  }

  onToggleStar(id: string): void {
    this.notesService.toggleStar(id);
  }

  onArchive(id: string): void {
    this.notesService.archiveNote(id);
  }

  onUnarchive(id: string): void {
    this.notesService.unarchiveNote(id);
  }
}
