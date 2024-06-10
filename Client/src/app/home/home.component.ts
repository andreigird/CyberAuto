import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  users: any;

  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get("https://localhost:5001/api/users/").subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log("Request completed")
    })
  }
}
