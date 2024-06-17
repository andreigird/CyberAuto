import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { UserCredentials } from './_models/userCredentials';
import { User } from './_models/user';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CyberAuto';
  
  userCredentials: UserCredentials | undefined;
  user: User | undefined;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.setCurrentUser();
    this.setCurrentUserDetails();
    this.getCurrentUserDetails();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    this.userCredentials = JSON.parse(userString);
    if (!this.userCredentials) return;
    this.accountService.setUser(this.userCredentials);
  }

  setCurrentUserDetails() {   
    const username: string | undefined = this.userCredentials?.username;
    if (!username) return;

    this.accountService.getLoggedUser(username);    
  }

  getCurrentUserDetails() {
    this.accountService.loggedUser$
      .subscribe({
        next: user => { console.log("We have user? " + user?.firstName); if (user) this.user = user; },
        error: error => { console.log(error); }
      })
    console.log("The user taken from observable is: " + this.user);
  }

}
