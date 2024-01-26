import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, filter, map, from, forkJoin } from 'rxjs';
import { AuthResponse } from './auth-response.model';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { AuthRequest } from './auth-request.model';
import { Storage } from '@ionic/storage-angular';
import { delayWhen, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/***/
/!!! REPLACE BELOW WITH YOUR API URL !!! */;
/***/
const API_URL = 'https://thenicheapp.onrender.com/';

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | null>;

  constructor(private http: HttpClient, private readonly storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      // Emit an undefined value on startup for now
      this.#auth$.next(auth);
    });
  }

  /**
   * @returns An Observable that will emit a boolean value
   * indicating whether the current user is authenticated.
   * This Observable will never complete and must be unsubscribed for when not needed.
   */
  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  /**
   * @returns An Observable that will emit the currently authenticated User object only if there
   * currently is an authenticated user.
   */
  getUser$(): Observable<User | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.userInfos));
  }

  /**
   * @returns An Observable that will emit the currently authenticated user's token, only if there
   * currently is an authenticated user.
   */

  #saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }

  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  /**
   * Sends an authentication request to the backend API in order to log in a user with the
   * provided authRequest object.
   *
   * @param authRequest An object containing the authentication request params
   * @returns An Observable that will emit the logged in User object on success.
   */
  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${environment.apiUrl}/auth/login`;

    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      delayWhen((auth) => this.#saveAuth$(auth)),
      map((auth) => {
        this.#auth$.next(auth);
        //console.log(User ${auth.user.username} logged in);
        return auth.userInfos;
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logOut() {
    this.#auth$.next(null);
    // Remove the stored authentication from storage when logging out.
    this.storage.remove('auth');
    console.log('User logged out');
  }

  // UPDATEPROFIL
  //////////////////////////////////////////
  updateProfil$(authRequest: AuthRequest, userid: string): Observable<User> {
    const authUrl = `${environment.apiUrl}/utilisateurs/${authRequest.id}`;
    return forkJoin([
      this.#auth$.pipe(first()),
      this.http.put<User>(authUrl, authRequest),
    ]).pipe(
      map(([auth, updatedUser]) => {
        if (auth) {
          auth.userInfos = updatedUser;
          this.#saveAuth$(auth);
          this.#auth$.next(auth);
        }
        return updatedUser;
      })
    );
  }

  deleteProfile$(authRequest: AuthRequest, headers: any): Observable<User> {
    // console.log('authRequest OK : ', authRequest);
    // console.log('authRequest.id OK : ', authRequest.id);

    const authUrl = `${environment.apiUrl}/utilisateurs/${authRequest.id}`;
    const options = { headers };
    return this.http.delete<AuthResponse>(authUrl, options).pipe(
      delayWhen((auth) => this.#saveAuth$(auth)),
      map((auth) => {
        this.#auth$.next(auth);
        console.log('User deleted');
        return auth.userInfos;
      })
    );
  }
}
