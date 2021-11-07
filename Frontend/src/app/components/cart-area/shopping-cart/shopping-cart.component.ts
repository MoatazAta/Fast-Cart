import { Component, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { ItemModel } from 'src/app/models/item.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

    public cart: CartModel;
    public user: UserModel;
    public cartItems: ItemModel[] = [];
    public cartTotalPrice = 0;

    constructor(private notify: NotifyService, private myCartService: CartService) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.cart = await this.myCartService.getOpenCartByUserIdAsync(this.user._id);
            this.cartItems = await this.myCartService.getItemsByCartIdAsync(this.cart._id);
            store.subscribe(() => {
                this.cartTotalPrice = this.cartItems?.reduce((sum, item) => sum + item.totalPrice, 0);
                this.cartItems = store.getState().itemsState.items;
            });
        
        } catch (err: any) {
            this.notify.error(err.message);
        }
    }
}
