import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Abschlussarbeit } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class AbschlussarbeitService {
//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(arbeit: Observable<Abschlussarbeit>): Observable<Abschlussarbeit> {
    return arbeit;
  }
  createAkaGrad(arbeit: Observable<Abschlussarbeit>): Observable<Abschlussarbeit> {
   return arbeit;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(arbeit: Observable<Abschlussarbeit>): Observable<Abschlussarbeit> {
    return arbeit;
  }
  deleteAkaGrad(arbeit: Observable<Abschlussarbeit>): Observable<Abschlussarbeit> {
  return arbeit;
  }
 getAllAkaGrad( ): Observable<Abschlussarbeit[]> {
   return new Observable<Abschlussarbeit[]>();
}
}
