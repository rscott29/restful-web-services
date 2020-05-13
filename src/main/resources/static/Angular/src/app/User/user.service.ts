import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from "./User";
import {MessageService} from "../message/message.service";
import {catchError} from "rxjs/operators";

@Injectable()
export class UserService {
  private _users = new BehaviorSubject<User[]>([]);
  readonly users = this._users.asObservable();
  private baseUrl = 'http://localhost:5000';
  private dataStore: { users: User[] } = {users: []};

  constructor(private http: HttpClient, private messageService: MessageService) {}

  loadAll() {
    return this.http.get<User[]>(`${this.baseUrl}/users`).subscribe(data => {
      this.dataStore.users = data;
      this._users.next(Object.assign({}, this.dataStore).users);
   //   this.log(`loaded all users`)
    }, catchError(this.handleError<User[]>('loadAllUsers', [])))
  }

  load(id: number | string) {
   this.http.get<User>(`${this.baseUrl}/users/${id}`).subscribe(data => {
      let notFound = true;

      this.dataStore.users.forEach((item, index) => {
        if (item.id === data.id) {
          this.dataStore.users[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.users.push(data);
      }

      this._users.next(Object.assign({}, this.dataStore).users);
    }, catchError(this.handleError<User[]>('loadUser', [])))
  }

  create(user: User) {
    this.http.post<User>(`${this.baseUrl}/users`, user).subscribe(newUser => {
        this.dataStore.users.push(newUser);
        this._users.next(Object.assign({}, this.dataStore).users);
        this.log(`added user with id: ${newUser.id}`)
      },
      catchError(this.handleError<User[]>('createUser', [])))
  }

  update(user: User) {
    this.http.put<User>(`${this.baseUrl}/users/${user.id}`, (user)).subscribe(data => {
      this.dataStore.users.forEach((t, i) => {
        if (t.id === data.id) {
          this.dataStore.users[i] = data;
        }
      });

      this._users.next(Object.assign({}, this.dataStore).users);
      this.log(`successfully updated ${data.name}`)
    }, catchError(this.handleError<User[]>('updateUser', [])))
  }

  remove(userId: number) {
    this.http.delete(`${this.baseUrl}/users/${userId}`).subscribe(() => {
      this.dataStore.users.forEach((t, i) => {
        if (t.id === userId) {
          this.dataStore.users.splice(i, 1);
        }
      });
      this._users.next(Object.assign({}, this.dataStore).users);
    }, catchError(this.handleError<User[]>('removeUser', [])))
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.sendMessage(message);
  }
}
