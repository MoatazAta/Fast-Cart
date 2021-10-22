import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    template: ""
})
export class LogoutComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }

    ngOnInit(): void {
        this.authService.logout();
        this.notify.success("You are logged-out");
        this.router.navigateByUrl("/home");
    }

}
