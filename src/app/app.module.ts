import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component'; 
import {MatListModule} from '@angular/material/list';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { ContentComponent } from './content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventcardsComponent } from './eventcards/eventcards.component';
import { AddTaskComponent } from './addtask/addtask.component';

import { AddEventFormComponent } from './add-event-form/add-event-form.component'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopNavbarComponent,
    ContentComponent,
    DashboardComponent,
    EventcardsComponent,
    AddTaskComponent,
    
    AddTaskComponent,
    AddEventFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
