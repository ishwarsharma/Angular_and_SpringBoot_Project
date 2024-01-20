package com.ishwar.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

import com.ishwar.model.Booking;
import com.ishwar.repository.BookingRepository;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200") // Update with your Angular app URL
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    @GetMapping("/getAllBookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        if (bookingRepository.existsById(id)) {
            bookingRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("update/{id}")
    public ResponseEntity<Booking> getBookingForUpdate(@PathVariable("id") Long id) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);

        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // This code represents the update operation for a booking
    @PutMapping("/update/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);

        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();

            // Update the booking details with the data from the updatedBooking
            booking.setName(updatedBooking.getName());
            booking.setPhoneNumber(updatedBooking.getPhoneNumber());
            booking.setEmail(updatedBooking.getEmail());
            booking.setGender(updatedBooking.getGender());
            booking.setEducation(updatedBooking.getEducation());
            booking.setAccommodationType(updatedBooking.getAccommodationType());

            // Save the updated booking
            Booking savedBooking = bookingRepository.save(booking);

            return ResponseEntity.ok(savedBooking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
