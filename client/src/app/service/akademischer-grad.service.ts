import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AkaGrad } from '../data/AkaGrad';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class AkademischerGradService {
private generalUrl = '/api/akademischergrad';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<AkaGrad[]> {
    const url = `${this.generalUrl}/getAll`;
    return this.http.get<AkaGrad[]>(url)
    .pipe(
      catchError(this.errorService.handleError<AkaGrad[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<AkaGrad> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<AkaGrad>(url)
     .pipe(
        map(akaGrade => akaGrade[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<AkaGrad>(`getAkaGrad id=${id}`))
      );
  }
getAkaGrad(id: number): Observable<AkaGrad> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<AkaGrad>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched AkaGrad id=${id}`)),
      catchError(this.errorService.handleError<AkaGrad>(`getAkaGrad id=${id}`))
    );
  }
//   searchAkaGrade(term: string): Observable<AkaGrad[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty AkaGrad array.
//      return of([]);
//    }
//    return this.http.get<AkaGrad[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found AkaGrad matching "${term}"`)),
//      catchError(this.errorService.handleError<AkaGrad[]>('searchAkaGrad', []))
//    );
//  }


  add(name: string): Observable<AkaGrad> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<AkaGrad>(url)
    .pipe(
     tap((newAkaGrad: AkaGrad) => this.errorService.log(`added AkaGrad w/ id=${newAkaGrad.gradID}`)),
      catchError(this.errorService.handleError<AkaGrad>('add'))
    );
  }

  update(id: number, bez: string): Observable<AkaGrad> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<AkaGrad>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated AkaGrad id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<AkaGrad> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<AkaGrad>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted AkaGrad id=${id}`)),
      catchError(this.errorService.handleError<AkaGrad>('deleteAkaGrad'))
    );
  }
}
