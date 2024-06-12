import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  user: any;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(res => this.user = res);
    console.log(this.user);

  }

  login() {
    console.log(this.model);
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
        this.accountService.currentUser$.subscribe(res => this.user = res);
        console.log(this.user);
      },
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
  }

 
}
