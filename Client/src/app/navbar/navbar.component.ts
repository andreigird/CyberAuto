import { Component } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavbarComponent {
  loggedIn: boolean = false;
  user: User | undefined;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: user => { this.loggedIn = !!user; if (!user) return; this.user = user },
      error: error => console.log(error)
    })
  }

  logout() {
    this.accountService.logout();
  }
}
