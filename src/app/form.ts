import {AbstractControl} from '@angular/forms';

export class Form {
  name?: AbstractControl | null;
  email?: AbstractControl | null;
  text?: AbstractControl | null;
  category?: AbstractControl | null;
}
