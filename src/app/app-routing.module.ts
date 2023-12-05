import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeProdutosComponent } from './componentes/lista-de-produtos/lista-de-produtos.component';
import { DetalhesProdutoComponent } from './componentes/detalhes-produto/detalhes-produto.component';
import { CartItensComponent } from './componentes/cart-itens/cart-itens.component';
import { CheckoutComponent } from './componentes/checkout/checkout.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthRouteguard } from './routeguard/auth-routeguard.ts';
import { OrderHistoryComponent } from './componentes/order-history/order-history.component';
import { RegisterComponent } from './componentes/register/register.component';


const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthRouteguard]},
  { path: 'itens', component: CartItensComponent},
  { path: 'order', component: OrderHistoryComponent, canActivate: [AuthRouteguard]},
  { path: 'produtos/:id', component: DetalhesProdutoComponent},
  { path: 'search/:key', component: ListaDeProdutosComponent},
  { path: 'category/:id', component: ListaDeProdutosComponent},
  { path: 'category', component: ListaDeProdutosComponent},
  { path: 'products', component: ListaDeProdutosComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/products', pathMatch: 'full'},
  { path: '**', redirectTo: 'products', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
