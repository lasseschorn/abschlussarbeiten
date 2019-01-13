import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Branche } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class BrancheService {
//  private generalUrl = '/api/branche';

  constructor(private http: HttpClient) { }

  getBranche(id: number): Observable<Branche> {
	      const url = `${this.generalUrl}/?id=${id}`;
    return this.http.get<Branche>(url);
  }
   getAllBranchen( ): Observable<Branche[]> {
	   const url = `${this.generalUrl}`;
   return this.http.post<Branche[]>(url);
}
  createAkaGrad(branche: Observable<Branche>): Observable<Branche> {
   return branche;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(branche: Observable<Branche>): Observable<Branche> {
    return branche;
  }
  deleteAkaGrad(branche: Observable<Branche>): Observable<Branche> {
  return branche;
  }

}
