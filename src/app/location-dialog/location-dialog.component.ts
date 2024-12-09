import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent { 
  searchQuery = '';
  locations = [
    'New York, USA',
    'London, UK',
    'Paris, France',
    'Tokyo, Japan',
    'Sydney, Australia'
  ];
  filteredLocations = this.locations;

  constructor(private dialogRef: MatDialogRef<LocationDialogComponent>) {}

  onSearchLocation(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredLocations = this.locations.filter(location => 
      location.toLowerCase().includes(query)
    );
  }

  selectLocation(location: string): void {
    this.dialogRef.close(location);
  }
}
