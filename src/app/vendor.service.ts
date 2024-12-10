import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from './vendor/vendor.model';
import { catchError, Observable, throwError } from 'rxjs';
import { Payment } from './payment/payment.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://localhost:8097/vendor'; 

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(this.apiUrl, vendor, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getVendorById(id: string): Observable<Vendor> {
    return this.http.get<Vendor>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getAllVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.apiUrl, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateVendor(id: string, vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(`${this.apiUrl}/${id}`, vendor, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteVendor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getVendorsByEventId(eventId: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(`${this.apiUrl}/event/${eventId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getPaymentsByVendorId(vendorId: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/payment/${vendorId}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  createPayment(payment: Payment, vendorId: string): Observable<Payment> {
    return this.http.post<Payment>(
      `${this.apiUrl}/newpayment/${vendorId}`, 
      payment, 
      { headers: this.getAuthHeaders() }
    ).pipe(catchError(this.handleError));
  }

  updatePayment(paymentId: string | null, payment: Payment, vendorId: string): Observable<Payment> {
    return this.http.put<Payment>(
      `${this.apiUrl}/updatepayment/${vendorId}/${paymentId}`, 
      payment, 
      { headers: this.getAuthHeaders() }
    ).pipe(catchError(this.handleError));
  }

  deletePayment(paymentId: string, vendorId: string | null): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/deletepayment/${vendorId}/${paymentId}`, 
      { headers: this.getAuthHeaders() }
    ).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
