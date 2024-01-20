// booking.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Booking {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  gender: string;
  education: string;
  accommodationType: string;
  // Add other properties as needed
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:1111/api/bookings';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllBookings`).pipe(
      tap(data => console.log('Bookings from server:', data)),
    );
  }


  editBooking(id: number, value: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, value);
  }


  updateBooking(id: number, booking: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateBooking/${id}`, booking);
  }

  deleteBooking(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  // Define the method to get a booking by ID
  getBookingForUpdate(id: number): Observable<any> {
    console.log(id);
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.get(url);
  }



  // booking.service.ts
  updateData(bookingData: any): Observable<Booking> {
    const url = `${this.apiUrl}/update/${bookingData.id}`;
    return this.http.put<Booking>(url, bookingData);
  }







}
