import { Component, ElementRef, ViewChild } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import { NoteService } from '../note.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-post-it-board',
  templateUrl: './post-it-board.component.html',
  styleUrls: ['./post-it-board.component.scss']
})
export class PostItBoardComponent {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$: Observable<Note[]>;
  
  @ViewChild('board', { static: true }) boardElementRef: ElementRef;

  private dragStartOffsetX: number = 0;
  private dragStartOffsetY: number = 0;

  constructor(private noteService: NoteService){
    this.notes$ = this.noteService.getNotes();
  }

  addNote() {
    const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    const boardRect = this.boardElementRef.nativeElement.getBoundingClientRect();
  
    const noteWidth = 100;
    const noteHeight = 100;
  
    // Calculate the maximum x and y values to ensure the note stays within the board
    const maxX = boardRect.width - noteWidth;
    const maxY = boardRect.height - noteHeight;
  
    // Generate random x and y positions within these maximum values
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
  
    // Add the note with the random position
    const newNote: Note = {
      x: randomX,
      y: randomY,
      text: '',
      color: randomColor
    };
    const currentNotes = this.notesSubject.value;
    const updatedNotes = [...currentNotes, newNote];
    
    this.notesSubject.next(updatedNotes);
  }
  
  
  onDragStart(event: DragEvent, note: Note) {
    // Calculate the offset from the mouse to the top-left corner of the note
    this.dragStartOffsetX = event.clientX - note.x;
    this.dragStartOffsetY = event.clientY - note.y;
  }
  
  onDragEnd(event: DragEvent, note: Note) {
    // Get the current position of the drag
    const newX = event.clientX - this.dragStartOffsetX;
    const newY = event.clientY - this.dragStartOffsetY;

    const boardRect = this.boardElementRef.nativeElement.getBoundingClientRect();

    // Check if the new position is within the boundaries of the board
    if (newX >= 0 && newX <= boardRect.width && newY >= 0 && newY <= boardRect.height) {
      // Update the note's position relative to the board
      note.x = newX;
      note.y = newY;
    }
    // Clear the offsets
    this.dragStartOffsetX = 0;
    this.dragStartOffsetY = 0;
  }

  onNoteEditDone(note: Note, index: number) {
    console.log(`Saving note at index ${index} with text: ${note.text}`);
    this.noteService.addNote(note);
  }
}
