import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { UserCredentials } from '../_models/userCredentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: any = {};
  credentials: any;
  user: User | undefined;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.loggedUser$.subscribe({
      next: res => {if(res) this.user = res},
      error: err => console.log(err)
    })
  }

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.accountService.currentUserCredentials$.subscribe(res => this.credentials = res);
        console.log(this.credentials);
      },
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
  }

 
}
