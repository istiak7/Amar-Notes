import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NotesService, NoteFilter } from '../../features/notes/data-access/notes.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  private readonly notesService = inject(NotesService);

  readonly activeFilter = this.notesService.filter;
  readonly counts = this.notesService.counts;

  setFilter(filter: NoteFilter): void {
    this.notesService.setFilter(filter);
  }
}
