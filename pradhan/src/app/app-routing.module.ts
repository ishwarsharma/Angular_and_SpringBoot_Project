import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentBodyComponent } from './content-body/content-body.component';
import { FormComponent } from './form/form.component';
import { AboutComponent } from './about/about.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { EditComponent } from './edit/edit.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', component: ContentBodyComponent },
  { path: 'form', component: FormComponent },
  {path: 'about', component: AboutComponent},
  { path: 'bookings', component: BookingListComponent },
  {path:'edit/:id',component: EditComponent},
  {path:'update/:id',component: UpdateComponent}
  // Add more routes for other pages as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
