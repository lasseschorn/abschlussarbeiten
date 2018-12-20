import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Student } from '../AkaGrad';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/of';

@Injectable()
export class StudentService {
//  private url = '/verwaltung/bezeichner';

  constructor(private http: HttpClient) { }

  getAkaGrad(student: Observable<Student>): Observable<Student> {
    return student;
  }
  createAkaGrad(student: Observable<Student>): Observable<Student> {
   return student;
 //   .retry(3)
 //  .catch(err => {
 //    console.log(err)
  }
    updateAkaGrad(student: Observable<Student>): Observable<Student> {
    return student;
  }
  deleteAkaGrad(student: Observable<Student>): Observable<Student> {
  return student;
  }
 getAllAkaGrad( ): Observable<Student[]> {
   return new Observable<Student[]>();
}
}
