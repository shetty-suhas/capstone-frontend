import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Event } from './Event';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent{
  eventName: any;
  eventDescription: any;
  startDate: any;
  closeFormm: any;
  endDate: any;
  startTime: any;
  endTime: any;
  eventType: any;
  venue: any;  
  isSubmitting: boolean = false;
  @Output() close = new EventEmitter<void>(); 

  showNotification = false;
  notificationType: 'success' | 'error' = 'success';
  notificationMessage = '';


  closeForm() {
    this.close.emit();
  }  
  constructor(private eventService: EventService, private authService: AuthService, private dialog: MatDialog) {}


  errorMessages = {
    eventName: '',
    eventDescription: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venue: ''
  };

  formValid: boolean = true;

  resetErrorMessages() {
    this.errorMessages = {
      eventName: '',
      eventDescription: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      venue: ''
    };
  }

  validateForm(form: NgForm) {
    this.resetErrorMessages();

    let isValid = true;

    if (!this.eventName) {
      this.errorMessages.eventName = 'Event Name is required';
      isValid = false;
    }

    if (!this.eventDescription) {
      this.errorMessages.eventDescription = 'Event Description is required';
      isValid = false;
    }

    if (!this.startDate || !this.endDate || new Date(this.startDate) > new Date(this.endDate)) {
      this.errorMessages.startDate = 'Start Date must be earlier than or equal to End Date';
      isValid = false;
    }

    if (!this.startTime || !this.endTime || this.isStartTimeAfterEndTime()) {
      this.errorMessages.startTime = 'Start Time must be earlier than End Time';
      isValid = false;
    }
    if (!this.venue) {
      this.errorMessages.venue = 'Venue is required';
      isValid = false;
    }

    this.formValid = isValid;
    return isValid;
  }

  isStartTimeAfterEndTime() {
    const start = new Date(this.startDate + ' ' + this.startTime);
    const end = new Date(this.endDate + ' ' + this.endTime);
    return start >= end;
  }

  private formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  }

  onSubmit(form: NgForm) {
    console.log(this.startDate)
    console.log(this.endDate)
    if (this.validateForm(form)) { 
      const userId = this.authService.getUserId();  
      if(!userId) return;
      const newEvent = new Event(
        null,  
        userId,  
        this.eventName,
        this.venue,
        `${this.formatDate(this.startDate)} ${this.startTime}`,  
        `${this.formatDate(this.endDate)} ${this.endTime}`,  
        0, 
        0,
        this.eventDescription, 
        0,
        0,
        0
      ) 
      this.isSubmitting = true;
      this.eventService.saveEvent(newEvent).subscribe({
        next: (response: any) => {
          this.showSuccessNotification('Event created successfully!');
          setTimeout(() => {
            this.closeForm();
          }, 3000);
        },
        error: (err: any) => {
          this.showErrorNotification('Failed to create event. Please try again.');
        } 
      }); 
      this.closeForm();
    }  
  }
  private showSuccessNotification(message: string) {
    this.notificationType = 'success';
    this.notificationMessage = message;
    this.showNotification = true;
    this.hideNotificationAfterDelay();
  }

  private showErrorNotification(message: string) {
    this.notificationType = 'error';
    this.notificationMessage = message;
    this.showNotification = true;
    this.hideNotificationAfterDelay();
  }

  private hideNotificationAfterDelay() {
    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
  
  openDialog(message: string, success: boolean): void {
    this.dialog.open(NotificationDialogComponent, {
      data: {
        message: message,
        success: success
      }
    });
  }


}


