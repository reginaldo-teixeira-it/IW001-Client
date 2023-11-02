import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, EMPTY, Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators';
import { CurrentAccountStatementModel } from '../models/CurrentAccountStatementModel';

const DEV = 'https://localhost:44312/v1/startement/';
const PRD = 'https://iw001-api.azurewebsites.net/v1/startement/';
const USR_API = PRD;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})

export class DataBankService {
  constructor(private http: HttpClient,@Inject('LOCALSTORAGE') private localStorage: Storage) {
  }

  getAll(): Observable<CurrentAccountStatementModel[]> {
    return this.http.get<CurrentAccountStatementModel[]>(USR_API + 'get-all', httpOptions);
  }

  getByID(id:any): Observable<CurrentAccountStatementModel[]> {
    return this.http.get<CurrentAccountStatementModel[]>(USR_API + 'get-byid/'+id, httpOptions);
  }

  Create(data: CurrentAccountStatementModel): Observable<CurrentAccountStatementModel[]> {
    return this.http.post<CurrentAccountStatementModel[]>(`${USR_API}create`, data, httpOptions);
  }

  Update(data: CurrentAccountStatementModel): Observable<CurrentAccountStatementModel[]> {
    const body = JSON.stringify(data);
    console.log('dataServices :'+body);
    return this.http.put<CurrentAccountStatementModel[]>(`${USR_API}update`, data, httpOptions);
  }

  Delete(id:any): Observable<CurrentAccountStatementModel[]> {
      return this.http.delete<CurrentAccountStatementModel[]>(USR_API + 'delete/'+id, httpOptions);
  }

  Cancel(id:any): Observable<CurrentAccountStatementModel[]> {
    return this.http.put<CurrentAccountStatementModel[]>(USR_API + 'cancel/'+id, httpOptions);
}

}
