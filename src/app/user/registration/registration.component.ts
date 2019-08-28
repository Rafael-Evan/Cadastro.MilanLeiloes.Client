import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MilanAuthService } from 'src/app/_services/milan-auth.service';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: any;
  registerForm: FormGroup;
  sexoOp: any[];

  civil = [
    { name: 'Solteiro(a)' },
    { name: 'Casado(a)' },
    { name: 'Outros' },
  ];

  states = [
    { name: 'Acre', abbrev: 'AC' },
    { name: 'Alagoas', abbrev: 'AL' },
    { name: 'Amapá', abbrev: 'AP' },
    { name: 'Amazonas', abbrev: 'AM' },
    { name: 'Bahia', abbrev: 'BA' },
    { name: 'Ceará', abbrev: 'CE' },
    { name: 'Distrito Federal', abbrev: 'DF' },
    { name: 'Espírito Santo', abbrev: 'ES' },
    { name: 'Goiás', abbrev: 'GO' },
    { name: 'Maranhão', abbrev: 'MA' },
    { name: 'Mato Grosso', abbrev: 'MT' },
    { name: 'Mato Grosso do Sul', abbrev: 'MS' },
    { name: 'Minas Gerais', abbrev: 'MG' },
    { name: 'Pará', abbrev: 'PA' },
    { name: 'Paraíba', abbrev: 'PB' },
    { name: 'Pernambuco', abbrev: 'PE' },
    { name: 'Piauí', abbrev: 'PI' },
    { name: 'Rio de Janeiro', abbrev: 'RJ' },
    { name: 'Rio Grande do Norte', abbrev: 'RN' },
    { name: 'Rio Grande do Sul', abbrev: 'RS' },
    { name: 'Rondônia', abbrev: 'RO' },
    { name: 'Santa Catarina', abbrev: 'SC' },
    { name: 'São Paulo', abbrev: 'SP' },
    { name: 'Sergipe', abbrev: 'SE' },
    { name: 'Tocantins', abbrev: 'TO' },
  ];

  constructor(private authService: MilanAuthService
    , private _socioAuthServ: AuthService
    , public router: Router
    , public fb: FormBuilder
    , private toastr: ToastrService
    , private route: ActivatedRoute
    , private http: Http
  ) { }

  ngOnInit() {
    this.validation();
    this.sexoOp = this.getSexo();

    $(document).ready(function () {
      $('.box').hide();
      $('#dropdown').change(function () {
        $('.box').hide();
        $('#div' + $(this).val()).show();
      });
    });
  }

  getSexo() {
    return [
      { name: 'Masculino', abbrev: 'M' },
      { name: 'Feminimo', abbrev: 'F' },
    ];
  }

  validation() {
    this.registerForm = this.fb.group({
      fullName: [this._socioAuthServ._user == null ? '' : this._socioAuthServ._user.name],
      email: [this._socioAuthServ._user == null ? '' : this._socioAuthServ._user.email, [Validators.required, Validators.email]],
      apelido: [''],
      cpf: [''],
      dataDeNascimento: [''],
      sexo: [''],
      estadoCivil: [''],
      rg: [''],
      celular: ['', Validators.required],
      telefoneResidencial: ['', Validators.required],
      telefoneComercial: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required],
      razaoSocial: [''],
      nomeFantasia: [''],
      cnpj: [''],
      inscricaoEstadual: [''],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, { validator: this.compararSenhas })
    });
  }

  compararSenhas(fb: FormGroup) {
    const confirmSenhaCtrl = fb.get('confirmPassword');
    if (confirmSenhaCtrl.errors == null || 'mismatch' in confirmSenhaCtrl.errors) {
      if (fb.get('password').value !== confirmSenhaCtrl.value) {
        confirmSenhaCtrl.setErrors({ mismatch: true });
      } else {
        confirmSenhaCtrl.setErrors(null);
      }
    }
  }

  cadastrarUsuario() {
    if (this.registerForm.valid) {
      this.user = Object.assign(
        { password: this.registerForm.get('passwords.password').value },
        this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          sessionStorage.setItem('Email', this.user.email);
          this.router.navigate(['/user/documento']);
        }, error => {
          const erro = error.error;
          erro.array.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Cadastro Duplicado!');
                break;
              default:
                this.toastr.error(`Erro no cadastro! CODE ${element.code}`);
                break;
            }
          });
        }
      );
    }
  }

  consultaCEP(cep) {
    cep = cep.replace(/\D/g, '');

    // Verifica se o campo cep possui valor informado.
    // tslint:disable-next-line: triple-equals
    if (cep != '') {

      // Expressão regular para validar o CEP.
      // tslint:disable-next-line: prefer-const
      let validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {

        this.resetaDadosFormulario();

        this.http.get(`//viacep.com.br/ws/${cep}/json`).pipe(
          map(dados => dados.json())
        ).subscribe(dados => this.populaDadosForm(dados));
      }
    }
  }

  populaDadosForm(dados) {
    this.registerForm.patchValue({
      rua: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
      cep: dados.cep,
    });
  }

  resetaDadosFormulario() {
    this.registerForm.patchValue({
      rua: null,
      complemento: null,
      bairro: null,
      cidade: null,
      estado: null,
    });
  }

}
