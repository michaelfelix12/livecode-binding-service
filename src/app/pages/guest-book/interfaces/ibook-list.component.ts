import { Book } from "../models/book.model";

export interface IBookListComponent {
  bookings: Book[];
  onReserve(booking: Book): void;
  onCheckIn(bookingId: number): void;
  onCheckOut(bookingId: number): void;
  onDeleteReservation(bookingId: number): void;
}
