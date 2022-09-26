import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ModalMessageComponentComponent } from './modal-message-component/modal-message-component.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ModalMessageComponentComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
