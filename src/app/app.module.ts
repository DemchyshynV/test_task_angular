import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {AppRoutingModule} from "./app-routing.module";
import { FormComponent } from './components/home-page/form/form.component';
import { AnnouncementComponent } from './components/home-page/announcements/announcement/announcement.component';
import { AnnouncementsComponent } from './components/home-page/announcements/announcements.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FormComponent,
    AnnouncementComponent,
    AnnouncementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
