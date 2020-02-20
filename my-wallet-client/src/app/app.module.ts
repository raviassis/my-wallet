/*Externos*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/******************/

/*Material*/
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
/***********/

/*Nativos*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { LoginComponent } from './login/login.component';
import { DialogComponent } from './shared/dialogs/dialog/dialog.component';
/*********/

@NgModule({
  declarations: [
    AppComponent,
    CriarContaComponent,
    LoginComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
