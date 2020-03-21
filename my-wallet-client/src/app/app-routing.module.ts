import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriarContaComponent } from './pages/criar-conta/criar-conta.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'criar-conta', component: CriarContaComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
