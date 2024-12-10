import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';  
import { Event } from './add-event-form/Event';
import { Budget } from './budget/budget.model';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8094/event';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  testEvent(): Observable<string> {  
    return this.http.get<string>(`${this.apiUrl}/test`, {
      headers: this.getAuthHeaders()
    });
  } 

  saveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event, {
      headers: this.getAuthHeaders()
    });
  } 

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getAllEvents(): Observable<Event[]> { 
    return this.http.get<Event[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/${event.id}`, event, {
      headers: this.getAuthHeaders()
    });
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getEventsByUserId(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  updateEventTasks(
    eventId: string, 
    taskCompleted: number, 
    totalTask: number
  ): Observable<Event> {
    return this.http.get<Event>(
      `${this.apiUrl}/tasks/${eventId}/${taskCompleted}/${totalTask}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return Promise.reject(error.message || error);
  } 

  updateEventGuests(eventId: string, totalGuests: number): Observable<Event> {
    return this.http.get<Event>(
      `${this.apiUrl}/guests/${eventId}/${totalGuests}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  } 

  getBudgetByEventId(eventId: string): Observable<Budget> {  
    return this.http.get<Budget>(
      `${this.apiUrl}/budget/${eventId}}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }
}

