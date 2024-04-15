import { Injectable } from '@angular/core';
import { Database, listVal, objectVal, push, ref, set } from '@angular/fire/database';
import { Note } from './interfaces/note.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  
  constructor(private db: Database) { }

  // Method to add a new note
  addNote(note: Note) {
    const notesRef = ref(this.db, 'notes');
    push(notesRef, note);
  }

  // Method to get all notes
  getNotes(): Observable<Note[]>{
    const notesRef = ref(this.db, 'notes');
    return listVal(notesRef, { keyField: 'id' }); // Adjusted to use 'keyField' instead of 'idField'
  }

  // Method to update a note by its ID
  updateNote(id: string, note: Partial<Note>) {
    const noteRef = ref(this.db, `notes/${id}`);
    return set(noteRef, note);
  }
}
