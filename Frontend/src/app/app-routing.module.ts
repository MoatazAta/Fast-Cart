import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-area/login/login.component';
import { LogoutComponent } from './components/auth-area/logout/logout.component';
import { RegisterComponent } from './components/auth-area/register/register.component';
import { CartOrderComponent } from './components/cart-area/cart-order/cart-order.component';
import { HomeComponent } from './components/layout-area/home/home.component';
import { PageNotFoundComponent } from './components/layout-area/page-not-found/page-not-found.component';
import { AddProductComponent } from './components/products-area/add-product/add-product.component';
import { ProductListComponent } from './components/products-area/product-list/product-list.component';
import { UpdateProductComponent } from './components/products-area/update-product/update-product.component';
import { AuthGuard } from './services/auth.guard';
import { IncompleteGuard } from './services/incomplete.guard';

const routes: Routes = [
    { path: "home", component: HomeComponent },

    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "logout", canActivate: [AuthGuard], component: LogoutComponent },

    { path: "products", canActivate: [AuthGuard], component: ProductListComponent },
    { path: "products/new", canActivate: [AuthGuard], canDeactivate: [IncompleteGuard], component: AddProductComponent },
    { path: "products/update/:id", canActivate: [AuthGuard], component: UpdateProductComponent },
    { path: "order", canActivate: [AuthGuard], canDeactivate: [IncompleteGuard], component: CartOrderComponent },


    { path: "", redirectTo: "/home", pathMatch: "full" }, // pathMath: full = exact in React
    { path: "**", component: PageNotFoundComponent } // 404 - must be last!
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
