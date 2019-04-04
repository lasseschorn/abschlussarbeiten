import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Dozent } from '../data/Dozent';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class DozentService {
 private generalUrl = '/api/dozent';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Dozent[]> {
    const url = `${this.generalUrl}/getall`;
    return this.http.get<Dozent[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Dozent[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Dozent> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Dozent>(url)
     .pipe(
        map(dozenten => dozenten[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Dozent>(`getDozent id=${id}`))
      );
  }
getDozent(id: number): Observable<Dozent> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Dozent>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched Dozent id=${id}`)),
      catchError(this.errorService.handleError<Dozent>(`getDozent id=${id}`))
    );
  }
//   searchDozenten(term: string): Observable<Dozent[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty Dozent array.
//      return of([]);
//    }
//    return this.http.get<Dozent[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found Dozent matching "${term}"`)),
//      catchError(this.errorService.handleError<Dozent[]>('searchDozenten', []))
//    );
//  }


  add(name: string): Observable<Dozent> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Dozent>(url)
    .pipe(
     tap((newDozent: Dozent) => this.errorService.log(`added Dozent w/ id=${newDozent.personenID}`)),
      catchError(this.errorService.handleError<Dozent>('add'))
    );
  }

  update(id: number, bez: string): Observable<Dozent> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Dozent>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated Dozent id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Dozent> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Dozent>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted Dozent id=${id}`)),
      catchError(this.errorService.handleError<Dozent>('deleteDozent'))
    );
  }
}
