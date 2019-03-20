import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Branche } from '../Branche';

@Injectable({
  providedIn: 'root'
})
export class BrancheService {
  private generalUrl = '/api/branche';

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Branche> {
    const url = `${this.generalUrl}/getbyid?bID=${id}`;
    return this.http.get<Branche>(url);
  }
   getAll( ): Observable<Branche[]> {
    const url = `${this.generalUrl}/getAll`;
    return this.http.get<Branche[]>(url);
}
  add(bez: string): Observable<Branche> {
    const url = `${this.generalUrl}/add?bez=${bez}`;
    return this.http.get<Branche>(url);
  }
  update(id: number, bez: string): Observable<Branche> {
    const url = `${this.generalUrl}/update?bID=${id}&bez=${bez}`;
    return this.http.get<Branche>(url);
  }
  delete(id: number): Observable<Branche> {
  const url = `${this.generalUrl}/delete/?id=${id}`;
  return this.http.get<Branche>(url);
  }

}
