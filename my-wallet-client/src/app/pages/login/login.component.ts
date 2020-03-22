import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { constantes } from 'src/app/shared/constantes';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialogs/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  getEmailErros(): string {
    if ( this.loginForm.get('email').errors?.required ) {
      return constantes.textos.CAMPO_OBRIGATORIO;
    }
    if ( this.loginForm.get('email').errors?.email) {
      return constantes.textos.DEVE_SER_EMAIL;
    }
    return '';
  }

  getSenhaErros(): string {
    if ( this.loginForm.get('senha').errors?.required ) {
      return constantes.textos.CAMPO_OBRIGATORIO;
    }
    return '';
  }

  onSubmit() {
    if ( this.loginForm.valid ) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('senha').value;
      this.loading = true;
      this.auth.login(email, password)
        .subscribe(
          (res) => {
            this.loading = false;
            this.router.navigate(['']);
          },
          (err) => {
            this.loading = false;
            if (err.status === 401) {
              const firstError = err.error.errors[0];
              this.dialog.open(DialogComponent, {
                data: {message: firstError.message}
              });
            } else {
              this.dialog.open(DialogComponent, {
                data: {message: constantes.textos.GENERIC_ERROR}
              });
            }
          }
        );
    }
  }

}
