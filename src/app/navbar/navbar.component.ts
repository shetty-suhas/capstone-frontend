import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent { 
  iconSrcAdd: string = "assets/add-grey.png" 
  iconSrcEvent: string = "assets/event-grey.png" 
  iconSrcGuest: string = "assets/guest-grey.png"   
  iconSrcBudget: string = "assets/budget-grey.png" 
  iconSrcVendor: string = "assets/vendor-grey.png" 
  onHoverAdd(isHovered: boolean): void {
    this.iconSrcAdd = isHovered ? "assets/add-white.png" : "assets/add-grey.png";
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

}
