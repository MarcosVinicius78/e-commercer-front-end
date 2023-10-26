import { Component, OnInit } from '@angular/core';
import { CarItem } from 'src/app/model/CarItem';
import { CartService } from 'src/app/services/cart/Cart.service';

@Component({
  selector: 'app-cart-itens',
  templateUrl: './cart-itens.component.html',
  styleUrls: ['./cart-itens.component.scss']
})
export class CartItensComponent implements OnInit {

  messages = "dasd";


  produtos: CarItem[] = [];
  total: number = 0.00;
  quantidade: number = 0;

  constructor(private carService: CartService) { }

  ngOnInit() {
    this.pegarProdutos();
  }

  adcionarProduto(item: CarItem ,valor: any){
    this.carService.adcionarRemoverProduto(item, valor)
  }

  pegarProdutos(){

    this.produtos = this.carService.carItem

    this.carService.totalPrice.subscribe(
      data => this.total = data
    );

    this.carService.totalQuantity.subscribe(
      data => this.quantidade = data
    )

    this.carService.calcularSomaDosProdutos()
  }

  removerProduto(item: CarItem){
    this.carService.removerProduto(item);
  }
}
