import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, pipe, take } from 'rxjs';
import { User } from '../_models/user';
import { UserCredentials } from '../_models/userCredentials';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  private currentUserCredentials = new BehaviorSubject<UserCredentials | null>(null);
  currentUserCredentials$ = this.currentUserCredentials.asObservable();

  private loggedUser = new BehaviorSubject<User | null>(null);
  loggedUser$ = this.loggedUser.asObservable();

  user: any;


  constructor(private http: HttpClient) {
  }


  login(model: any) {
    const url = 'account/login';
    return this.http.post<UserCredentials>(this.baseUrl + url, model).pipe(
      map((response: UserCredentials) => {
        const userCredentials = response;
        if (userCredentials) {
          localStorage.setItem('user', JSON.stringify(userCredentials));
          this.currentUserCredentials.next(userCredentials);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserCredentials.next(null);
  }

  getLoggedUser(username: string) {
    const url = 'account/getUserDetails/?username=';
    const httpOptions = this.getHttpOptions();
    const userString = localStorage.getItem('user');
    if (!userString) return;

    return this.http.get<User>(this.baseUrl + url + username, httpOptions).subscribe(
      {
        next: res => { console.log(res); this.loggedUser.next(res); },
        error: err => console.log(err)
      });
  }


  setUser(userCredentials: UserCredentials) {
    this.currentUserCredentials.next(userCredentials);
  }

  getHttpOptions() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token
      })
    }
  }
}
