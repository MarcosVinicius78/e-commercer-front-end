import { ProductService } from './services/product.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaDeProdutosComponent } from './componentes/lista-de-produtos/lista-de-produtos.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http'
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProductCategoryMenuComponent } from './componentes/product-category-menu/product-category-menu.component';
import { SearchComponent } from './componentes/search/search.component';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { CarStatusComponent } from './componentes/car-status/car-status.component';
import { CartItensComponent } from './componentes/cart-itens/cart-itens.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalhesModuleModule } from './componentes/detalhes-produto/detalhes-module.module';

import { CardModule } from 'primeng/card';
import { CheckoutComponent } from './componentes/checkout/checkout.component';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { InputMaskModule } from 'primeng/inputmask';
import { LoginComponent } from './componentes/login/login.component';
import { LoginStatusComponent } from './componentes/login-status/login-status.component';
import { AuthRouteguard } from './routeguard/auth-routeguard.ts';
import { RequireService } from './interceptors/require.service';
import { OrderHistoryComponent } from './componentes/order-history/order-history.component';
import { RegisterComponent } from './componentes/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaDeProdutosComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    CarStatusComponent,
    CartItensComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    OrderHistoryComponent,
    RegisterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    DetalhesModuleModule,
    CardModule,
    FormsModule,
    DropdownModule,
    MessagesModule,
    InputMaskModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    })
  ],
  providers: [ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequireService,
      multi: true
    },
    AuthRouteguard],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
