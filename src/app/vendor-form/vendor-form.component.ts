import { Component, EventEmitter, Output } from '@angular/core';
import { Event } from '../add-event-form/Event';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
import { VendorService } from '../vendor.service';
import { Vendor } from '../vendor/vendor.model';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.css']
})
export class VendorFormComponent{ 
  @Output() close = new EventEmitter<void>();  
  events: Event[] = [];

  constructor(private vendorService: VendorService, private eventService: EventService, private authService: AuthService){
    this.loadEvents();
  } 
  isSubmitting = false; 
  vendor = new Vendor();


  vendorTypeOptions = ['Catering', 'Venue', 'Decor', 'Photography', 'Entertainment'];

  closeForm() {
    console.log('Emitting close event');
    this.close.emit();
  }

  validateName(event: any) {
    const regex = /^[A-Za-z\s]+$/;
    if (!regex.test(event.target.value)) {
      event.target.setCustomValidity('Not applicable');
    } else {
      event.target.setCustomValidity('');
    }
  }

  validateAmount(event: any) {
    const regex = /^[0-9]+$/;
    if (!regex.test(event.target.value)) {
      event.target.setCustomValidity('Only numbers allowed');
    } else {
      event.target.setCustomValidity('');
    }
  }

  onSubmit() {
    if (!this.isSubmitting) {
      this.isSubmitting = true;

      const vendorData = {
        id: null,
        name: this.vendor.name,
        contactEmail: this.vendor.contactEmail,
        type: this.vendor.type.toUpperCase(),
        payments: [],
        totalAmount: Number(this.vendor.totalAmount),
        pendingAmount: Number(this.vendor.totalAmount), 
        eventId: this.vendor.eventId
      };

      this.vendorService.createVendor(vendorData).subscribe({
        next: () => {
          console.log('Vendor created successfully');
          this.isSubmitting = false;
          this.closeForm();
        },
        error: (error) => {
          console.error('Error creating vendor:', error);
          this.isSubmitting = false;
        }
      });
    }
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
      error: (error) => {
        console.error('Error loading events:', error);
      }
    });
  }
}
