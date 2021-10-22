import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HomeComponent } from './components/home-area/home/home.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';

@NgModule({
    declarations: [
        LayoutComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        AuthMenuComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    exports: [],
    // providers: [CalcService], // Create CalcService object for the entire app.

    // Register the interceptor so any request will invoke it:
    providers: [{
        provide: HTTP_INTERCEPTORS, // Register the interceptor
        useClass: AuthInterceptor, // Our interceptor class
        multi: true // Can register it several times if needed
    }],

    bootstrap: [LayoutComponent]
})
export class AppModule { }
