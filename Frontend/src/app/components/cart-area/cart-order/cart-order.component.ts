import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { ItemModel } from 'src/app/models/item.model';
import { OrderModel } from 'src/app/models/order.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart-order',
    templateUrl: './cart-order.component.html',
    styleUrls: ['./cart-order.component.css']
})
export class CartOrderComponent implements OnInit {

    public order = new OrderModel;
    public today = new Date().toISOString().split('T')[0];
    public items: ItemModel[] = [];
    public cart: CartModel;
    public user: UserModel;
    public imageAddress: string;
    public orderPrice = 0;
    constructor(private notify: NotifyService, private myCartService: CartService, private myOrderService: OrderService, private myRouter: Router) { }
    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.cart = await this.myCartService.getOpenCartByUserIdAsync(this.user._id);
            this.items = await this.myCartService.getItemsByCartIdAsync(this.cart._id);
            this.orderPrice = this.items?.reduce((sum, item) => sum + item.totalPrice, 0);
            this.imageAddress = environment.productImagesUrl;

        } catch (err) {
            this.notify.error(err);
        }
    }

    public async addOrder() {
        try {
            this.order.cartId = this.cart._id;
            this.order.userId = this.user._id;
            this.order = await this.myOrderService.addOrderAsync(this.order);
            await this.myCartService.cartIsPaid(this.cart);
            this.notify.success("your order paid successfully");
            this.myRouter.navigateByUrl("/home");
        } catch (err: any) {
            this.notify.error(err);
        }
    }

    public Checkout(){
    }

    public async deleteItem(_id:string) {
        try {
            await this.myCartService.deleteItemAsync(_id);
        } catch (err: any) {
            this.notify.error(err);
        }
    }

    public searchProducts(event: Event) {
        const searchWord = (event.target as HTMLInputElement).value.toLowerCase();
        this.items = store.getState().itemsState.items.filter(i => i.product.name.toLowerCase().includes(searchWord));
    }
}
