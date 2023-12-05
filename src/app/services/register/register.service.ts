import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/Cliente';
import { User } from 'src/app/model/login/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  BASIC_URL: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  register(user: User, cliente: Cliente): Observable<any>{

    const clienteSave = {
      username: user.username,
      password: user.password,
      email: cliente.email,
      primeiroNome: cliente.primeiroNome,
      ultimoNome: cliente.ultimoNome
    }

    return this.http.post(`${this.BASIC_URL}/api/register`, clienteSave);
  }

}
