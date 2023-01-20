import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Constants } from 'src/constants';
import { AppStorage } from 'src/storage';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AccountsComponent } from './components/accounts/accounts.component';
import { LoginComponent } from './components/login/login.component';
import { MicrosoftadService } from './services/microsoftad.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [Constants, AppStorage, MicrosoftadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
