import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
    @Input()
    public cartItem: ItemModel;
    constructor(private notify: NotifyService, private myCartService: CartService) { }

    ngOnInit(): void {
    }

    public async deleteItem(_id:string) {
        try {
            await this.myCartService.deleteItemAsync(_id);
        } catch (err: any) {
            this.notify.error(err);
        }
    }
}
