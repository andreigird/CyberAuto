import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CyberAuto';
  
  user: User | undefined;
  loggedIn: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.setCurrentUser();
    this.getCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    this.user = JSON.parse(userString);
    if (!this.user) return;
    this.accountService.setUser(this.user);
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: user => this.loggedIn = !!user,
      error: error => console.log(error)
    })
  }
}
