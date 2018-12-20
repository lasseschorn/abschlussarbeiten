import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Adresse } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class AdresseService {
//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(adresse: Observable<Adresse>): Observable<Adresse> {
    return adresse;
  }
  createAkaGrad(adresse: Observable<Adresse>): Observable<Adresse> {
   return adresse;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(adresse: Observable<Adresse>): Observable<Adresse> {
    return adresse;
  }
  deleteAkaGrad(adresse: Observable<Adresse>): Observable<Adresse> {
  return adresse;
  }
 getAllAkaGrad( ): Observable<Adresse[]> {
   return new Observable<Adresse[]>();
}
}
