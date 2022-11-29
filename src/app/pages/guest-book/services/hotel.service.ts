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
    phone: '123',
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
        for (let index = 0; index < this.bookings.length; index++) {
          if (this.bookings[index].id === id) {
            if (this.bookings[index].status === 'Reserved') {
              observer.next(this.bookings.find((t) => t.id === id) as Book);
            } else if (this.bookings[index].status === 'Checked-in') {
              alert(`Tamu sudah check-in, tidak bisa diedit`);
            } else {
              alert(`Tamu sudah check-out, tidak bisa diedit`);
            }
          }
        }
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
          alert(
            `Tamu ${book.reservee.name} telah melakukan pemesanan untuk kamar ${
              book.roomNumber
            }
            selama ${book.duration} malam dengan total tagihan sebesar Rp${
              book.duration * 100000
            }.`
          );
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
            if (this.bookings[index].status === 'Checked-out') {
              this.bookings.splice(index, 1);
            } else {
              alert(`Tamu belum check-out, tidak bisa dihapus`);
            }
          }
        }
        this.setToStorage();
      } catch (error: any) {
        observer.error(error.message);
      }
    });
  }

  checkIn(book: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      if (book.status === 'Checked-out') {
        alert(
          `Tamu ${book.reservee.name} sudah check-out dari kamar ${book.roomNumber}, tidak bisa check-in.`
        );
      } else {
        try {
          book.status = 'Checked-in';
          this.save(book);
          alert(
            `Tamu ${book.reservee.name} sudah check-in pada kamar ${book.roomNumber}.`
          );
          observer.next();
        } catch (error: any) {
          observer.error(error.message);
        }
        this.setToStorage();
      }
    });
  }

  checkOut(book: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        if (book.status === 'Checked-in') {
          book.status = 'Checked-out';
          alert(
            `Tamu ${book.reservee.name} sudah check-out dari kamar ${book.roomNumber}.`
          );
          this.save(book);
          observer.next();
        } else if (book.status === 'Checked-out') {
          alert(
            `Tamu ${book.reservee.name} sudah check-out dari kamar ${book.roomNumber}.`
          );
        } else {
          alert(
            `Tamu ${book.reservee.name} tidak bisa check-out karena belum check-in`
          );
        }
      } catch (error: any) {
        observer.error(error.message);
      }
      this.setToStorage();
    });
  }
}
