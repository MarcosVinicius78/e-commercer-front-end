import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CarItem } from '../../model/CarItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carItem: CarItem[] = [];

  storage: Storage = localStorage;

  totalPrice: Subject<number> = new Subject<number>;
  totalQuantity: Subject<number> = new Subject<number>;

  constructor() {
    let data = JSON.parse(this.storage.getItem('cart')!);
    if (data != null) {
      this.carItem = data

      this.calcularSomaDosProdutos()
    }
  }

  persistirCarItem(){
    this.storage.setItem('cart', JSON.stringify(this.carItem));
  }

  addCartItem(theCartItem: CarItem, quantidade: number){

    let existeNocarrinho: boolean = false;
    let produtoNoCarrinho!: CarItem;

    if (this.carItem.length > 0) {

      for(let itemCar of this.carItem){
        if (itemCar.id === theCartItem.id) {
          produtoNoCarrinho = itemCar;
          break;
        }
      }
      existeNocarrinho = (produtoNoCarrinho != undefined)
    }

    if (existeNocarrinho) {
      produtoNoCarrinho.quantity += quantidade;
    }else{
      theCartItem.quantity += quantidade;
      this.carItem.push(theCartItem)
    }

    this.calcularSomaDosProdutos();

  }

  adcionarRemoverProduto(produto: CarItem,operacao: string){

    let indexProduto = this.carItem.indexOf(produto);

    if (operacao == "+") {
      this.carItem[indexProduto].quantity++;
      this.calcularSomaDosProdutos()
    }else{
      if (this.carItem[indexProduto].quantity > 0) {
        this.carItem[indexProduto].quantity--;
        this.calcularSomaDosProdutos();
      }
    }
  }

  removerProduto(produto: CarItem){


    let produtoRemovido = this.carItem.indexOf(produto);

    if (produtoRemovido > -1) {
      this.carItem.splice(produtoRemovido, 1);
      this.calcularSomaDosProdutos();
    }
  }

  calcularSomaDosProdutos() {

    let total: number = 0;
    let totalDeProdutos: number = 0;

    for (let item of this.carItem) {
      total += item.quantity * item.unitPrice;
      totalDeProdutos += item.quantity;
    }


    this.totalPrice.next(total);
    this.totalQuantity.next(totalDeProdutos);

    this.persistirCarItem()
  }

}

