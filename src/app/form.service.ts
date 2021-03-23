import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import { FormDTO } from './form-dto';
import { Form } from './form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  url = 'api/form';


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  getForms(): Observable<FormDTO[]> {
    return this.http.get<FormDTO[]>(this.url);
  }
  // tslint:disable-next-line:typedef
  sendForm(form: FormDTO): Observable<Form>{
    return this.http.post<Form>(this.url, form, this.httpOptions);
  }

}
