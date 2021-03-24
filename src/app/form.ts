import {AbstractControl} from '@angular/forms';
// @ts-ignore
import { Category } from './category';

export class Form {
  id?: number;
  name?: string;
  email?: string;
  text?: string;
  categoryList?: string[];
}
