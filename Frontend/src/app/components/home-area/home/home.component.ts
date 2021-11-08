import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { OrderModel } from 'src/app/models/order.model';
import { ProductModel } from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductsService } from 'src/app/services/products.service';
import { Unsubscribe } from 'redux';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public products: ProductModel[] = [];
    public user: UserModel = store.getState().authState.user;
    public cart: CartModel;
    public latestOrder: OrderModel;
    public orders: OrderModel[] = [];
 
    private unsubscribeMe: Unsubscribe;

    constructor(private myProductsService: ProductsService, private myCartService: CartService,
        private myOrderService: OrderService, private notify: NotifyService, private myRouter: Router) { }

    async ngOnInit(): Promise<void> {
        try {
            this.unsubscribeMe = store.subscribe(async () => {
                this.user = store.getState().authState.user;
                if (this.user?.isAdmin) {
                    this.myRouter.navigateByUrl("/products");
                    return;
                }
                if (this.user) {
                    this.cart = await this.myCartService.getOpenCartByUserIdAsync(this.user._id);
                    this.latestOrder = await this.myOrderService.getLatestOrderAsync(this.user._id);
                }
            });
            this.orders = await this.myOrderService.getAllOrdersAsync();
            this.products = await this.myProductsService.getAllProductsAsync();
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

    public async addCart() {
        const cartToAdd = new CartModel;
        cartToAdd.userId = this.user._id;
        this.cart = await this.myCartService.addCartAsync(cartToAdd);
        this.myRouter.navigateByUrl("/products");
        console.log(this.cart);
    }
    public handleResumeShopping() {
        this.myRouter.navigateByUrl("/products");
    }
    ngOnDestroy(): void {
        this.unsubscribeMe();
    }

}
