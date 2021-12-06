import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ItemModel } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
}) 
export class CartItemComponent {
    @Input()
    public cartItem: ItemModel;
    constructor(private notify: NotifyService, private myCartService: CartService, private myRouter: Router) { }


    public async deleteItem(_id:string) {
        try {
            await this.myCartService.deleteItemAsync(_id);
        } catch (err: any) {
            if(err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout"); 
                return;
            }
            this.notify.error(err);
        }
    }
}
