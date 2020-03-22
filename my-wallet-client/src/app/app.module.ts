/*Externos*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
/******************/

/*Material*/
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
/***********/

/*Nativos*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarContaComponent } from './pages/criar-conta/criar-conta.component';
import { LoginComponent } from './pages/login/login.component';
import { DialogComponent } from './shared/dialogs/dialog/dialog.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { SidenavComponent } from './layouts/main/sidenav/sidenav.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
/*********/

@NgModule({
  declarations: [
    AppComponent,
    CriarContaComponent,
    LoginComponent,
    DialogComponent,
    MainComponent,
    HomeComponent,
    SidenavComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
