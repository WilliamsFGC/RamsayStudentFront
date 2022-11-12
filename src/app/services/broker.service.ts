import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GenericResponse } from '../models/generic-response';
import { catchError, map, Observable } from 'rxjs';
import { SweetAlert } from '../utils/sweet-alert';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {

  private urlApi: string = 'https://localhost:44394/api/';
  private headers: HttpHeaders = new HttpHeaders({
    'content-type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  addPipe<T>($observable: Observable<any>) {
    return $observable.pipe(map((v) => {
      return v as GenericResponse<T>;
    }),
    catchError((err: any) => {
      SweetAlert.showError("An error occurred");
      throw err;
    }));
  }

  post<T>(controller: string, method: string, body: any): Observable<GenericResponse<T>> {
    return this.addPipe(this.http.post<T>(`${this.urlApi}${controller}/${method}`, body, { headers: this.headers }));
  }

  put<T>(controller: string, method: string, body: any): Observable<GenericResponse<T>> {
    return this.addPipe(this.http.put(`${this.urlApi}${controller}/${method}`, body, { headers: this.headers }));
  }

  get<T>(controller: string, method: string, body: any): Observable<GenericResponse<T>> {
    let params = '';
    for (let p in body) {
      params += (params === '' ? '?' : '&') + `${p}=${body[p]}`;
    }
    return this.addPipe(this.http.get<T>(`${this.urlApi}${controller}/${method}${params}`, { headers: this.headers }));
  }

  delete<T>(controller: string, method: string, id: number): Observable<GenericResponse<T>> {
    return this.addPipe(this.http.delete(`${this.urlApi}${controller}/${method}/${id}`, { headers: this.headers }));
  }
}
