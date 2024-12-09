import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-eventcards',
  templateUrl: './eventcards.component.html',
  styleUrls: ['./eventcards.component.css']
})
export class EventcardsComponent {
  @Input() item: any; 
  @Output() eventDeleted = new EventEmitter<string>();
  showForm = false;  
  dropdownVisible = false;
  showUpdateForm = false;
  showDeleteConfirm = false

  constructor(private eventService: EventService) {}

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  } 
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  } 

  updateItem() {
    this.showUpdateForm = true;
    this.dropdownVisible = false;
  }

  closeUpdateForm() {
    this.showUpdateForm = false;
  }

  onEventUpdated(updatedEvent: any) {
    this.item = updatedEvent;
    this.closeUpdateForm();
  }

  deleteItem() {
    this.showDeleteConfirm = true;
    this.dropdownVisible = false;
  }

  confirmDelete() {
    this.eventService.deleteEvent(this.item.id).subscribe({
      next: () => {
        this.eventDeleted.emit(this.item.id);
        this.showDeleteConfirm = false;
      },
      error: (error) => {
        console.error('Error deleting event:', error);
      }
    });
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
  }

  setStatus(status: string) {
    console.log('Set status to', status);
    this.dropdownVisible = false; 
  }
}
