import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/compat/database';
import { Note } from './interfaces/note.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  notesRef: AngularFireList<Note>;

  constructor(private db: AngularFireDatabase) {
    this.notesRef = this.db.list('notes');
   }

  // Method to add a new note
  addNote(note: Note) {
    return this.notesRef.push(note);
  }

  // Method to get all notes
  getNotes(): Observable<Note[]> {
    return this.notesRef.snapshotChanges().pipe(
      map(actions => actions.map(action => ({ id: action.key, ...action.payload.val() })))
    );
  }
  // Method to update a note by its ID
  updateNote(id: string, note: Partial<Note>) {
    return this.notesRef.update(id, note);
  }

  getNoteAtIndex(index: number): Observable<Note> {
    return this.getNotes().pipe(
      map(notes => notes[index])
    );
  }
}
