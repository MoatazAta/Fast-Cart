import { Component, Input, OnInit } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
    @Input()
    public product: ProductModel;

    @Input()
    public user: UserModel;

    @Input()
    public cart: CartModel;

    @Input()
    public cartItems: ItemModel[] = [];

    public imageAddress: string;
    public item = new ItemModel;
    public addedToCart: Boolean = false;
    public qty: number = 1;
    constructor(private myCartService: CartService, private notify: NotifyService) {

    }
    async ngOnInit() {
        try {
            if (this.cartItems) {
                this.cartItems.forEach(item => {
                    if (JSON.stringify(item.product) === JSON.stringify(this.product)) {
                        this.addedToCart = true;
                        this.item = item;
                    }

                });
            }
            this.imageAddress = environment.productImagesUrl + this.product.imageName;

        } catch (err: any) {
            this.notify.error(err.message);
        }

    }

    public async handleAddToCart() {
        this.item.product = this.product;
        this.item.quantity = 1;
        this.item.totalPrice = this.item.product.price * this.item.quantity;
        this.item.cartId = this.cart._id;
        this.item.productId = this.product._id;
        this.addedToCart = true;
        this.item = await this.myCartService.addItemToCartAsync(this.item);
    }

    public async handlePlus() {
        this.item.quantity = this.item.quantity + 1;
        this.item.totalPrice = this.product.price * this.item.quantity;
        await this.myCartService.updateItemAsync(this.item);
    }

    public async handleMinus() {
        this.item.quantity = this.item.quantity - 1;
        if (this.item.quantity === 0) {
            this.addedToCart = false;
            await this.myCartService.deleteItemAsync(this.item._id);
            return;
        }
        this.item.totalPrice = this.item.product.price * this.item.quantity;
        await this.myCartService.updateItemAsync(this.item);
    }


}
