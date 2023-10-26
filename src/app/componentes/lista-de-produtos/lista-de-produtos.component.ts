import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarItem } from 'src/app/model/CarItem';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart/Cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-lista-de-produtos',
  templateUrl: './lista-de-produtos.component.html',
  styleUrls: ['./lista-de-produtos.component.scss']
})
export class ListaDeProdutosComponent implements OnInit {

  searchMode: boolean = false;
  products: Product[] = [];
  currentCategoryId!: number;
  stringKeyword!: string;

  page: any = 0;
  size: number = 8;
  totalElementos!: number;

  constructor(public productService: ProductService,
              private carService: CartService,
              private router: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {
      this.listProduct(this.page, this.size);
    })
  }

  paginacao(valor: any){
    this.listProduct(valor.page, this.size);
  }

  listProduct(page: number, size: number) {

    this.searchMode = this.router.snapshot.paramMap.has('key');

    if (this.searchMode) {
      this.handleSearchProduct(page,size);
    }else{
      this.handleListProduct(page, size);
    }


  }

  handleSearchProduct(page: number, size: number) {
    this.stringKeyword = this.router.snapshot.paramMap.get('key')!;

    this.productService.getSearchProduct(this.stringKeyword,page,size).subscribe(
      data => {
        this.products = data._embedded.products
        this.totalElementos = data.page.totalElements;
      }
    )
  }

  handleListProduct(page: number, size: number){
    const hasCategoryId: boolean = this.router.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.router.snapshot.paramMap.get('id')!;
    }else{
      this.currentCategoryId = 1;
    }

    this.productService.getProducts(this.currentCategoryId, page, size).subscribe(
      data => {
        this.products = data.content
        this.totalElementos = data.totalElements;
      }
    )
  }

  addCart(produto: Product){
    const theCarItem = new CarItem(produto);

    this.carService.addCartItem(theCarItem,1);
  }

}
