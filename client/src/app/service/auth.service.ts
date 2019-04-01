import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyData } from '../data/MyData';
import { RegisterResponse } from '../data/RegisterResponse';



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

  getUserDetails(email, password) {
    // post these details to API server return user info if correct
    return this.http.post<MyData>('/api/login/auth', {
      email,
      password
    });
  }

// getUserDetails(email, password) {
//    return this.http.post<RegisterResponse>('/api/register', {
//      email,
//      password
//    })
//  }
}
