import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Unternehmen } from '../data/Unternehmen';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class UnternehmenService {
 private generalUrl = '/api/unternehmen';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Unternehmen[]> {
    const url = `${this.generalUrl}/getall`;
    return this.http.get<Unternehmen[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Unternehmen[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Unternehmen> {
    const url = `${this.generalUrl}/getbyid?uID=${id}`;
    return this.http.get<Unternehmen>(url)
     .pipe(
        map(unternehmenen => unternehmenen[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Unternehmen>(`getUnternehmen id=${id}`))
      );
  }
getUnternehmen(id: number): Observable<Unternehmen> {
    const url = `${this.generalUrl}/getbyid?uID=${id}`;
    return this.http.get<Unternehmen>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched Unternehmen id=${id}`)),
      catchError(this.errorService.handleError<Unternehmen>(`getUnternehmen id=${id}`))
    );
  }
//   searchUnternehmen(term: string): Observable<Unternehmen[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty Unternehmen array.
//      return of([]);
//    }
//    return this.http.get<Unternehmen[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found Unternehmen matching "${term}"`)),
//      catchError(this.errorService.handleError<Unternehmen[]>('searchUnternehmen', []))
//    );
//  }


  add(name: string): Observable<Unternehmen> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Unternehmen>(url)
    .pipe(
     tap((newUnternehmen: Unternehmen) => this.errorService.log(`added Unternehmen w/ id=${newUnternehmen.unternehmensID}`)),
      catchError(this.errorService.handleError<Unternehmen>('add'))
    );
  }

  update(id: number, bez: string): Observable<Unternehmen> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Unternehmen>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated Unternehmen id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Unternehmen> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Unternehmen>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted Unternehmen id=${id}`)),
      catchError(this.errorService.handleError<Unternehmen>('deleteUnternehmen'))
    );
  }
}
