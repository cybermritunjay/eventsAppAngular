import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = 'http://localhost:3000/api/register';
  private _loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
   }
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }
  loggedIn(){
    return !!sessionStorage.getItem('token')
  }
  getToken(){
    return sessionStorage.getItem('token')
  }
  getUserName(){
    return sessionStorage.getItem('userName')
  }
  logout(){
    sessionStorage.removeItem('token')
    this._router.navigate(['/'])
  }
}
