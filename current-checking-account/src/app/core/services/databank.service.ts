import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, EMPTY, Observable } from 'rxjs'
import { delay, map } from 'rxjs/operators';
import { DataBankModel } from '../models/databank';

const DEV = 'https://localhost:44312/v1/startement/';
const PRD = 'https://iw001-api.azurewebsites.net/v1/startement/';
const USR_API = DEV;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class DataBankService {
  constructor(private http: HttpClient,@Inject('LOCALSTORAGE') private localStorage: Storage) {
  }

  getAll(): Observable<DataBankModel[]> {
    return this.http.get<DataBankModel[]>(USR_API + 'get-all', httpOptions);
  }

  getByID(id:any): Observable<DataBankModel[]> {
    return this.http.get<DataBankModel[]>(USR_API + 'get-byid/'+id, httpOptions);
  }

  Create(data:DataBankModel){
    return this.http.put(USR_API + 'create', data);
  }

  Update(data:DataBankModel){
    return this.http.put(USR_API + 'update', data);
  }

  Delete(id:any): Observable<DataBankModel[]> {
      return this.http.get<DataBankModel[]>(USR_API + 'get-byid/'+id, httpOptions);
  }


}
