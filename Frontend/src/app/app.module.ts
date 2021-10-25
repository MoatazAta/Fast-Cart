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
import { HeaderComponent } from './components/layout-area/header/header.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { ShoppingCartComponent } from './components/cart-area/shopping-cart/shopping-cart.component';
import { CartItemComponent } from './components/cart-area/cart-item/cart-item.component';



@NgModule({
    declarations: [
        LayoutComponent,
        HomeComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        AuthMenuComponent,
        HeaderComponent,
        AddProductComponent,
        ProductListComponent,
        ProductCardComponent,
        UpdateProductComponent,
        ShoppingCartComponent,
        CartItemComponent,


    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatToolbarModule
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
