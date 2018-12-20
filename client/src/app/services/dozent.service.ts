import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Dozent } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class DozentService {
//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(dozent: Observable<Dozent>): Observable<Dozent> {
    return dozent;
  }
  createAkaGrad(dozent: Observable<Dozent>): Observable<Dozent> {
   return dozent;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(dozent: Observable<Dozent>): Observable<Dozent> {
    return dozent;
  }
  deleteAkaGrad(dozent: Observable<Dozent>): Observable<Dozent> {
  return dozent;
  }
 getAllAkaGrad( ): Observable<Dozent[]> {
   return new Observable<Dozent[]>();
}
}
