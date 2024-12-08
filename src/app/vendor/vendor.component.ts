import { Component, OnInit } from '@angular/core';
import { Vendor } from './vendor.model';
import { Event } from '../add-event-form/Event';
import { VendorService } from '../vendor.service';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
    vendors: Vendor[] = [];
    filteredVendors: Vendor[] = [];
    searchTerm: string = '';
    selectedType: string = '';
    selectedEvent: string = '';
    events: Event[] = []; 
    selectedEventId: string = ''; 
    showAddForm = false;

    constructor(private eventService: EventService, private vendorService: VendorService, private router: Router) {}

    ngOnInit() {
        this.loadEvents();
        this.loadVendors();
    }

    loadEvents() {
        this.eventService.getAllEvents().subscribe(events => {
            this.events = events;
        });
    }

    loadVendors() {
        if(!this.selectedEventId){   
            this.vendorService.getAllVendors().subscribe(vendors => { 
                this.vendors = vendors
            })
        } 
        else{  
            this.vendorService.getVendorsByEventId(this.selectedEventId).subscribe(vendors => { 
                this.vendors = vendors
            })
        }

    }

    onSearchChange() {
        this.filterVendors();
    }

    onTypeChange() {
        this.filterVendors();
    } 

    showForm = false;

    openForm() {
      this.showForm = true;
    }
  
    closeForm() {
      this.showForm = false;
      this.loadVendors();
    }


    onEventChange(event: any) {
        this.selectedEventId = event.target.value;
        this.loadVendors(); 
    }

    filterVendors() {
        this.filteredVendors = this.vendors.filter(vendor => {
          const searchMatch = !this.searchTerm || 
            vendor.name.toLowerCase().includes(this.searchTerm.toLowerCase());
          
          const typeMatch = !this.selectedType || 
            vendor.type.toUpperCase() === this.selectedType.toUpperCase();
    
          const eventMatch = !this.selectedEventId || 
            vendor.eventId === this.selectedEventId;
    
          return searchMatch && typeMatch && eventMatch;
        });
      }

}