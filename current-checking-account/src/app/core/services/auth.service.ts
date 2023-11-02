import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { of, EMPTY, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { jsDocComment } from '@angular/compiler';
import { JsonPipe } from '@angular/common';

const DEV = 'https://localhost:7234/v1/account/';
const PRD = 'https://iwcrm.azurewebsites.net/v1/account/';
const AUTH_API = DEV;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {
    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    login(username: string, password: string) {
      return this.http.post(
        AUTH_API + 'signin',
        {
          username,
          password,
        },
        httpOptions
      ).pipe(
        map((response) => {
          let ret = JSON.stringify(response);
          let token = JSON.parse(ret);
          const JSON_Obj = JSON.parse(ret);
          if (JSON_Obj.hasOwnProperty("accessToken"))
          {
              let returnToken = token['accessToken'];
              console.log("token :"+ returnToken);
              const decodedToken = jwt_decode(returnToken);
              var dataString = JSON.stringify(decodedToken);
              var dataJSON = JSON.parse(dataString);

              console.log('decodedToken : '+JSON.stringify({decodedToken}));
              this.localStorage.setItem('currentUser', JSON.stringify({dataJSON}));

              // store email and jwt token in local storage to keep user logged in between page refreshes
              this.localStorage.setItem('currentUser', JSON.stringify({
                    token: returnToken,
                    isAdmin: (dataJSON['role']=="Administrator"? true:false),
                    email: dataJSON['email'],
                    id: dataJSON['nameid'],
                    alias: dataJSON['email'].split('@')[0],
                    expiration: 24,
                    fullName: dataJSON['name']
              }));
          }
        }),
        delay(500)
      );
    }

    logout(): void {
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        var currentUsr = JSON.stringify(this.localStorage.getItem('currentUser'));
        var data = JSON.parse(currentUsr);
        return JSON.parse(data);
        // debugger
        // return {
        //     token: 'aaaaaaaaaaaaaaaaaaaaa',
        //     isAdmin: true,
        //     email: 'dev.mail@infowest.com.br',
        //     id: '1077',
        //     alias: 'dev.mail@infowest.com.br'.split('@')[0],
        //     expiration: moment().add(1, 'days').toDate(),
        //     fullName: 'Reginaldo Teixeira'
        // };
    }

    passwordResetRequest(email: string) {
        return of(true).pipe(delay(1000));
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).pipe(delay(1000));
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).pipe(delay(1000));
    }
}

