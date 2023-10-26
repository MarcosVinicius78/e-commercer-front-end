import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../LocalStorage.service';
import { Subject, map, tap } from 'rxjs';
import { User } from 'src/app/model/login/User';

export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  BASIC_URL: string = "http://localhost:8080";

  isAuthenticad: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private storageService: LocalStorageService) { }

  login(username: string, password: string){

    let user = new User();

    user.username = username
    user.password = password

    window.sessionStorage.setItem('userdetails', JSON.stringify(user));

    this.isAuthenticad.next(true);

    return this.http.get(`${this.BASIC_URL}/api/user`, {observe: 'response', withCredentials: true});

    // return this.http.post<[]>(this.BASIC_URL + 'authenticate',
    //   { username, password },
    //   { observe: 'response' })
    //   .pipe(
    //     tap(_ => this.log("User Authentication")),
    //     map((res: HttpResponse<any>) => {
    //       this.storageService.saveUserId(res.body.userId);
    //       this.storageService.saveUserRole(res.body.role);
    //       let tokenLength = res.headers.get(AUTH_HEADER)?.length;
    //       const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7, tokenLength);
    //       this.storageService.saveToken(bearerToken);
    //       return res;
    //     })
    //   )
  }

}
