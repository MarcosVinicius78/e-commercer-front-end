import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-lista-de-produtos',
  templateUrl: './lista-de-produtos.component.html',
  styleUrls: ['./lista-de-produtos.component.css']
})
export class ListaDeProdutosComponent implements OnInit {

  products: Product[] = [];

  constructor(public productService: ProductService){}

  ngOnInit(): void {
    this.listProduct();
  }

  listProduct() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
