import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import { Form } from './form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  form: Form | undefined;
  url = 'api/form';


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef

  getForm(): Observable<Form[]> {
    return this.http.get<Form[]>(this.url);
  }
  // tslint:disable-next-line:typedef
  sendForm(form: Form): Observable<Form>{
    this.form = form;
    return this.http.post<Form>(this.url, form, this.httpOptions);

  }

}
