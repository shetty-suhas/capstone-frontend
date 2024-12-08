import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';  
import { Event } from './add-event-form/Event';
import { Budget } from './budget/budget.model';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8093/event';

  constructor(private http: HttpClient) {}

  testEvent(): Observable<string> {  
    return this.http.get<string>(`${this.apiUrl}/test`);
  } 

  saveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event);
  } 

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`);
  }

  getAllEvents(): Observable<Event[]> { 
    return this.http.get<Event[]>(this.apiUrl);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${event.id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getEventsByUserId(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/user/${userId}`);
  }


  updateEventTasks(
    eventId: string, 
    taskCompleted: number, 
    totalTask: number
  ): Observable<Event> {
    return this.http.get<Event>(
      `${this.apiUrl}/tasks/${eventId}/${taskCompleted}/${totalTask}`
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return Promise.reject(error.message || error);
  } 

  updateEventGuests(eventId: string, totalGuests: number): Observable<Event> {
    return this.http.get<Event>(
      `${this.apiUrl}/guests/${eventId}/${totalGuests}`, 
    );
  } 

  getBudgetByEventId(eventId: string) : Observable<Budget>{  
    return this.http.get<Budget>(
      `${this.apiUrl}/budget/${eventId}}`
    )
  }
}
