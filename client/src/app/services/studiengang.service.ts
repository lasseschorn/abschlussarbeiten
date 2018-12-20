import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Studiengang } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class StudiengangService {
//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(studiengang: Observable<Studiengang>): Observable<Studiengang> {
    return studiengang;
  }
  createAkaGrad(studiengang: Observable<Studiengang>): Observable<Studiengang> {
   return studiengang;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(studiengang: Observable<Studiengang>): Observable<Studiengang> {
    return studiengang;
  }
  deleteAkaGrad(studiengang: Observable<Studiengang>): Observable<Studiengang> {
  return studiengang;
  }
 getAllAkaGrad( ): Observable<Studiengang[]> {
   return new Observable<Studiengang[]>();
}
}
