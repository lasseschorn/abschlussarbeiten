import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route} from '@angular/router';
import { UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {map } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(  private authService: AuthService,
    private router: Router,
    private userService: UserService ) {
}
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
