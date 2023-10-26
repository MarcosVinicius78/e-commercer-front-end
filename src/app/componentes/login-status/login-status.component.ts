import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/login/auth-service.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  auth!: boolean;
  label!: string;

  order = "Orders"

  constructor(private route: Router, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.authSession()

  }

  authSession() {

    this.authService.isAuthenticad.subscribe(
    data => {
      this.auth = data
      this.label = "Sair"
    })

    if (sessionStorage.getItem('userdetails')) {
      this.auth = true
      this.label = "Sair"
    } else {
      this.label = "Fazer Login"
      this.auth = false;
    }
  }

  orderNav(){
    this.route.navigate(['order'])
  }

  execute() {
    console.log(this.auth)
    if (this.auth) {
      sessionStorage.setItem('userdetails', "");
      sessionStorage.setItem('XSRF-TOKEN', "");
      this.authService.isAuthenticad.next(false)
      this.authSession()
    } else {
      this.route.navigate(['login'])
    }
  }
}
