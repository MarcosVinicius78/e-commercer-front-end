import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/login/User';

@Injectable()
export class AuthRouteguard {

  user = new User();

  constructor(private router: Router) { }

  canActivate(){

    if(window.sessionStorage.getItem('userdetails')){

      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }


  }
}
