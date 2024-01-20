package com.ishwar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ishwar.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
