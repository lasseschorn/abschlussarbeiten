import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MyData } from '../data/MyData';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

//  private loggedInStatus = false;
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
//    return this.loggedInStatus;
  }
  getUserDetails(username, password) {
    // post these details to API server return user info if correct
    return this.http.post<MyData>('/api/login/auth?zID=${username}&pwd=${password}', {});
  }

// getUserDetails(email, password) {
//    return this.http.post<RegisterResponse>('/api/register', {
//      email,
//      password
//    })
//  }
}
