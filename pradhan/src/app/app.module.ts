import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormComponent } from './form/form.component';
import { FormService } from './form/formservice.component';
import { FooterComponent } from './footer/footer.component';
import { ContentBodyComponent } from './content-body/content-body.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingService } from './booking-list/booking.service';
import { EditComponent } from './edit/edit.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,
    FooterComponent,
    ContentBodyComponent,
    AboutComponent,
    BookingListComponent,
    EditComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [FormService,BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
