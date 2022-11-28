import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestBookComponent } from './guest-book.component';
import { BookedListComponent } from './booked-list/booked-list.component';
import { FormBookedComponent } from './form-booked/form-booked.component';
import { RouterModule } from '@angular/router';
import { GuestBookRoutingModule } from './guest-book-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from './services/hotel.service';

const components = [
  GuestBookComponent,
  BookedListComponent,
  FormBookedComponent,
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    RouterModule,
    GuestBookRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    HotelService
  ],
  exports: [
    ...components
  ]
})
export class GuestBookModule { }
