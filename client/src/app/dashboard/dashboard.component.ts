import { Component, OnInit } from '@angular/core';
import {UserService } from './services/UserService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  quote = "Loading your personal quote"
  email = "Getting ypur email..."

  constructor(private user: UserService) { }

  ngOnInit() {
        this.user.getData().subscribe(data => {
          if(data.status){}
      this.quote = data.quote
      this.email = data.email
        } else {
          this.router.navigate(['logout'])
        }
    })

  }
   
   updateQuote(event){
     const value = event.target.parentNode.querySelector('#myQuote').value
     this.user.updateQuote(value).subscribe(data => {
       if(data.success) {
         alert("Your quote was updated")
       } else {
         allert("Some problem")
       }
     })
   }

  }

}
