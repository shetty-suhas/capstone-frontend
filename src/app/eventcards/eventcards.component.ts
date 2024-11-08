import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eventcards',
  templateUrl: './eventcards.component.html',
  styleUrls: ['./eventcards.component.css']
})
export class EventcardsComponent {
  @Input() item: any; 
  showForm = false;

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }
}
