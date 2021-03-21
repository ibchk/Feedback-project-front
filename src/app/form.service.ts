import { Injectable } from '@angular/core';

import { Form } from './form';

const FORMS: Form[] = [
  // @ts-ignore
  { name: 'Kelly', email: 'kelly@gmail.com', text: 'Great, product!', category: ['Power', 'Food']},
  // @ts-ignore
  { name: 'Elina', email: 'elina@gmail.com', text: 'Great, so good!', category: ['Siri', 'Sooool']},
  // @ts-ignore
  { name: 'Molly', email: 'molly@gmail.com', text: 'Awful!', category: ['Power']},
  // @ts-ignore
  { name: 'Sally', email: 'sally@gmail.com', text: 'Super!!!', category: []}
];

@Injectable()
export class FormService {

  constructor() {

  }

  // tslint:disable-next-line:typedef
  getForms(){
    return FORMS;
  }

}
