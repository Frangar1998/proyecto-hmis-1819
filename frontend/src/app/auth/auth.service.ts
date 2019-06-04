import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';
import { User } from  './user';
import { JwtResponse } from  './jwt-response';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { Validators } from '@angular/forms';
import { registerContentQuery } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER = "http://localhost:3000";
  authSubject  =  new  BehaviorSubject(false);
  errorEmail:boolean = false;
  errorLogin:boolean= false;
  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<JwtResponse> {
      return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/register`, user).pipe(
        tap((res:  JwtResponse ) => {
          if (res.user) {
            localStorage.setItem("ACCESS_TOKEN", res.user.access_token);
            this.authSubject.next(true);
          }
        })
      );
  }

  comprobarEmail(user:User){
    if(user.email.endsWith('@h.es')){
      return this.errorEmail=false;
    }else{
      return this.errorEmail = true;
    }
  }


  signIn(user: User): Observable<JwtResponse> {
    
    return this.httpClient.post(`${this.AUTH_SERVER}/login`, user).pipe(
      tap(async (res: JwtResponse) => {

        if (res.user) {
          localStorage.setItem("ACCESS_TOKEN", res.user.access_token);
          this.authSubject.next(true);
        }
      })
    );
  }

  comprobarLogin(user:User){
    this.httpClient.post(`${this.AUTH_SERVER}/login`, user).pipe(
      tap(async (res: JwtResponse) => {
        console.log("loquesea");
        if (res.user) {
          this.errorLogin = false;
        }else{
          this.errorLogin = true;
        }
      })
    );
    //if(this.httpClient.post(`${this.AUTH_SERVER}/login`, user).){}
  }

  signOut() {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isAuthenticated() {
    return  this.authSubject.asObservable();
}
}