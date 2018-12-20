import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Kategorie } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class KategorieService {
//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(kategorie: Observable<Kategorie>): Observable<Kategorie> {
    return kategorie;
  }
  createAkaGrad(kategorie: Observable<Kategorie>): Observable<Kategorie> {
   return kategorie;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(kategorie: Observable<Kategorie>): Observable<Kategorie> {
    return kategorie;
  }
  deleteAkaGrad(kategorie: Observable<Kategorie>): Observable<Kategorie> {
  return kategorie;
  }
 getAllAkaGrad( ): Observable<Kategorie[]> {
   return new Observable<Kategorie[]>();
}
}
