import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MyData} from '../data/MyData';
import { IsLoggedIn } from '../data/IsLoggedIn';
import { LoggedOut } from '../data/LoggedOut';
import { QuoteStatus } from '../data/QuoteStatus';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<MyData>('/api/login/database');
  }

isLoggedIn(): Observable<IsLoggedIn> {
  return this.http.get<IsLoggedIn>('/api/login/isloggedin');
}

logout() {
  return this.http.get<LoggedOut>('/api/login/logout');
}
}
