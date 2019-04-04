import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
ausgeloggt: boolean;
  constructor(private userService: UserService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.userService.logout().subscribe(data => {
      if ( data.sussess ) {
        this.ausgeloggt = data.sussess;
        this.router.navigate(['']);
        this.authService.setLoggedIn(false);
      } else {
        window.alert('Some problem');
      }
    });
  }

}
