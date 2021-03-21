import { Injectable } from '@angular/core';

import { Form } from './form';

@Injectable()
export class FormService {

  form: Form | undefined;

  constructor() {}

  // tslint:disable-next-line:typedef
  getForm(){
    return this.form;
  }
  // tslint:disable-next-line:typedef
  sendForm(form: Form){
    this.form = form;

  }

}
