import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService, Booking } from '../booking-list/booking.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  editForm!: FormGroup;
  booking!: Booking;
  isLoading = false;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.id = +this.route.snapshot.params['id'];

    if (this.id) {
      this.bookingService.getBookingForUpdate(this.id).subscribe(data => {
        this.booking = data;
        this.loadFormWithData();
      });
    } else {
      console.error('Booking id is undefined');
    }
  }


  initializeForm(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      education: ['', Validators.required],
      accommodationType: ['', Validators.required]
    });
  }

  loadBookingDetails(): void {
    // Your existing code to load booking details if needed
  }

  loadFormWithData(): void {
    this.editForm.patchValue({
      name: this.booking.name,
      gender: this.booking.gender,
      phoneNumber: this.booking.phoneNumber,
      email: this.booking.email,
      education: this.booking.education,
      accommodationType: this.booking.accommodationType,
    });
  }

  // update.component.ts
  updateData() {
    const updatedData = { id: this.id, ...this.editForm.value };
    this.bookingService.updateData(updatedData).subscribe(
      (updatedBooking: Booking) => {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Booking information has been updated successfully.',
        }).then(() => {
          this.booking = updatedBooking;
          this.router.navigate(['/bookings']);
        });
      },
      (error) => {
        console.error('Update failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while updating the booking.',
        });
      }
    );
  }




}
