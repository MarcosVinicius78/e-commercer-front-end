import { Product } from './../model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../model/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products"
  private urlCategory = "http://localhost:8080/api/product_category"

  constructor(private httpClient : HttpClient) { }

  getProducts(valor: number, page: number, size: number): Observable<GetResponseProduct>{

    const produtosUrl = `${this.baseUrl}?id=${valor}&page=${page}&size=${size}`;

    return this.httpClient.get<GetResponseProduct>(produtosUrl);
  }

  getProductCategory(): Observable<ProductCategory[]>{
    return this.httpClient.get<getResponseProductCategory>(this.urlCategory).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getSearchProduct(theKeyword: string, page: number,size:number): Observable<GetResponseProduct> {
    const tempUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}&page=${page}&size=${size}`;

    return this.httpClient.get<GetResponseProduct>(tempUrl);
  }


  getDetalhesProdutos(id: number): Observable<Product> {

    const url = `${this.baseUrl}/${id}`

    return this.httpClient.get<Product>(url);
  }

  getReturnProdutos(valor: any): Observable<Product[]>{
    return this.httpClient.get<GetResponseProduct>(valor).pipe(
      map(response => response.content)
    );
  }

}

interface GetResponseProduct{
  _embedded: {
    products: Product[]
  },
  content : Product[],
  page:{
    totalElements: number
  }
  totalElements: number
}

interface getResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
