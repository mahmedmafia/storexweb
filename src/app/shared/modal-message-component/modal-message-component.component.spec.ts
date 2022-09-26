import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMessageComponentComponent } from './modal-message-component.component';

describe('ModalMessageComponentComponent', () => {
  let component: ModalMessageComponentComponent;
  let fixture: ComponentFixture<ModalMessageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMessageComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMessageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
