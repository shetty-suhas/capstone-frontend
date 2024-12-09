import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocationDialogComponent } from '../location-dialog/location-dialog.component';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent { 
  @ViewChild('searchInput') searchInput!: ElementRef;

  navLogoLocation: string = "assets/region.png"
  navLogoSettings: string = "assets/settings.png"
  navLogoUser: string = "assets/user.png"
  
  constructor(private dialog: MatDialog) {}

  openLocationDialog(): void {
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      panelClass: 'custom-dialog',
      position: { top: '80px' },
      backdropClass: 'custom-backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Selected location:', result);
      }
    });
  }

  openProfileDialog(): void {
    this.dialog.open(ProfileDialogComponent, {
      panelClass: 'custom-dialog',
      position: { top: '80px', right: '20px' },
      backdropClass: 'custom-backdrop'
    });
  }
}