// edit.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms'; // Import FormBuilder and FormGroup
import { BookingService } from '../booking-list/booking.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup; // Declare a FormGroup for your form
  bookingData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private fb: FormBuilder // Inject the FormBuilder
  ) {
    // Initialize the FormGroup and define form controls
    this.editForm = this.fb.group({
      name: [''], // Add more form controls for other fields
      gender: [''],
      phoneNumber: [''],
      email: [''],
      education: [''],
      accommodationType: ['']
    });
  }

  ngOnInit(): void {
    // Fetch the booking details based on the route parameter
    const bookingId = this.route.snapshot.params['id'];
    this.bookingService.getBookingForUpdate(bookingId).subscribe(data => {
      this.bookingData = data;

      // Update form controls with the fetched data
      this.editForm.patchValue({
        name: this.bookingData.name,
        gender: this.bookingData.gender,
        phoneNumber: this.bookingData.phoneNumber,
        email: this.bookingData.email,
        education: this.bookingData.education,
        accommodationType: this.bookingData.accommodationType
      });
    });
  }

  updateBooking(): void {
    const bookingId = this.route.snapshot.params['id'];
    const updatedData = this.editForm.value; // Get form values

    this.bookingService.updateBooking(bookingId, updatedData).subscribe(() => {
      console.log('Booking updated successfully');
      // Redirect to the booking list or any other page after updating
      this.router.navigate(['/booking-list']);
    });
  }

  onSubmit() {
    // Assuming this.editForm is your FormGroup
    if (this.editForm.valid) { // Check if the form is valid before submitting
      const formValues = this.editForm.value;
      const bookingId = this.route.snapshot.params['id'];

      this.bookingService.updateBooking(bookingId, formValues).subscribe(
        response => {
          console.log('Edit successful:', response);
          // Additional logic after successful edit if needed
          // Redirect to the booking list or any other page after updating
          this.router.navigate(['/booking-list']);
        },
        error => {
          console.error('Error editing:', error);
          // Handle error if needed
        }
      );
    } else {
      console.log('Form is invalid. Please check the fields.');
      // You might want to display a message to the user or handle invalid form state.
    }
  }


}
