import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-message-component',
  templateUrl: './modal-message-component.component.html',
  styleUrls: ['./modal-message-component.component.scss']
})
export class ModalMessageComponentComponent implements OnInit {
  title: string='Random Text';
  message:string='';
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
