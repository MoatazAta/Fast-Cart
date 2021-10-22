import { CredentialsModel } from './../models/credentials.model';
import { UserModel } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import store from '../redux/store';
import { userLoggedInAction, userLoggedOutAction, userRegisteredAction } from '../redux/auth-state';

// ng g s services/auth

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    public async register(user: UserModel): Promise<void> {
        const addedUser = await this.http.post<UserModel>(environment.registerUrl, user).toPromise();
        store.dispatch(userRegisteredAction(addedUser));
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        const loggedInUser = await this.http.post<UserModel>(environment.loginUrl, credentials).toPromise();
        store.dispatch(userLoggedInAction(loggedInUser));
    }

    public logout(): void {
        store.dispatch(userLoggedOutAction());
    }

}
