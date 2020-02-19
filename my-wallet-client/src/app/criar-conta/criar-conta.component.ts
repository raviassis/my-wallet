import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';

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
      email: ['', Validators.required],
      senha: [
        '',
        [Validators.required, Validators.minLength(this.minPasswordLength)]
      ],
      confirmarSenha: [
        '',
        [Validators.required, Validators.minLength(this.minPasswordLength)]
      ],
    },
    { validators: this.diferenteDe},
  );

  diferenteDe(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const diferentes = control.get('senha') !== control.get('confirmarSenha');
      return diferentes ? { senhasDiferentes : true} : null;
    };
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.contaForm.controls.nome.value);
  }

}
