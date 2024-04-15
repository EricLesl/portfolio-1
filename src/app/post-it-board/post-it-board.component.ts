import { Component, ElementRef, ViewChild } from '@angular/core';

interface Note {
  x: number;
  y: number;
  text: string;
  color: string;
}

@Component({
  selector: 'app-post-it-board',
  templateUrl: './post-it-board.component.html',
  styleUrls: ['./post-it-board.component.scss']
})
export class PostItBoardComponent {
  notes: Note[] = [];
  
  @ViewChild('board', { static: true }) boardElementRef: ElementRef;

  private dragStartOffsetX: number = 0;
  private dragStartOffsetY: number = 0;

  addNote() {
    const colors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
    // Assuming this.boardElementRef is correctly referencing the .post-it-board element
    const boardRect = this.boardElementRef.nativeElement.getBoundingClientRect();
  
    // Add the note with the calculated position
    this.notes.push({
      x: boardRect.x + 100,
      y: boardRect.y + 100,
      text: '',
      color: randomColor
    });
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
}
