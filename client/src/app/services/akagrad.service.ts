import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AkaGrad } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class AkagradService {

//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(akaGrad: Observable<AkaGrad>): Observable<AkaGrad> {
    return akaGrad;
  }
  createAkaGrad(akaGrad: Observable<AkaGrad>): Observable<AkaGrad> {
   return akaGrad;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(akaGrad: Observable<AkaGrad>): Observable<AkaGrad> {
    return akaGrad;
  }
  deleteAkaGrad(akaGrad: Observable<AkaGrad>): Observable<AkaGrad> {
  return akaGrad;
  }
 getAllAkaGrad( ): Observable<AkaGrad[]> {
   return new Observable<AkaGrad[]>();
}
}
