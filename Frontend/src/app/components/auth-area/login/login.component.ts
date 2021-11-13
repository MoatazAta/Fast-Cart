import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public credentials = new CredentialsModel();

    constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }

    public async login() {
        try { 
            await this.authService.login(this.credentials);
            this.notify.success("You are logged-in");
            this.router.navigateByUrl("/home");
        }
        catch(err: any) {
            this.notify.error(err);
        } 
    }
}
