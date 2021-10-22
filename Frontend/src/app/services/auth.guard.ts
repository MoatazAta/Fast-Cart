import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import store from '../redux/store';
import { NotifyService } from './notify.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,private notify: NotifyService) {

    }
    canActivate(): boolean {
        if (store.getState().authState.user) return true;
        this.notify.success("You are not logged-in!");
        this.router.navigateByUrl("/login");
        return false;
    }

}
