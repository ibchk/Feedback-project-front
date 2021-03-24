import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {FormDTO} from './form-dto';

@Injectable({
  providedIn: 'root'
})

/** Service to send feedbacks to backend and also get feedbacks from backend. */
export class FormService {

  /** Url where to send. */
  url = 'api/form';
  /** Boolean to detect if we need to update table. */
  updateNeed = true;


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  /** Method to get a list of feedbacks. */
  // tslint:disable-next-line:typedef
  getForms(): Observable<FormDTO[]> {
    return this.http.get<FormDTO[]>(this.url);
  }

  /** Method to send a feedback. */
  // @ts-ignore
  sendForm(form: FormDTO): Observable<FormDTO> {
    this.updateNeed = true;
    return this.http.post<FormDTO>(this.url, form, this.httpOptions);
  }

}
