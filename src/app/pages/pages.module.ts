import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component'
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { GuestBookModule } from './guest-book/guest-book.module';
import { LandingPageModule } from './landing-page/landing-page.module';

@NgModule({
    declarations: [
        PagesComponent
    ],
    exports: [
        PagesComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        GuestBookModule,
        PagesRoutingModule,
        LandingPageModule
    ]
})
export class PagesModule { }
