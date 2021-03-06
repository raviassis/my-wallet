import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, ValidatorFn, ValidationErrors, FormControl, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/dialogs/dialog/dialog.component';
import { constantes } from '../../shared/constantes';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.scss']
})
export class CriarContaComponent implements OnInit {

  loading = false;
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
        [Validators.required, Validators.minLength(this.minPasswordLength), this.senhasDiferentes().bind(this)]
      ],
    }
  );

  constructor(private fb: FormBuilder,
              public location: Location,
              private router: Router,
              private dialog: MatDialog,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  private senhasDiferentes(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      if (!this.contaForm) {
        return null;
      }
      const senha = this.senha;
      const confirmarSenha = this.confirmarSenha;

      if (!(senha && confirmarSenha)) {
        return null;
      }
      const diferentes = senha.value !== confirmarSenha.value;
      return diferentes ? {senhasDiferentes: diferentes} : null;
    };
  }

  get nome() { return this.contaForm.get('nome'); }
  get sobrenome() { return this.contaForm.get('sobrenome'); }
  get email() { return this.contaForm.get('email'); }
  get senha() { return this.contaForm.get('senha'); }
  get confirmarSenha() { return this.contaForm.get('confirmarSenha'); }

  getNomeErros(): string {
    return this.nome.errors?.required
            ? constantes.textos.CAMPO_OBRIGATORIO
            : '';
  }

  getSobrenomeErros(): string {
    return this.sobrenome.errors?.required
            ? constantes.textos.CAMPO_OBRIGATORIO
            : '';
  }

  getEmailErros(): string {
    if ( this.email.errors?.required ) {
      return constantes.textos.CAMPO_OBRIGATORIO;
    }
    if ( this.email.errors?.email) {
      return constantes.textos.DEVE_SER_EMAIL;
    }
    return '';
  }

  getSenhaErros(): string {
    if ( this.senha.errors?.required ) {
      return constantes.textos.CAMPO_OBRIGATORIO;
    }
    if ( this.senha.errors?.minlength ) {
      return constantes.textos.CAMPO_TAMANHO_MINIMO.replace('{n}', this.minPasswordLength.toString());
    }
    return '';
  }

  getConfirmarSenhaErros(): string {
    if ( this.confirmarSenha.errors?.required ) {
      return constantes.textos.CAMPO_OBRIGATORIO;
    }
    if ( this.confirmarSenha.errors?.minlength ) {
      return constantes.textos.CAMPO_TAMANHO_MINIMO.replace('{n}', this.minPasswordLength.toString());
    }
    if ( this.confirmarSenha.errors?.senhasDiferentes ) {
      return constantes.textos.CONFIRMARSENHA_DIFERENTE;
    }
    return '';
  }

  onSubmit() {
    this.loading = true;
    this.userService.criarConta(this.contaForm.value)
      .subscribe(
        (res) => {
          this.loading = false;
          this.dialog.open(DialogComponent, {
            data: {
              message: constantes.textos.CONTA_CRIADA_SUCESSO,
            }
          }).afterClosed()
            .subscribe(() => {
              this.router.navigate(['']);
            });
        },
        (err) => {
          this.loading = false;
          const firstMsg = err.error.errors[0];
          this.dialog.open(DialogComponent, {
            data: {message: firstMsg.message}
          });
        },
        () => {}
      );
  }

}
