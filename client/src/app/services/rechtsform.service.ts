import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Rechtsform } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class RechtsformService {
//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(rechtsform: Observable<Rechtsform>): Observable<Rechtsform> {
    return rechtsform;
  }
  createAkaGrad(rechtsform: Observable<Rechtsform>): Observable<Rechtsform> {
   return rechtsform;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(rechtsform: Observable<Rechtsform>): Observable<Rechtsform> {
    return rechtsform;
  }
  deleteAkaGrad(rechtsform: Observable<Rechtsform>): Observable<Rechtsform> {
  return rechtsform;
  }
 getAllAkaGrad( ): Observable<Rechtsform[]> {
   return new Observable<Rechtsform[]>();
}
}
