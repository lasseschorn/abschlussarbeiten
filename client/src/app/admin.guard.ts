import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    {{debugger}}
      if(this.auth.isLoggedIn) {
        return true
      }
      return this.user.isLoggedIn().pipe(map(res => {
        if(res.status) {
          this.auth.setLoggedIn(true)
          return true
        } else {
          this.router.navigate(['login'])
          return false
        }
      }))
  }

}
