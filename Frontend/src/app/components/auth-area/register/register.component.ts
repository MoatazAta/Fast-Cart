import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { IncompleteGuard } from 'src/app/services/incomplete.guard';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    private user = new UserModel();

    constructor(private myAuthService: AuthService, private myRouter: Router, private notify: NotifyService) { }

    //Controls
    public idControl = new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[0-9]).{9}$")]);
    public emailControl = new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
    public passwordControl = new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[0-9]).{6,}$")]); 
    public confirmPasswordControl = new FormControl(null, [Validators.required]);
    public cityControl = new FormControl(null, [Validators.required]);
    public streetControl = new FormControl(null, [Validators.required]);
    public firstNameControl = new FormControl(null, [Validators.required]);
    public lastNameControl = new FormControl(null, [Validators.required]);


    public productForm = new FormGroup({
        idControl: this.idControl,
        emailControl: this.emailControl,
        passwordControl: this.passwordControl,
        confirmPasswordControl: this.confirmPasswordControl,
        cityControl: this.cityControl,
        streetControl: this.streetControl,
        firstNameControl: this.firstNameControl,
        lastNameControl: this.lastNameControl
    });

    public changeOccurred() {
        IncompleteGuard.canLeave = false;
    }

    public async register() {
        try {
            this.user._id = this.idControl.value;
            this.user.email = this.emailControl.value;
            this.user.password = this.passwordControl.value;
            this.user.city = this.cityControl.value;
            this.user.street = this.streetControl.value;
            this.user.firstName = this.firstNameControl.value;
            this.user.lastName = this.lastNameControl.value;
            if (this.passwordControl.value !== this.confirmPasswordControl.value) {
                document.getElementById("alert").innerText = "passwords are not machs";
            }
            else { 
                await this.myAuthService.register(this.user);
                IncompleteGuard.canLeave = true;
                this.notify.success("You are registered");
                this.myRouter.navigateByUrl("/login");
            }
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

}
