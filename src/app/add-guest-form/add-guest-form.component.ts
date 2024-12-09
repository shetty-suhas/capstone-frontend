import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Guest } from './Guest';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GuestService } from '../guest.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-add-guest-form',
  templateUrl: './add-guest-form.component.html',
  styleUrls: ['./add-guest-form.component.css']
})
export class AddGuestFormComponent { 
  @Input() eventId: string = '';
  @Output() close = new EventEmitter<void>();  
  @Output() formOpen = new EventEmitter<boolean>();  
  @Output() guestAdded = new EventEmitter<Guest>(); 
  isSubmitting = false 

  constructor(private guestService: GuestService, private dialog: MatDialog, private eventService: EventService){

  } 
  dietaryPreference = 0;

  ngOnInit() {
    this.formOpen.emit(true); 
  }

  closeForm() {
    this.close.emit();
  } 
  guest = {
    name: '',
    email: '',
    food: '',    
  };
  eventOptions = ['corporate'];
  foodIndicatorClass = 'veg-indicator';   
  

  validateName(event: any) {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(event.target.value)) {
      event.target.setCustomValidity('Not applicable');
    } else {
      event.target.setCustomValidity('');
    }
  }


  validateForm(form: NgForm): boolean{ 
    return true;
  }  

  private updateEventGuestCount() {
    this.eventService.getEventById(this.eventId).subscribe(
      event => {
        const updatedGuestCount = event.totalGuests + 1;
        this.eventService.updateEventGuests(this.eventId, updatedGuestCount).subscribe(
          () => console.log('Event guest count updated'),
          (error: any) => console.error('Error updating event guest count:', error)
        );
      },
      error => console.error('Error getting event details:', error)
    );
  }
  

  onSubmit(form: NgForm) {
      if (this.validateForm(form)) {
        const newGuest = new Guest(
          null, this.guest.name, this.guest.email, this.guest.food, 'NOT_SENT', this.eventId
        ) 
        this.isSubmitting = true;
        this.guestService.saveGuest(newGuest).subscribe({
          next: (response) => {
            this.isSubmitting = false;  
            this.updateEventGuestCount();
            this.guestAdded.emit(newGuest);  
            this.close.emit(); 
            console.log(response)
          },
          error: (err) => {
            this.isSubmitting = false;
            console.error(err);
          } 
        }); 
        this.closeForm();
      }  
  
  
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
