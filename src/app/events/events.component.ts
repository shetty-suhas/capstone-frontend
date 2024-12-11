import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../add-event-form/Event';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
  events: Event[] = [] 
  filteredEvents: any[] = [];

  constructor(private eventService: EventService, private authService: AuthService){ 

  }
  ngOnInit(): void {
    const userId = this.authService.getUserId(); 
    if(!userId){ 
      console.log("UserId not found"); 
      return;
    }
    this.eventService.getEventsByUserId(userId).subscribe((data) => {
      this.events = data.map((item) => {
        const event = new Event("", "", "", "", "", "", 0, 0, "", 0, 0, 0);
        event.id = item.id;
        event.userId = item.userId;
        event.name = item.name;
        event.location = item.location;
        event.description = item.description 
        event.totalGuests = item.totalGuests 
        event.taskCompleted = item.taskCompleted
        event.totalTask = item.totalTask

        if (item.startDate) {
          const [date, time] = item.startDate.split(' ');
          const [year, day, month] = date.split('-');
          event.startDate = `${year}-${month}-${day} ${time}`;
        }
        
        if (item.endDate) {
          const [date, time] = item.endDate.split(' ');
          const [year, day, month] = date.split('-');
          event.endDate = `${year}-${month}-${day} ${time}`;
        }

        event.type = item.type;
        event.status = item.status;
        return event;
    }); 
    this.filteredEvents = this.events
  });
  }
  onClickSearch(){} 
  showForm = false; 
  openForm() {
    this.showForm = true; 
  }

  closeForm() {
    this.showForm = false;
  } 

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (!searchTerm) {
      this.filteredEvents = this.events;
      return;
    }

    const searchWords = searchTerm.split(' ').filter((word : any) => word.length > 0);

    this.filteredEvents = this.events.filter(event => {
      const eventName = event.name.toLowerCase();
      const eventLocation = event.location.toLowerCase();

      return searchWords.some((word : any) => 
        eventName.includes(word) || eventLocation.includes(word)
      );
    });
  }

  

}
