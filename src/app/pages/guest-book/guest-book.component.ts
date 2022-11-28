import { Component, OnInit } from '@angular/core';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-guest-book',
  templateUrl: './guest-book.component.html',
  styleUrls: ['./guest-book.component.scss']
})
export class GuestBookComponent implements OnInit {
  today: Date = new Date();
  locale: Locale = id

  constructor() { }

  ngOnInit(): void {
  }

}
