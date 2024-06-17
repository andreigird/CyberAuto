import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { map, pipe, take } from 'rxjs';
import { UserCredentials } from '../_models/userCredentials';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavbarComponent {
  loggedIn: boolean = false;
  userCredentials: UserCredentials | undefined;
  user: User | null = null;

  isCollapsed = false;

  constructor(private accountService: AccountService) {
    this.accountService.loggedUser$.pipe(take(1)).subscribe({
      next: user => this.user = user
    })
  }
  //ngOnInit() {
  //  this.getCurrentUser();
  //}
  //getCurrentUser() {
  //  if (!this.user) return;
  //  this.accountService.getCurrentUser(this.user.username).subscribe({
  //    next: user => this.user = user 
  //  })
  //}

  logout() {
    this.accountService.logout();
  }
}
