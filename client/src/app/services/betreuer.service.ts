import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Betreuer } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';
@Injectable()
export class BetreuerService {
//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(betreuer: Observable<Betreuer>): Observable<Betreuer> {
    return betreuer;
  }
  createAkaGrad(betreuer: Observable<Betreuer>): Observable<Betreuer> {
   return betreuer;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(betreuer: Observable<Betreuer>): Observable<Betreuer> {
    return betreuer;
  }
  deleteAkaGrad(betreuer: Observable<Betreuer>): Observable<Betreuer> {
  return betreuer;
  }
 getAllAkaGrad( ): Observable<Betreuer[]> {
   return new Observable<Betreuer[]>();
}
}
