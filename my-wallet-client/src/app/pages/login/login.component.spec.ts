import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { constantes } from 'src/app/shared/constantes';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/dialogs/dialog/dialog.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: FormBuilder, useValue: new FormBuilder()},
        {provide: AuthService, useClass: AuthServiceMock},
        {provide: Router, useClass: RouterMock },
        {provide: MatDialog, useClass: MatDialogMock}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have error email required', () => {
    expect(component.getEmailErros()).toBe(constantes.textos.CAMPO_OBRIGATORIO);
  });

  it('should be a email error', () => {
    component.loginForm.get('email').setValue('teste');
    expect(component.getEmailErros()).toBe(constantes.textos.DEVE_SER_EMAIL);
  });

  it('should not have email error', () => {
    component.loginForm.get('email').setValue('teste@teste');
    expect(component.getEmailErros()).toBeFalsy();
  });

  it('should have error password required', () => {
    expect(component.getSenhaErros()).toBe(constantes.textos.CAMPO_OBRIGATORIO);
  });

  it('should not have password error', () => {
    component.loginForm.get('senha').setValue('senhasenha');
    expect(component.getSenhaErros()).toBeFalsy();
  });

  it('should not submit', () => {
    const spyAuth = spyOn(TestBed.inject(AuthService), 'login');
    component.onSubmit();
    expect(spyAuth).not.toHaveBeenCalled();
  });

  it('should submit and success', () => {
    const nome = 'nome';
    const sobrenome = 'sobrenome';
    const email = 'email@email';
    const senha = 'senhasenha';

    component.loginForm.get('email').setValue(email);
    component.loginForm.get('senha').setValue(senha);

    const spyAuth = spyOn(TestBed.inject(AuthService), 'login').and.returnValue(of({nome, sobrenome, email}));
    const spyRouter = spyOn(TestBed.inject(Router), 'navigate');
    const spyMatDialog = spyOn(TestBed.inject(MatDialog), 'open');

    component.onSubmit();
    expect(spyAuth).toHaveBeenCalledWith(email, senha);
    expect(spyRouter).toHaveBeenCalled();
    expect(spyMatDialog).not.toHaveBeenCalled();
  });

  it('should submit and error Unauthorized', () => {
    const email = 'email@email';
    const senha = 'senhasenha';
    const msgError = 'error';
    const httpError = {
      status: 401,
      error: {errors: [{message: msgError}]}
    };

    component.loginForm.get('email').setValue(email);
    component.loginForm.get('senha').setValue(senha);

    const spyAuth = spyOn(TestBed.inject(AuthService), 'login')
                    .and
                    .returnValue(throwError(httpError));
    const spyRouter = spyOn(TestBed.inject(Router), 'navigate');
    const spyMatDialog = spyOn(TestBed.inject(MatDialog), 'open');
    component.onSubmit();
    expect(spyAuth).toHaveBeenCalledWith(email, senha);
    expect(spyMatDialog).toHaveBeenCalledWith(DialogComponent, {data: {message: msgError}});
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it('should submit and error generic', () => {
    const email = 'email@email';
    const senha = 'senhasenha';
    const httpError = {
      status: 0,
    };

    component.loginForm.get('email').setValue(email);
    component.loginForm.get('senha').setValue(senha);

    const spyAuth = spyOn(TestBed.inject(AuthService), 'login')
                    .and
                    .returnValue(throwError(httpError));
    const spyRouter = spyOn(TestBed.inject(Router), 'navigate');
    const spyMatDialog = spyOn(TestBed.inject(MatDialog), 'open');
    component.onSubmit();
    expect(spyAuth).toHaveBeenCalledWith(email, senha);
    expect(spyMatDialog).toHaveBeenCalledWith(DialogComponent, {data: {message: constantes.textos.GENERIC_ERROR}});
    expect(spyRouter).not.toHaveBeenCalled();
  });

});

class AuthServiceMock {
  login() {}
}

class RouterMock {
  navigate() {}
}

class MatDialogMock {
  open() {}
}
