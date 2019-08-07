import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MilanAuthService } from 'src/app/_services/milan-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(private authService: MilanAuthService
    , public router: Router
    , private toastr: ToastrService) { }

  ngOnInit() {
    if(localStorage.getItem('token') !== null) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.authService.login(this.model)
    .subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      error => {
        this.toastr.error('Falha ao tentar Logar');
      }
    )
  }

}
