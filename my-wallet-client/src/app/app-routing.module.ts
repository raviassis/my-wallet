import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriarContaComponent } from './criar-conta/criar-conta.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'criar-conta', component: CriarContaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
