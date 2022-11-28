import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { BOOK, Book } from '../models/book.model';
import { Guest } from '../models/guest.model';

@Injectable({
  providedIn: 'root',
})

export class HotelService {
  private bookings: Book[] = [];
  guests: Guest = {
    id: 1,
    name: 'Mike',
    email: 'mike@gmail.com',
    phone: '123'
  };

  private storage: Storage = sessionStorage;

  constructor() {}

  private setToStorage(): void {
    this.storage.setItem(BOOK, JSON.stringify(this.bookings));
  }

  list(): Observable<Book[]> {
    return new Observable<Book[]>((observer: Observer<Book[]>) => {
      const sessionBookings: string = this.storage.getItem(BOOK) as string;
      try {
        //Tenary
        //kondisi ? 'bener' : 'tidak-benar'
        const bookings: Book[] = sessionBookings
          ? JSON.parse(sessionBookings)
          : [
              // {
              //   id: 1,
              //   status: "reserved",
              //   roomNumber: "125",
              //   duration: 1, // dalam satuan malam, jika 2 berarti 2 malam menginap.
              //   guestCount: 1, // jumlah tamu yang menginap dalam 1 kamar
              //   reservee: this.guests
              // },
            ];
        this.bookings = bookings;
        this.setToStorage();
        observer.next(this.bookings);
      } catch (error: any) {
        observer.error(error.message);
      }
    });
  }

  get(id: number): Observable<Book> {
    return new Observable<Book>((observer: Observer<Book>) => {
      try {
        observer.next(this.bookings.find((t) => t.id === id) as Book);
      } catch (error: any) {
        observer.error(error.message);
      }
    });
  }

  save(book: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        if (book.id) {
          this.bookings = this.bookings.map((t) => {
            if (t.id === book.id) t = book;
            return t;
          });
        } else {
          console.log('todo.component:', book);
          book.id = this.bookings.length + 1;
          this.bookings.push(book);
          observer.next();
        }
        this.setToStorage();
      } catch (error: any) {
        observer.error(error.message);
      }
    });
  }

  remove(id: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        for (let index = 0; index < this.bookings.length; index++) {
          if (this.bookings[index].id === id) {
            this.bookings.splice(index, 1);
          }
        }
        this.setToStorage();
      } catch (error: any) {
        observer.error(error.message);
      }
    });
  }

  checkIn(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        // bookingId = 'Chekedin'
      } catch (error: any) {
        observer.error(error.message);
      }
    });
  };

  checkOut(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {

      } catch (error: any) {
        observer.error(error.message);
      }
    });
  };

}
