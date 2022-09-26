import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-base-auth',
  templateUrl: './base-auth.component.html',
  styleUrls: ['./base-auth.component.scss']
})
export class BaseAuthComponent implements OnInit {
  @ContentChild('error') _errTemplate!:TemplateRef<any>
  @ContentChild('hello') _HelloTemplate!:TemplateRef<any>
  @ContentChild('clickBtn') _clickBtn!:TemplateRef<any>
  @ContentChild('otherNotes') _otherNotes!:TemplateRef<any>
  @ContentChild('topControls') _topControls!:TemplateRef<any>
  @Input() isRegister=false;

  @Output() onClick:EventEmitter<any>=new EventEmitter();
  ngOnInit(): void {
  }
  @Input() form!:FormGroup<loginForm | registerForm >
  authForm!: FormGroup<loginForm
  >

  constructor() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    })
  }
  get passwordControl() {
    return this.form.controls.password;
  }
  get emailControl() {
    return this.form.controls.email;
  }
  get nameControl(){
    return this.form.controls.name!;
  }
  submitClicked(event:Event){
    event.preventDefault();
    if(!this.form.valid) this.form.markAsDirty();
    this.onClick.emit(this.form.value);
  }
}
export interface loginForm {
  email: FormControl<string | null>, password: FormControl<string | null>, name?: FormControl<string | null>
}
interface registerForm{
  email: FormControl<string | null>, password: FormControl<string | null>, name: FormControl<string | null>

}
