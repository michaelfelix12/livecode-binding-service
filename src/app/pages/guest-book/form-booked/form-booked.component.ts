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
            this.setFormValue(this.book);
          },
        });
      },
    });
  }

  ngOnChanges(): void {
    this.setFormValue(this.book);
    console.log(this.book);
  }

  guestForm: FormGroup = new FormGroup({
    id: new FormControl(),
    status: new FormControl('', [Validators.required, Validators.minLength(3)]),
    roomNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[0-9]*$'),
      Validators.min(1),
    ]),
    duration: new FormControl('', [Validators.required, Validators.min(1)]),
    guestCount: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.min(1),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[0-9]*$'),
      Validators.min(1),
    ]),
  });

  emailValidation(email: any): boolean{
    return (email).toLowerCase().match(
      /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
    )
  }

  onSubmitReservation(): void {
    const { id, status, roomNumber, duration, guestCount, name, email, phone } =
      this.guestForm.value;
    if (
      roomNumber > 2 &&
      duration > 0 &&
      guestCount > 0 &&
      name &&
      this.emailValidation(email) &&
      phone
    ) {
      this.hotelService
        .save({
          id,
          status: 'Reserved',
          roomNumber,
          duration,
          guestCount,
          reservee: {
            id,
            name,
            email,
            phone,
          },
        })
        .subscribe();
      this.onFormReset();
      this.router.navigateByUrl(BOOK);
    } else {
      alert(`Form Reservasi harus diisi sesuai dengan ketentuan.`);
    }
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
