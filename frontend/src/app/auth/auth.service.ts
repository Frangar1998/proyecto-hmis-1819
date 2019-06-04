import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HttpClientModule } from '@angular/common/http';
import { User } from  './user';
import { JwtResponse } from  './jwt-response';
import { tap, map, catchError } from  'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from  'rxjs';
import { Validators } from '@angular/forms';
import { registerContentQuery } from '@angular/core/src/render3';
import { ObserveOnOperator } from 'rxjs/internal/operators/observeOn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER = "http://localhost:3000";
  authSubject  =  new  BehaviorSubject(false);
  errorEmail:boolean = false;
  errorLogin:boolean= false;

  /*
  private subject = new BehaviorSubject<string>("");
  private pullerObserver:Observable<string> = this.subject;
*/

  constructor(private httpClient: HttpClient) { }

  /*
  subscribe(observer){
    return this.pullerObserver.subscribe(observer);
  }
  */

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
  /*
    comprobarLogin(user:User){
      return new Observable<User>(observer =>{
        this.httpClient.post(`${this.AUTH_SERVER}/login`, user).pipe(
          
          map(e =>e as User),
          catchError(e =>throwError(e))
        ).subscribe(user => {
          console.log("llego1");
          observer.next(user)
          observer.complete();
        },err => {
          console.log("llego2");
          observer.error(new Error(err.message ? err.message : err))
          observer.complete();
          //this.errorLogin=true;
        }

        )
      });
      
      //if(this.httpClient.post(`${this.AUTH_SERVER}/login`, user).){}
    }
  */
  signOut() {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isAuthenticated() {
    return  this.authSubject.asObservable();
}
}