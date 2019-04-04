import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Studiengang } from '../data/Studiengang';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class StudiengangService {

private generalUrl = '/api/studiengang';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Studiengang[]> {
    const url = `${this.generalUrl}/getall`;
    return this.http.get<Studiengang[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Studiengang[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Studiengang> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Studiengang>(url)
     .pipe(
        map(studiengang => studiengang[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Studiengang>(`getStudiengang id=${id}`))
      );
  }
getStudiengang(id: number): Observable<Studiengang> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Studiengang>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched Studiengang id=${id}`)),
      catchError(this.errorService.handleError<Studiengang>(`getStudiengang id=${id}`))
    );
  }
//   searchStudiengang(term: string): Observable<Studiengang[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty Studiengang array.
//      return of([]);
//    }
//    return this.http.get<Studiengang[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found Studiengang matching "${term}"`)),
//      catchError(this.errorService.handleError<Studiengang[]>('searchStudiengang', []))
//    );
//  }


  add(name: string): Observable<Studiengang> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Studiengang>(url)
    .pipe(
     tap((newStudiengang: Studiengang) => this.errorService.log(`added Studiengang w/ id=${newStudiengang.studiengangID}`)),
      catchError(this.errorService.handleError<Studiengang>('add'))
    );
  }

  update(id: number, bez: string): Observable<Studiengang> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Studiengang>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated branche id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Studiengang> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Studiengang>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted Studiengang id=${id}`)),
      catchError(this.errorService.handleError<Studiengang>('deleteStudiengang'))
    );
  }
}
