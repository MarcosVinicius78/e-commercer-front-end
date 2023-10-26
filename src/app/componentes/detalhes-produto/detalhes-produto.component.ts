import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarItem } from 'src/app/model/CarItem';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart/Cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  produto!: Product;
  quantidade: number = 1;

  constructor(private router: ActivatedRoute,private carService: CartService, private produtosServices: ProductService) { }

  ngOnInit() {
    this.router.paramMap.subscribe(() => {
      this.detalhesDoProdutos();
    })
  }

  adcionarProduto(valor: any){
    console.log(valor)
    if (valor == "+") {
      this.quantidade++;
    }else{
      if(this.quantidade > 0){
        this.quantidade--;
      }
    }
  }

  detalhesDoProdutos() {
    const id: number = +this.router.snapshot.paramMap.get('id')!;

    this.produtosServices.getDetalhesProdutos(id).subscribe(
      data => {
        this.produto = data;
      }
      );
  }

  addCart(){
    const produtoCart = new CarItem(this.produto);

    this.carService.addCartItem(produtoCart, this.quantidade);
  }
}


