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
  updateNeed = true;


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  getForms(): Observable<FormDTO[]> {
    return this.http.get<FormDTO[]>(this.url);
  }
  // @ts-ignore
  sendForm(form: FormDTO): Observable<FormDTO>{
    this.updateNeed = true;
    return this.http.post<FormDTO>(this.url, form, this.httpOptions);
  }

}
