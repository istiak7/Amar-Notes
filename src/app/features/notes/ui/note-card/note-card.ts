import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Note } from '../../data-access/notes.service';

@Component({
  selector: 'app-note-card',
  imports: [DatePipe],
  templateUrl: './note-card.html',
  styleUrl: './note-card.scss'
})
export class NoteCard {
  note = input.required<Note>();
  starToggled = output<string>();
  deleted = output<string>();
  archived = output<string>();
  unarchived = output<string>();
}
