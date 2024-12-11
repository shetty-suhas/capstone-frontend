import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 
  @ViewChild('profileItem') profileItem!: ElementRef; 

  iconSrcAdd: string = "assets/plus-grey.png" 
  iconSrcEvent: string = "assets/event-grey.png" 
  iconSrcGuest: string = "assets/guest-grey.png"   
  iconSrcBudget: string = "assets/budget-grey.png"
  iconSrcVendor: string = "assets/vendor-grey.png"
  iconSrcProfile = 'assets/user.png';  
  
  constructor(private dialog: MatDialog) {}

  onHoverAdd(isHovered: boolean): void {
    this.iconSrcAdd = isHovered ? "assets/plus-white.png" : "assets/plus-grey.png";
  } 

  onHoverEvent(isHovered: boolean): void {
    this.iconSrcEvent = isHovered ? "assets/event-white.png" : "assets/event-grey.png";
  } 
  onHoverGuest(isHovered: boolean): void {
    this.iconSrcGuest = isHovered ? "assets/guest-white.png" : "assets/guest-grey.png";
  } 
  onHoverBudget(isHovered: boolean): void {
    this.iconSrcBudget = isHovered ? "assets/budget-white.png" : "assets/budget-grey.png"; 
  }
  onHoverVendor(isHovered: boolean): void {
    this.iconSrcVendor = isHovered ? "assets/vendor-white.png" : "assets/vendor-grey.png"; 
  }  
  onHoverProfile(isHovering: boolean) {
    this.iconSrcProfile = isHovering ? 'assets/user-black.png' : 'assets/user.png';
  }
  openProfileDialog(event: MouseEvent) {
    event.stopPropagation(); // Prevent event bubbling
    
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '350px',
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      position: { right: '800px', top: '350px' }
    });

    dialogRef.afterOpened().subscribe(() => {
      console.log('Dialog opened');
    });
  }
  
  showForm = false;

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
  }
  
}
