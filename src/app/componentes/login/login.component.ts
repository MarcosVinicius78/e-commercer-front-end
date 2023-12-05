import { getCookie } from 'typescript-cookie';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/login/User';
import { AuthServiceService } from 'src/app/services/login/auth-service.service';
import { Cliente } from 'src/app/model/Cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  validateForm!: FormGroup;
  cliente = new Cliente();

  constructor(private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthServiceService,
  ) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this.authService.login(this.validateForm.get(['username'])!.value, this.validateForm.get(['password'])!.value).subscribe( response =>{
      window.sessionStorage.setItem("Authorization", response.headers.get('Authorization')!);
      this.cliente = <any> response.body;
      window.sessionStorage.setItem("userdetails", JSON.stringify(this.cliente));
      let xsrf = getCookie("XSRF-TOKEN")!;
      window.sessionStorage.setItem("XSRF-TOKEN",xsrf);
      let email = this.cliente.email
      sessionStorage.setItem('email', email);
      this.route.navigate(['dashboard']);
    }, err => {
      console.log(err);
    })

  }
}
