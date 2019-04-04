import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Kategorie } from '../data/Kategorie';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class KategorieService {

 private generalUrl = '/api/kategorie';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Kategorie[]> {
    const url = `${this.generalUrl}/getall`;
    return this.http.get<Kategorie[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Kategorie[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Kategorie> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Kategorie>(url)
     .pipe(
        map(branchen => branchen[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Kategorie>(`getBranche id=${id}`))
      );
  }
getKategorie(id: number): Observable<Kategorie> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Kategorie>(url)
    .pipe(
        tap(_ => this.errorService.log(`fetched Kategorie id=${id}`)),
        catchError(this.errorService.handleError<Kategorie>(`getKategorie id=${id}`))
        );
  }
//   searchKategorie(term: string): Observable<Kategorie[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty Kategorie array.
//      return of([]);
//    }
//    return this.http.get<Kategorie[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found Kategorie matching "${term}"`)),
//      catchError(this.errorService.handleError<Kategorie[]>('searchKategorie', []))
//    );
//  }


  add(name: string): Observable<Kategorie> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Kategorie>(url)
    .pipe(
     tap((newKategorie: Kategorie) => this.errorService.log(`added Kategorie w/ id=${newKategorie.kategorieID}`)),
      catchError(this.errorService.handleError<Kategorie>('add'))
    );
  }

  update(id: number, bez: string): Observable<Kategorie> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Kategorie>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated Kategorie id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Kategorie> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Kategorie>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted Kategorie id=${id}`)),
      catchError(this.errorService.handleError<Kategorie>('deleteKategorie'))
    );
  }
}
