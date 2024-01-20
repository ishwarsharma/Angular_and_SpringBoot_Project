// booking-list.component.ts

import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Define the Booking interface here
interface Booking {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  gender: string;
  education: string;
  accommodationType: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  selectedBooking?: Booking;
  newBooking: Partial<Booking> = {};
  isLoading = false;

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.bookingService.getAllBookings().subscribe(
      (data: Booking[]) => {
        console.log('Bookings in component:', data);
        this.bookings = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching bookings:', error);
        this.isLoading = false;
      }
    );
  }

  // editBooking(id: number): void {
  //   // Navigate to the 'edit' route with the booking ID as a parameter
  //   this.router.navigate(['edit', id]);
  // }

  updateBooking(): void {
    if (confirm('Are you sure you want to update this booking?')) {
      if (this.selectedBooking) {
        this.bookingService.updateBooking(this.selectedBooking.id, this.selectedBooking).subscribe(
          () => {
            console.log('Booking updated successfully');
            this.loadBookings();
            this.selectedBooking = undefined;
          },
          (error) => {
            console.error('Error updating booking:', error);
          }
        );
      }
    }
  }

  deleteBooking(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.deleteBooking(id).subscribe(
          () => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your booking has been deleted.',
              icon: 'success'
            });
            console.log('Booking deleted successfully');
            // Update the frontend list by removing the deleted booking
            this.bookings = this.bookings.filter(booking => booking.id !== id);
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Unable to delete the booking.',
              icon: 'error'
            });
            console.error('Error deleting booking:', error);
          }
        );
      }
    });
  }



  navigateToUpdateBooking(id: number): void {
    this.router.navigate(['update', id]);
  }
}
