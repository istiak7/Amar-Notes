import { Component, inject } from '@angular/core';
import { NotesService } from '../../features/notes/data-access/notes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  private readonly notesService = inject(NotesService);

  onNewNote(): void {
    this.notesService.addNote();
  }
}
