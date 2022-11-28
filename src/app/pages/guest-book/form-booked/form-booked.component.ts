import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book, BOOK } from '../models/book.model';
import { Guest } from '../models/guest.model';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-form-booked',
  templateUrl: './form-booked.component.html',
  styleUrls: ['./form-booked.component.scss'],
})
export class FormBookedComponent implements OnInit {
  book!: Book;

  constructor(
    private readonly hotelService: HotelService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        const { id } = params;
        //+id ini menjadikan yang string -> number
        //berlaku untuk bilangan bulat
        this.hotelService.get(+id).subscribe({
          next: (book: Book) => {
            this.book = book;
            this.setFormValue(this.book)
          }
        });
      }
    })
  }

  ngOnChanges(): void {
    this.setFormValue(this.book);
    console.log(this.book);
  }

  guestForm: FormGroup = new FormGroup({
    id: new FormControl(),
    status: new FormControl('', [Validators.required]),
    roomNumber: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    guestCount: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });

  onSubmitReservation(): void {
    const { id, status, roomNumber, duration, guestCount, name, email, phone } = this.guestForm.value
    this.hotelService.save({
      id,
      status: "Reserved",
      roomNumber,
      duration,
      guestCount,
      reservee: {
        id,
        name,
        email,
        phone
      }
    }).subscribe();
    this.onFormReset();
    this.router.navigateByUrl(BOOK)
  }

  onFormReset(): void {
    this.guestForm.reset();
  }

  setFormValue(book: Book): void {
    if (book) {
      this.guestForm.controls['id']?.setValue(book.id);
      this.guestForm.controls['status']?.setValue(book.status);
      this.guestForm.controls['roomNumber']?.setValue(book.roomNumber);
      this.guestForm.controls['duration']?.setValue(book.duration);
      this.guestForm.controls['guestCount']?.setValue(book.guestCount);
      this.guestForm.controls['name']?.setValue(book.reservee.name);
      this.guestForm.controls['email']?.setValue(book.reservee.name);
      this.guestForm.controls['phone']?.setValue(book.reservee.name);
    }
  }
}
