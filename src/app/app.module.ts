import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Constants } from 'src/constants';
import { AppStorage } from 'src/storage';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Constants, AppStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
