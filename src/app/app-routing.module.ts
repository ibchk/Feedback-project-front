import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// @ts-ignore
import {FeedbackFormComponent} from './feedback-form/feedback-form.component';

const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'form', component: FeedbackFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
