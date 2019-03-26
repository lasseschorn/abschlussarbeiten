import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Abschlussarbeit } from '../data/Abschlussarbeit';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class AbschlussarbeitService {
private generalUrl = '/api/abschlussarbeit';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Abschlussarbeit[]> {
    const url = `${this.generalUrl}/getAll`;
    return this.http.get<Abschlussarbeit[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Abschlussarbeit[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Abschlussarbeit> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Abschlussarbeit>(url)
     .pipe(
        map(abschlussarbeiten => abschlussarbeiten[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Abschlussarbeit>(`getAbschlussarbeit id=${id}`))
      );
  }
getAbschlussarbeit(id: number): Observable<Abschlussarbeit> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Abschlussarbeit>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched Abschlussarbeit id=${id}`)),
      catchError(this.errorService.handleError<Abschlussarbeit>(`getAbschlussarbeit id=${id}`))
    );
  }
//   searchAbschlussarbeiten(term: string): Observable<Abschlussarbeit[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty Abschlussarbeit array.
//      return of([]);
//    }
//    return this.http.get<Abschlussarbeit[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found branche matching "${term}"`)),
//      catchError(this.errorService.handleError<Abschlussarbeit[]>('searchAbschlussarbeiten', []))
//    );
//  }


  add(name: string): Observable<Abschlussarbeit> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Abschlussarbeit>(url)
    .pipe(
     tap((newAbschlussarbeit: Abschlussarbeit) => this.errorService.log(`added Abschlussarbeit w/ id=${newAbschlussarbeit.arbeitsID}`)),
      catchError(this.errorService.handleError<Abschlussarbeit>('add'))
    );
  }

  update(id: number, bez: string): Observable<Abschlussarbeit> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Abschlussarbeit>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated Abschlussarbeit id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Abschlussarbeit> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Abschlussarbeit>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted Abschlussarbeit id=${id}`)),
      catchError(this.errorService.handleError<Abschlussarbeit>('deleteAbschlussarbeit'))
    );
  }
}
