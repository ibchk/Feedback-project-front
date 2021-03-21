import {Component, Inject} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';

import { FormService } from '../form.service';
import { Form } from '../form';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent {

  feedbackForm: FormGroup;
  // @ts-ignore
  forms = Form;

  form: Form;
  // nameControl;
  // make subcategories for easier understanding
  healthCategory: any = ['-- Patients portal', '-- Doctors portal'];
  remoteCategory: any = ['--- Registration', '--- Virtual visit'];
  documentCategory: any = ['-- OpenKM', '-- Microsoft SharePoint'];

  constructor(private formBuilder: FormBuilder, @Inject(FormService) formService: FormService) {
    this.feedbackForm = this.buildForm();
    // @ts-ignore
    this.forms = formService.getForms();
    this.form = new Form();
    console.log(this.forms);
  }

  // this.nameControl = this.feedbackForm.get('name') as FormControl;
  // this.nameControl.setValue('Mark');
  // tslint:disable-next-line:typedef
  // getHealthCategory(){
  //   return this.feedbackForm.get('name');
  // }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      text: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required)
    });
  }

  submitFeedbackForm(): void {
    // @ts-ignore
    if (this.name().valid && this.email().valid && this.text().valid && this.category().valid) {
      this.feedbackForm.reset();
    }
    // console.log(this.feedbackForm.value);
    // console.log(this.feedbackForm.get('email')?.value);
    // this.feedbackForm.reset();
  }

  name(): AbstractControl | null {
    return this.feedbackForm.get('name');
  }

  email(): AbstractControl | null {
    return this.feedbackForm.get('email');
  }

  text(): AbstractControl | null {
    return this.feedbackForm.get('text');
  }

  category(): AbstractControl | null {
    return this.feedbackForm.get('category');
  }

  checkNameValidation(): boolean {
    // @ts-ignore
    return this.name().invalid && this.name().touched;
  }

  checkEmailValidation(): boolean {
    // @ts-ignore
    return this.email().invalid && this.email().touched;
  }

  checkTextValidation(): boolean {
    // @ts-ignore
    return this.text().invalid && this.text().touched;
  }

  checkCategoryValidation(): boolean {
    // @ts-ignore
    return this.category().invalid && this.category().touched;
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  // ngOnInit() {
  //   console.log(formService.getHi());
  // }

}
