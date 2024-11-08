import { Component } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent { 
  navLogoLocation: string = "assets/region.png"
  navLogoSettings: string = "assets/settings.png"
  navLogoUser: string = "assets/user.png"
  navLogoNotification: string = "assets/notification.png"

  onHoverLocation(isHovered: boolean): void {
    this.navLogoLocation = isHovered ? "assets/region-black.png" : "assets/region.png"; 
  } 
  onHoverNotification(isHovered: boolean): void {
    this.navLogoNotification = isHovered ? "assets/notification-black.png" : "assets/notification.png"; 
  } 
  onHoverSettings(isHovered: boolean): void {
    this.navLogoSettings = isHovered ? "assets/settings-black.png" : "assets/settings.png"; 
  } 
  onHoverUser(isHovered: boolean): void {
    this.navLogoUser = isHovered ? "assets/user-black.png" : "assets/user.png"; 
  } 


}
