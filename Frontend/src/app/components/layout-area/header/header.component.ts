import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { Unsubscribe } from 'redux';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

 public user: UserModel;
    public unsubscribeMe: Unsubscribe;

    ngOnInit(): void {
        store.subscribe(() => {
            this.user = store.getState().authState.user;
        });
    }

    ngOnDestroy(): void {
        this.unsubscribeMe();
    }
} 
