import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarContaComponent } from './criar-conta.component';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { constantes } from '../../shared/constantes';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DialogComponent } from '../../shared/dialogs/dialog/dialog.component';

describe('CriarContaComponent', () => {
  let component: CriarContaComponent;
  let fixture: ComponentFixture<CriarContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarContaComponent ],
      providers: [
        {provide: FormBuilder, useValue: new FormBuilder()},
        {provide: Location, useValue: {}},
        {provide: MatDialog, useClass: MatDialogMock},
        {provide: Router, useClass: RouterMock}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get formcontrol nome', () => {
    const nome = 'Teste';
    component.contaForm.get('nome').setValue(nome);
    expect(component.nome.value).toBe(nome);
  });

  it('should have required error on formcontrol nome', () => {
    const nome = '';
    component.contaForm.get('nome').setValue(nome);
    expect(component.getNomeErros()).toBe(constantes.textos.CAMPO_OBRIGATORIO);
  });

  it('should get formcontrol sobrenome', () => {
    const sobrenome = 'Teste';
    component.contaForm.get('sobrenome').setValue(sobrenome);
    expect(component.sobrenome.value).toBe(sobrenome);
  });

  it('should have required error on formcontrol sobrenome', () => {
    const sobrenome = '';
    component.contaForm.get('sobrenome').setValue(sobrenome);
    expect(component.getSobrenomeErros()).toBe(constantes.textos.CAMPO_OBRIGATORIO);
  });

  it('should get formcontrol email', () => {
    const email = 'teste@teste';
    component.contaForm.get('email').setValue(email);
    expect(component.email.value).toBe(email);
  });

  it('should have erros on formcontrol email', () => {
    let email = '';
    component.contaForm.get('email').setValue(email);
    expect(component.getEmailErros()).toBe(constantes.textos.CAMPO_OBRIGATORIO);
    email = 'teste';
    component.contaForm.get('email').setValue(email);
    expect(component.getEmailErros()).toBe(constantes.textos.DEVE_SER_EMAIL);
  });

  it('should get formcontrol senha', () => {
    const senha = 'testesenha123';
    component.contaForm.get('senha').setValue(senha);
    expect(component.senha.value).toBe(senha);
  });

  it('should have erros on formcontrol senha', () => {
    let senha = '';
    component.contaForm.get('senha').setValue(senha);
    expect(component.getSenhaErros()).toBe(constantes.textos.CAMPO_OBRIGATORIO);
    senha = 'teste';
    component.contaForm.get('senha').setValue(senha);
    expect(component.getSenhaErros()).toBe(constantes.textos.CAMPO_TAMANHO_MINIMO.replace('{n}', '8'));
  });

  it('should get formcontrol confirmarSenha', () => {
    const confirmarSenha = 'testesenha123';
    component.contaForm.get('confirmarSenha').setValue(confirmarSenha);
    expect(component.confirmarSenha.value).toBe(confirmarSenha);
  });

  it('should have erros on formcontrol confirmarSenha', () => {
    let confirmarSenha = '';
    component.contaForm.get('confirmarSenha').setValue(confirmarSenha);
    expect(component.getConfirmarSenhaErros()).toBe(constantes.textos.CAMPO_OBRIGATORIO);
    confirmarSenha = 'teste';
    component.contaForm.get('confirmarSenha').setValue(confirmarSenha);
    expect(component.getConfirmarSenhaErros()).toBe(constantes.textos.CAMPO_TAMANHO_MINIMO.replace('{n}', '8'));
    const senha = 'diferente';
    confirmarSenha = 'testesenha123';
    component.contaForm.get('senha').setValue(senha);
    component.contaForm.get('confirmarSenha').setValue(confirmarSenha);
    expect(component.getConfirmarSenhaErros()).toBe(constantes.textos.CONFIRMARSENHA_DIFERENTE);
  });

  fit('should submit and redirect to homepage', () => {
    const nome = 'Teste';
    const sobrenome = 'Teste';
    const email = 'teste@teste';
    const senha = 'testesenha123';
    const confirmarSenha = 'testesenha123';
    const matDialog = TestBed.inject(MatDialog);
    const router = TestBed.inject(Router);
    component.nome.setValue(nome);
    component.sobrenome.setValue(sobrenome);
    component.email.setValue(email);
    component.senha.setValue(senha);
    component.confirmarSenha.setValue(confirmarSenha);

    const spyDialog = spyOn(matDialog, 'open').and.returnValue({
      afterClosed() { return of({}); }
    } as MatDialogRef<DialogComponent>);

    const spyRouter = spyOn(router, 'navigate');

    component.onSubmit();
    expect(spyDialog).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalled();

  });
});

class MatDialogMock {
  open() {}
}

class RouterMock {
  navigate() {}
}
