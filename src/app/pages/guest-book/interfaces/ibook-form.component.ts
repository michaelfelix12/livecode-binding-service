import { FormGroup } from "@angular/forms";
import { Book } from "../models/book.model";

export interface IBookFormComponent {
  booking?: Book;
  bookingGroup: FormGroup;
  onSubmitReservation(): void;
  onFormReset(): void;
}
