import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Unternehmen } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class UnternehmenService {
//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(unternehmen: Observable<Unternehmen>): Observable<Unternehmen> {
    return unternehmen;
  }
  createAkaGrad(unternehmen: Observable<Unternehmen>): Observable<Unternehmen> {
   return unternehmen;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(unternehmen: Observable<Unternehmen>): Observable<Unternehmen> {
    return unternehmen;
  }
  deleteAkaGrad(unternehmen: Observable<Unternehmen>): Observable<Unternehmen> {
  return unternehmen;
  }
 getAllAkaGrad( ): Observable<Unternehmen[]> {
   return new Observable<Unternehmen[]>();
}
}
