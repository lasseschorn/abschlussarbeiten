import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http/src/';
import { Observable } from 'rxjs/Observable'

// tslint:disable-next-line:class-name
interface myData {
  email: string;
  status: boolean;
  quote: string;
}

interface isLoggedIn {
  status: boolean;
}
interface logoutStatus {
  sussess : boolean;
}

interface quoteStatus {
  success: boolean
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<myData>('/api/data');
  }

  updateQuote(value) {
    return this.http.post<qouteStatus<('/api/quote', {
      value
    })
  }

isLoggedIn(): Observable<boolean> {
  return this.http.get<isLoggedIn>('/api/isloggedin')
}

logout() {
  return this.http.get<logoutStatus>('/api/logout')
}
}
