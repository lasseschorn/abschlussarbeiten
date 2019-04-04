import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Betreuer } from '../data/Betreuer';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class BetreuerService {
 private generalUrl = '/api/betreuer';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Betreuer[]> {
    const url = `${this.generalUrl}/getall`;
    return this.http.get<Betreuer[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Betreuer[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Betreuer> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Betreuer>(url)
     .pipe(
        map(betreuer => betreuer[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Betreuer>(`getBetreuer id=${id}`))
      );
  }
getBetreuer(id: number): Observable<Betreuer> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Betreuer>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched Betreuer id=${id}`)),
      catchError(this.errorService.handleError<Betreuer>(`getBetreuer id=${id}`))
    );
  }
//   searchBetreuer(term: string): Observable<Betreuer[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty Betreuer array.
//      return of([]);
//    }
//    return this.http.get<Betreuer[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found Betreuer matching "${term}"`)),
//      catchError(this.errorService.handleError<Betreuer[]>('searchBetreuer', []))
//    );
//  }


  add(name: string): Observable<Betreuer> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Betreuer>(url)
    .pipe(
     tap((newBetreuer: Betreuer) => this.errorService.log(`added Betreuer w/ id=${newBetreuer.personenID}`)),
      catchError(this.errorService.handleError<Betreuer>('add'))
    );
  }

  update(id: number, bez: string): Observable<Betreuer> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Betreuer>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated Betreuer id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Betreuer> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Betreuer>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted Betreuer id=${id}`)),
      catchError(this.errorService.handleError<Betreuer>('deleteBetreuer'))
    );
  }
}
