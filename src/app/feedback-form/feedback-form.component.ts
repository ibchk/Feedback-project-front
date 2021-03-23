import {Component, Inject} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';

import {FormService} from '../form.service';
import {FormDTO} from '../form-dto';
// @ts-ignore
import {Observable} from 'rxjs';
import {TableComponent} from '../table/table.component';
import {Form} from '../form';


@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent {
  feedbackForm: FormGroup;
  formService: FormService;
  submitClick: boolean;
  forms: FormDTO[] = [];

  constructor(private formBuilder: FormBuilder, @Inject(FormService) formService: FormService) {
    this.feedbackForm = this.buildForm();
    this.formService = formService;
    // @ts-ignore
    this.submitClick = false;
  }

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

  submitFeedbackForm(name: string, email: string, text: string, categories: string[]): void {
    // @ts-ignore
    if (this.name().valid && this.email().valid && this.text().valid && this.category().valid) {
      this.formService.sendForm({name, email, text, categories} as FormDTO).subscribe();
      console.log(this.formService.getForms().subscribe(forms => this.forms = forms));
      console.log(this.forms);
      // this.feedbackForm.reset();
    }
    this.submitClick = true;
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

  checkSubmitClicked(): boolean {
    return this.submitClick;
  }


}
