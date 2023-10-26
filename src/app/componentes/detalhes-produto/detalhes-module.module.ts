import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DetalhesProdutoComponent } from './detalhes-produto.component';
import { AppModule } from 'src/app/app.module';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    DetalhesProdutoComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [DetalhesProdutoComponent],
  exports: [DetalhesProdutoComponent]
})
export class DetalhesModuleModule { }
