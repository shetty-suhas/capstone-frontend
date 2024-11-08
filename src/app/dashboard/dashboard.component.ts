import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent { 
  items = [
    { Eventname: 'Card 1', description: 'This is the first card' },
    { Eventname: 'Card 2', description: 'This is the second card' },
    { Eventname: 'Card 3', description: 'This is the third card' },
    { Eventname: 'Card 4', description: 'This is the third card' },
    { Eventname: 'Card 5', description: 'This is the third card' },
  ];
}
