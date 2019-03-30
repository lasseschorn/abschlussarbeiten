import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Branche } from '../data/Branche';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class BrancheService {
  private generalUrl = '/api/branche';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Branche[]> {
    const url = `${this.generalUrl}/getAll`;
    return this.http.get<Branche[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Branche[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Branche> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Branche>(url)
     .pipe(
        map(branchen => branchen[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Branche>(`getBranche id=${id}`))
      );
  }
getBranche(id: number): Observable<Branche> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Branche>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched branche id=${id}`)),
      catchError(this.errorService.handleError<Branche>(`getBranche id=${id}`))
    );
  }
//   searchHeroes(term: string): Observable<Branche[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty branche array.
//      return of([]);
//    }
//    return this.http.get<Branche[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found branche matching "${term}"`)),
//      catchError(this.errorService.handleError<Branche[]>('searchBranchen', []))
//    );
//  }


  add(name: string): Observable<Branche> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Branche>(url)
    .pipe(
     tap((newBranche: Branche) => this.errorService.log(`added branche w/ id=${newBranche.branchenID}`)),
      catchError(this.errorService.handleError<Branche>('add'))
    );
  }

  update(id: number, bez: string): Observable<Branche> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Branche>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated branche id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Branche> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Branche>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted branche id=${id}`)),
      catchError(this.errorService.handleError<Branche>('deleteBranche'))
    );
  }
}
