import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthMenuComponent } from './components/auth-area/auth-menu/auth-menu.component';
import { HeaderComponent } from './components/layout-area/header/header.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { ProductCardComponent } from './components/products-area/product-card/product-card.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { ShoppingCartComponent } from './components/cart-area/shopping-cart/shopping-cart.component';
import { CartItemComponent } from './components/cart-area/cart-item/cart-item.component';
import { FooterComponent } from './components/layout-area/footer/footer.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CartOrderComponent } from './components/cart-area/cart-order/cart-order.component';



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
        FooterComponent,
        CartOrderComponent,


    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MDBBootstrapModule.forRoot(),
        Ng2SearchPipeModule


    ],

    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }],

    bootstrap: [LayoutComponent]
})
export class AppModule { }
