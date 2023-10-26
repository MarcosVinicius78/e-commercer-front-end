import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from 'src/app/model/order/OrderItem';
import { OrderHistory } from 'src/app/model/order/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = "http://localhost:8080/api/order";

  constructor(private httpClient: HttpClient) { }

  getOrder(email: string): Observable<any> {

    const url = `${this.orderUrl}?email=${email}`

    return this.httpClient.get(`${url}`)
  }
}

interface GetREsponseOrder {
  content: OrderHistory[],
  orderItem: OrderItem[]
}
