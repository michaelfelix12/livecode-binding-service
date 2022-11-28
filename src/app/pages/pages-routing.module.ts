import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [
  {
    path: 'guest-book',
    loadChildren: () => import('./guest-book/guest-book.module').then(m => m.GuestBookModule),
  },
  {
    path: '',
    redirectTo: 'guest-book',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
