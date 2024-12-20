import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guest } from './add-guest-form/Guest';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private apiUrl = 'http://localhost:8094/guest';

  constructor(private http: HttpClient) { }
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  saveGuest(guest: Guest): Observable<Guest> {
    return this.http.post<Guest>(this.apiUrl, guest, {
      headers: this.getAuthHeaders()
    });
  }

  getGuestById(id: string): Observable<Guest> {
    return this.http.get<Guest>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getAllGuests(): Observable<Guest[]> {
    return this.http.get<Guest[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  updateGuest(id: string, guest: Guest): Observable<Guest> {
    return this.http.put<Guest>(`${this.apiUrl}/${id}`, guest, {
      headers: this.getAuthHeaders()
    });
  }

  deleteGuest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getGuestsByEventId(eventId: string): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}/event/${eventId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getGuestsByDietaryPreference(dietaryPreference: string): Observable<Guest[]> {
    return this.http.get<Guest[]>(`${this.apiUrl}/diet/${dietaryPreference}`, {
      headers: this.getAuthHeaders()
    });
  } 

  sendReminder(guestId: string, eventDetails: any): Observable<any> {
    const url = `${this.apiUrl}/calendar/send-reminder/${guestId}`;
    const token = localStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    return this.http.post(url, eventDetails, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  sendBulkRsvp(eventId: string, eventDetails: any): Observable<any> {
    const url = `${this.apiUrl}/calendar/send-bulk-invite/${eventId}`;
    return this.http.post(url, eventDetails,       {
      headers: this.getAuthHeaders()
    });
  }


  sendRSVPInvite(guestId: string, eventDetails: {
    eventName: string;
    eventDescription: string;
    startDateTime: string;
    endDateTime: string;
  }): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/calendar/send-invite/${guestId}`,
      eventDetails,
      {
        headers: this.getAuthHeaders()
      }
    );
  } 
}

  
  // createGuestGroup(guestGroup: GuestGroup): Observable<GuestGroup> {
  //   return this.http.post<GuestGroup>(`${this.apiUrl}/group`, guestGroup);
  // }

  // getGuestGroupById(id: string): Observable<GuestGroup> {
  //   return this.http.get<GuestGroup>(`${this.apiUrl}/group/${id}`);
  // }

  // getAllGuestGroups(): Observable<GuestGroup[]> {
  //   return this.http.get<GuestGroup[]>(`${this.apiUrl}/groups`);
  // }

  // updateGuestGroup(id: string, guestGroup: GuestGroup): Observable<GuestGroup> {
  //   return this.http.put<GuestGroup>(`${this.apiUrl}/group/${id}`, guestGroup);
  // }

  // deleteGuestGroup(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/group/${id}`);
  // }

  // getGuestGroupsByEventId(eventId: string): Observable<GuestGroup[]> {
  //   return this.http.get<GuestGroup[]>(`${this.apiUrl}/group/event/${eventId}`);
  // }
// }
