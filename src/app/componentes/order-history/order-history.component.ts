import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/model/order/order-history';
import { OrderHistoryService } from 'src/app/services/order/OrderHistory.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }


  handleOrderHistory() {
    const theEmail = this.storage.getItem('email')!;

    //retrieve data from the service
    this.orderHistoryService.getOrder(theEmail).subscribe(
      data => {
        this.orderHistoryList = data
        console.log(data);
      }
    )
  }

}
