import { Component } from '@angular/core';

@Component({
  selector: 'app-addingevent',
  templateUrl: './addingevent.component.html',
  styleUrls: ['./addingevent.component.css']
})
export class AddingEventComponent {
  eventName: string = '';
  eventDescription: string = '';
  startDate: string = '';
  endDate: string = '';
  startTime: string = '';
  endTime: string = '';
  eventType: string = '';
  venue: string = '';

  closeForm() {
    // Implement logic to close the form (e.g., hide it or navigate away)
  }

  submitForm() {
    // Implement form submission logic here
  }
}
