import {Component, Inject} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';

import {FormService} from '../form.service';
import {FormDTO} from '../form-dto';
// @ts-ignore
import {Observable} from 'rxjs';


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

  /**
   * Builds a form and gives a validation rules to it fields.
   */
  buildForm(): FormGroup {
    return this.formBuilder.group({
      // @ts-ignore
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      text: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required)
    });
  }

  // tslint:disable-next-line:jsdoc-format
  /** submit feedback in database*/
  submitFeedbackForm(name: string, email: string, text: string, categories: string[]): void {
    this.submitClick = true;
    // @ts-ignore
    if (this.name().valid && this.email().valid && this.text().valid && this.category().valid) {
      this.formService.sendForm({name, email, text, categories} as FormDTO).subscribe();
      this.feedbackForm.reset();
      this.submitClick = false;
    }
  }

  /** Getter for name. */
  name(): AbstractControl | null {
    return this.feedbackForm.get('name');
  }

  /** Getter for email. */
  email(): AbstractControl | null {
    return this.feedbackForm.get('email');
  }

  /** Getter for name. */
  text(): AbstractControl | null {
    return this.feedbackForm.get('text');
  }

  /** Getter for category. */
  category(): AbstractControl | null {
    return this.feedbackForm.get('category');
  }

  /** Checking name validation. */
  checkNameValidation(): boolean {
    // @ts-ignore
    return this.name().invalid && this.name().touched;
  }

  /** Checking email validation. */
  checkEmailValidation(): boolean {
    // @ts-ignore
    return this.email().invalid && this.email().touched;
  }

  /** Checking text validation. */
  checkTextValidation(): boolean {
    // @ts-ignore
    return this.text().invalid && this.text().touched;
  }

  /** Checking category validation. */
  checkCategoryValidation(): boolean {
    // @ts-ignore
    return this.category().invalid && this.category().touched;
  }

  /** Checking submit validation. */
  checkSubmitClicked(): boolean {
    return this.submitClick;
  }
}
