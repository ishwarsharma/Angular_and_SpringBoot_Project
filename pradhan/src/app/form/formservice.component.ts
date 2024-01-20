// form.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private baseUrl = 'http://localhost:1111/api/bookings'; // Update with your Spring Boot backend URL

  constructor(private http: HttpClient) { }

  submitForm(formData: any): Observable<any> {
    return this.http.post(this.baseUrl, formData);
  }
}
