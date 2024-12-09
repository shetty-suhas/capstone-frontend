import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guest } from '../add-guest-form/Guest';
import { GuestService } from '../guest.service';
import { EventService } from '../event.service';


@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit{  
  @Input() guest!: Guest;
  @Input() eventId!: string; 
  @Output() guestEdit = new EventEmitter<Guest>();   





  constructor(private guestService: GuestService, private eventService: EventService){}
  ngOnInit(): void {

  }

  sendRsvp() {

  } 

  getDietaryPreferenceClass(): string {
    if (!this.guest.dietaryPreference) return '';
    return this.guest.dietaryPreference === 'VEG' 
      ? 'vegetarian' 
      : 'non-vegetarian';
  }



  sendReminders() {

  }

  editGuest() {
    this.guestEdit.emit(this.guest);  
  }


  deleteGuest() {
    this.guestService.deleteGuest(this.guest.id).subscribe(
      () => {
        this.updateEventGuestCount();
      
      },
      (error) => {
        console.error('Error deleting guest:', error);
      }
    );
  }  
  private updateEventGuestCount() {
    this.eventService.getEventById(this.eventId).subscribe(
      event => {
        const updatedGuestCount = Math.max(0, event.totalGuests - 1);
        this.eventService.updateEventGuests(this.eventId, updatedGuestCount).subscribe(
          () => console.log('Event guest count updated'),
          (error: any) => console.error('Error updating event guest count:', error)
        );
      },
      error => console.error('Error getting event details:', error)
    );
  }

  canSendRsvp(): boolean {
    return this.guest.rsvpStatus === 'NOT_SENT';
  } 

  getRSVPMapping(num: number) : String{ 
    switch (num) {
      case 0:
        return 'NOT_SENT';
      case 1:
        return 'SENT';
      case 2:
        return 'REGISTERED';
      case 3:
        return 'DECLINED';
      case 4:
        return 'NO_RESPONSE';
      default:
        return 'NOT_SENT';
    }
  }
}

