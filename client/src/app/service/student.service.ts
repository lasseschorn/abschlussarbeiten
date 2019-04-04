import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student } from '../data/Student';
import {map, tap, catchError} from 'rxjs/operators';
import {ErrorhandlingService} from '../service/errorhandling.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
 private generalUrl = '/api/student';

  constructor(  private http: HttpClient,
                private errorService: ErrorhandlingService) { }


  getAll(): Observable<Student[]> {
    const url = `${this.generalUrl}/getall`;
    return this.http.get<Student[]>(url)
    .pipe(
      catchError(this.errorService.handleError<Student[]>('getAll', []))
    );
}

  getNo404(id: number): Observable<Student> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Student>(url)
     .pipe(
        map(studenten => studenten[0]), // returns a {0|1} element array
        tap(_ => this.errorService.log(`fetched or did not find id=${id}`)),
        catchError(this.errorService.handleError<Student>(`getStudent id=${id}`))
      );
  }
getStudent(id: number): Observable<Student> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Student>(url)
    .pipe(
      tap(_ => this.errorService.log(`fetched Student id=${id}`)),
      catchError(this.errorService.handleError<Student>(`getStudent id=${id}`))
    );
  }
//   searchStudent(term: string): Observable<Student[]> {
//       const url = `${this.generalUrl}/search`;
//    if (!term.trim()) {
//      // if not search term, return empty Student array.
//      return of([]);
//    }
//    return this.http.get<Student[]>(`${url}/?name=${term}`).pipe(
//     tap(_ => this.log(`found Student matching "${term}"`)),
//      catchError(this.errorService.handleError<Student[]>('searchStudent', []))
//    );
//  }


  add(name: string): Observable<Student> {
      const url = `${this.generalUrl}/add?bez=${name}`;
      return this.http.get<Student>(url)
    .pipe(
     tap((newStudent: Student) => this.errorService.log(`added Student w/ id=${newStudent.personenID}`)),
      catchError(this.errorService.handleError<Student>('add'))
    );
  }

  update(id: number, bez: string): Observable<Student> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Student>(url)
    .pipe(
      tap(_ => this.errorService.log(`updated Student id=${id}`)),
      catchError(this.errorService.handleError<any>('update'))
    );
  }

  delete(id: number): Observable<Student> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Student>(url)
  .pipe(
      tap(_ => this.errorService.log(`deleted branche id=${id}`)),
      catchError(this.errorService.handleError<Student>('deleteStudent'))
    );
  }
}
