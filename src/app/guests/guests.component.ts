import { Component, HostListener, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';
import { Guest } from '../add-guest-form/Guest';
import { Event as CustomEvent} from '../add-event-form/Event'; 
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit{ 
  events: CustomEvent[] = [];
  guests: Guest[] = [];
  filteredGuests: Guest[] = [];
  selectedEventId: string = '';
  dropdownOpen = false;
  showForm = false; 
  showEditForm = false;
  selectedGuest: Guest | null = null;
  isSendingRsvp: boolean = false;

  

  constructor(
    private eventService: EventService,
    private guestService: GuestService, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    const userId = this.authService.getUserId(); 
    if(!userId){ 
      console.log("UserId not found"); 
      return;
    }
    this.eventService.getEventsByUserId(userId).subscribe({
      next: (events) => {
        this.events = events;
        console.log('Events loaded:', events);
      },
      error: (err) => {
        console.error('Error loading events:', err);
      }
    });
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
    console.log('Dropdown state:', this.dropdownOpen);
  }

  selectOption(event: CustomEvent) {
    this.selectedEventId = event.id;
    this.dropdownOpen = false;
    this.loadGuests(this.selectedEventId);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const dropdownElement = document.querySelector('.dropdown');
    const targetElement = event.target as HTMLElement;
    
    if (dropdownElement && !dropdownElement.contains(targetElement)) {
      this.dropdownOpen = false;
    }
  }


  loadGuests(eventId: string) {

    this.guestService.getGuestsByEventId(eventId).subscribe({
      next: (guests) => {
        this.guests = guests;

      },
      error: (err) => {
        console.error('Error loading guests:', err);

      }
    });
  } 

  onGuestAdded(newGuest: Guest) {
    this.guests = [...this.guests, newGuest];
    if (this.selectedEventId) {
      this.loadGuests(this.selectedEventId);
    }
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    if (this.selectedEventId) {
      this.loadGuests(this.selectedEventId);
    }
  } 

  onGuestEdit(guest: Guest) {
    this.selectedGuest = guest;
    this.showEditForm = true;
  }

  closeEditForm() {
    this.showEditForm = false;
    this.selectedGuest = null;
    if (this.selectedEventId) {
      this.loadGuests(this.selectedEventId);
    }
  } 
  getDietaryPreferenceClass(guest: Guest): string {
    if (!guest.dietaryPreference) return '';
    return guest.dietaryPreference === 'VEG'
      ? 'vegetarian' 
      : 'non-vegetarian';
  }



  canSendRsvp(guest: Guest): boolean {
    return guest.rsvpStatus === 'NOT_SENT';
  }

  sendRsvp(guest: Guest) {
  
  }

  sendReminders(guest: Guest) {

  }

  editGuest(guest: Guest) {
    this.selectedGuest = guest;
    this.showEditForm = true;
  }

  deleteGuest(guest: Guest) {
    this.guestService.deleteGuest(guest.id).subscribe(
      () => {
        this.updateEventGuestCount();
        this.loadGuests(this.selectedEventId);
      },
      (error) => {
        console.error('Error deleting guest:', error);
      }
    );
  } 

  formatDateTime(dateTimeStr: string): string {
    try {
      // Split date and time
      const [dateStr, timeStr] = dateTimeStr.split(' ');
      
      // Split date components (dd-mm-yyyy)
      const [day, month, year] = dateStr.split('-');
      
      // Split time components (HH:mm)
      const [hours, minutes] = timeStr.split(':');
      
      // Return formatted string
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00+05:30`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }

  sendRSVP(guest: Guest, event: Event) {
    event.stopPropagation();
    this.isSendingRsvp = true;

    // First get event details
    this.eventService.getEventById(this.selectedEventId).subscribe({
      next: (eventData) => { 
        console.log(eventData.startDate)
        console.log(eventData.endDate)
        const eventDetails = {
          eventName: eventData.name,
          eventDescription: eventData.description,
          startDateTime: this.formatDateTime(eventData.startDate),
          endDateTime: this.formatDateTime(eventData.endDate)
        };

        // Then send the RSVP
        this.guestService.sendRSVPInvite(guest.id, eventDetails).subscribe({
          next: (response) => {
            console.log('RSVP sent successfully');
            guest.rsvpStatus = 'SENT';
          },
          error: (error) => {
            console.error('Error sending RSVP:', error);
          },
          complete: () => {
            this.isSendingRsvp = false;
          }
        });
      },
      error: (error) => {
        console.error('Error fetching event details:', error);
        this.isSendingRsvp = false;
        // Add error notification here
      }
    });
  }

  private updateEventGuestCount() {
    if (!this.selectedEventId) return;
    
    this.eventService.getEventById(this.selectedEventId).subscribe(
      event => {
        const updatedGuestCount = Math.max(0, event.totalGuests - 1);
        this.eventService.updateEventGuests(this.selectedEventId, updatedGuestCount).subscribe(
          () => console.log('Event guest count updated'),
          (error) => console.error('Error updating event guest count:', error)
        );
      },
      error => console.error('Error getting event details:', error)
    );
  }
}
