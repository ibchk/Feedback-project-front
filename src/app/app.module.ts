import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackTableComponent } from './feedback-table/feedback-table.component';

@NgModule({
  declarations: [
    AppComponent,
    FeedbackFormComponent,
    FeedbackTableComponent
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
