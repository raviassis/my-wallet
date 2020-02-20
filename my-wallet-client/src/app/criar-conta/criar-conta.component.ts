import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, ValidatorFn, ValidationErrors, FormControl, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialogs/dialog/dialog.component';
import { constantes } from '../shared/constantes';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss']
})
export class CriarContaComponent implements OnInit {
  private minPasswordLength = 8;
  contaForm = this.fb.group(
    {
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [
        '',
        [Validators.required, Validators.minLength(this.minPasswordLength)]
      ],
      confirmarSenha: [
        '',
        [Validators.required, Validators.minLength(this.minPasswordLength)]
      ],
    },
    { validators: this.senhasDiferentes() },
  );

  get nome() { return this.contaForm.get('nome'); }
  get sobrenome() { return this.contaForm.get('sobrenome'); }
  get email() { return this.contaForm.get('email'); }
  get senha() { return this.contaForm.get('senha'); }
  get confirmarSenha() { return this.contaForm.get('confirmarSenha'); }

  getEmailErros(): string {
    if ( this.email.errors.required ) {
      return constantes.textos.CAMPO_OBRIGATORIO;
    }
    if ( this.email.errors.email) {
      return 'Deve ser informado um email';
    }
    return '';
  }

  getSenhaErros(): string {
    if ( this.senha.errors.required ) {
      return constantes.textos.CAMPO_OBRIGATORIO;
    }
    if ( this.senha.errors.minlength ) {
      return `Deve ter no mínimo ${this.minPasswordLength} caracteres`;
    }
    return '';
  }

  getConfirmarSenhaErros(): string {
    if ( this.confirmarSenha.errors.required ) {
      return constantes.textos.CAMPO_OBRIGATORIO;
    }
    if ( this.confirmarSenha.errors.minlength ) {
      return `Deve ter no mínimo ${this.minPasswordLength} caracteres`;
    }
    if ( this.contaForm.errors.senhasDiferentes ) {
      return 'A senha e sua confirmação estão diferentes';
    }
    return '';
  }

  constructor(private fb: FormBuilder,
              public location: Location,
              public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.contaForm.controls.nome.value);
    this.dialog.open(DialogComponent, {
      data: {
        message: constantes.textos.CONTA_CRIADA_SUCESSO,
      }
    });
  }

  senhasDiferentes(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const senha = control.get('senha').value;
      const confirmarSenha = control.get('confirmarSenha').value;
      const diferentes = senha !== confirmarSenha;
      return diferentes ? {senhasDiferentes: 'Senhas diferentes.'} : null;
    };
  }

}
