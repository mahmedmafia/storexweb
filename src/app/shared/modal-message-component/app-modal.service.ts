import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalMessageComponentComponent } from './modal-message-component.component';

@Injectable({
  providedIn: 'root',
})
export class AppModalService {
  constructor(private modalService: BsModalService) {}
  bsModalRef!: BsModalRef;
  async openModal(title: string, message: string, duration = 800) {
    console.log('hi');
    return new Promise((resolve, reject) => {
      console.log('start promise');
      const bsModalRef = this.modalService.show(ModalMessageComponentComponent, {
        initialState: { title: title, message: message },
      });
      setTimeout(() => {
        console.log('sad');
        bsModalRef.hide();
        resolve('');
      }, duration);
    });
  }
}
