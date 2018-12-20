import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/UserService';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router,
              private user: UserService) {
    

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth.isLoggedIn){
      return true
    }
    return this.user.isLoggedIn().pipe(map(res => {
      if(res.status)  {
        this.auth.setLoggedIn(true)
        retrun true
      } else {
        this.router.navigate(['login'])
        return false
      }
    });
  }
}
