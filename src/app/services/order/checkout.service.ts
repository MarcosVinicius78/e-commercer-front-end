import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Estado } from '../../model/Estado';
import { Paises } from '../../model/Paises';
import { Purchase } from 'src/app/model/order/Purchase';
import { PaymentInfo } from 'src/app/model/PaymentInfo';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  urlBase: string = "http://localhost:8080/api/"

  private paymentIntentUrl = this.urlBase + 'payment-intent';

  constructor(private httpClint: HttpClient) { }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any>{

    return this.httpClint.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }

  getCartaoDeCreditoMeses(comecoMes: number): Observable<number[]> {

    let data: number[] = [];

    for (let index = comecoMes; index <= 12; index++) {
      data.push(index)
    }
    return of(data);
  }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClint.post<Purchase>(`${this.urlBase}checkout`, purchase);
  }

  getCartaodeCreditoAno(): Observable<number[]> {
    let data: number[] = [];

    const comecoAno: number = new Date().getFullYear();
    const fimDoAno: number = comecoAno + 10;

    for (let index = comecoAno; index <= fimDoAno; index++) {
      data.push(index)
    }

    return of(data);
  }

  getBandeiras(): Observable<string[]> {
    let bandeiras: string[] = [
      "Visa",
      "MasterCard",
      "Elo"
    ];

    return of(bandeiras);
  }

  getEstados(code: string): Observable<getStates> {
    return this.httpClint.get<getStates>(`${this.urlBase}states/search/findByCountryCode?code=${code}`);
  }

  getPaises(): Observable<getPaises> {
    return this.httpClint.get<getPaises>(`${this.urlBase}countries`)
  }

  postCheckout(pedido: Purchase): Observable<any> {
    return this.httpClint.post<Purchase>(`${this.urlBase}checkout/purchase`, pedido);
  }

}

interface getPaises {
  _embedded: {
    countries: Paises[]
  }

}

interface getStates {
  _embedded: {
    states: Estado[]
  }
}
