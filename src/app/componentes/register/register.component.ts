import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { User } from 'src/app/model/login/User';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validateForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required]
    })
  }


  register(){

    const user: User = {
      username: this.validateForm.get(['username'])?.value,
      password: this.validateForm.get(['password'])?.value
    };

    const cliente: Cliente = {
      primeiroNome: this.validateForm.get(['primeiroNome'])?.value,
      ultimoNome: this.validateForm.get(['ultimoNome'])?.value,
      email: this.validateForm.get(['email'])?.value
    };

    this.registerService.register(user, cliente).subscribe( response => {
      this.router.navigate(['login']);
      console.log(response);
    });
  }

}
