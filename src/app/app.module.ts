import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { Netpay3dsModule } from 'netpay3ds';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'pacman' }),
    HttpClientModule,
    Netpay3dsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
