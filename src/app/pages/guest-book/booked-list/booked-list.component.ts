import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-booked-list',
  templateUrl: './booked-list.component.html',
  styleUrls: ['./booked-list.component.scss']
})
export class BookedListComponent implements OnInit {
  bookings: Book[] = [];
  constructor(private readonly hotelService: HotelService) { }

  ngOnInit(): void {
    this.onLoadGuest();
  }

  onLoadGuest(): void {
    this.hotelService.list().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        console.log(this.bookings)
      }
    });
  }

  onReserve(booking: Book): void {

  };
  onCheckIn(book: Book): void {

  };
  onCheckOut(book: Book): void {

  };
  onDeleteReservation(book: Book): void {
    this.hotelService.remove(book.id).subscribe();
  };
}
