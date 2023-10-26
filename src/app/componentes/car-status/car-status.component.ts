import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/Cart.service';

@Component({
  selector: 'app-car-status',
  templateUrl: './car-status.component.html',
  styleUrls: ['./car-status.component.css']
})
export class CarStatusComponent implements OnInit {

  valor: number = 0.00;
  totalProdutos: number = 0;

  constructor(private carService: CartService) { }

  ngOnInit() {
    this.atualizarCar();
  }

  atualizarCar(){
    this.carService.totalPrice.subscribe(
      data => this.valor = data
    );

    this.carService.totalQuantity.subscribe(
      data => this.totalProdutos = data
    )

    this.carService.calcularSomaDosProdutos()
  }

}
