import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Rechtsform } from '../data/Rechtsform';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';


@Injectable({
    providedIn: 'root'
})
export class RechtsformService {
  private generalUrl = '/api/rechtsform';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Rechtsform[]> {
    const url = `${this.generalUrl}/getall`;
    return this.http.get<Rechtsform[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Rechtsform[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Rechtsform> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Rechtsform>(url)
     .pipe(
        map(rechtsformen => rechtsformen[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Rechtsform>(`get id=${id}`))
      );
  }
getRechtsform(id: number): Observable<Rechtsform> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Rechtsform>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched rechtsform id=${id}`)),
      catchError(this.errorService.handleError<Rechtsform>(`getRechtsform id=${id}`))
    );
  }
//   searchHeroes(term: string): Observable<Rechtsform[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty hero array.
//      return of([]);
//    }
//    return this.http.get<Rechtsform[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found rechtsform matching "${term}"`)),
//      catchError(this.errorService.handleError<Rechtsform[]>('searchRechtsformen', []))
//    );
//  }


  add(name: string): Observable<Rechtsform> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Rechtsform>(url)
    .pipe(
     tap((newRechtsform: Rechtsform) => this.errorService.log(`added Rechtsform w/ id=${newRechtsform.rechtsformID}`)),
      catchError(this.errorService.handleError<Rechtsform>('add'))
    );
  }

  update(id: number, bez: string): Observable<Rechtsform> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Rechtsform>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated rechtsform id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Rechtsform> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Rechtsform>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted rechtsform id=${id}`)),
      catchError(this.errorService.handleError<Rechtsform>('deleteRechtsform'))
    );
  }
}
