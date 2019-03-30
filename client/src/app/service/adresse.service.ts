import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Adresse } from '../data/Adresse';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {
 private generalUrl = '/api/adresse';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Adresse[]> {
    const url = `${this.generalUrl}/getAll`;
    return this.http.get<Adresse[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Adresse[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Adresse> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Adresse>(url)
     .pipe(
        map(adressen => adressen[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Adresse>(`getAdresse id=${id}`))
      );
  }
getAdresse(id: number): Observable<Adresse> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Adresse>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched Adresse id=${id}`)),
      catchError(this.errorService.handleError<Adresse>(`getAdresse id=${id}`))
    );
  }
//   searchAdressen(term: string): Observable<Adresse[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty Adresse array.
//      return of([]);
//    }
//    return this.http.get<Adresse[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found Adresse matching "${term}"`)),
//      catchError(this.errorService.handleError<Adresse[]>('searchAdressen', []))
//    );
//  }


  add(name: string): Observable<Adresse> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Adresse>(url)
    .pipe(
     tap((newAdresse: Adresse) => this.errorService.log(`added Adresse w/ id=${newAdresse.adressID}`)),
      catchError(this.errorService.handleError<Adresse>('add'))
    );
  }

  update(id: number, bez: string): Observable<Adresse> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Adresse>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated Adresse id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Adresse> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Adresse>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted Adresse id=${id}`)),
      catchError(this.errorService.handleError<Adresse>('deleteAdresse'))
    );
  }
}
