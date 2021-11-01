import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartModel } from 'src/app/models/cart.model';
import { CategoryModel } from 'src/app/models/category.model';
import { ItemModel } from 'src/app/models/item.model';
import { ProductModel } from 'src/app/models/product.model';
import { UserModel } from 'src/app/models/user.model';
import store from 'src/app/redux/store';
import { CartService } from 'src/app/services/cart.service';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

    public products: ProductModel[];
    public categories: CategoryModel[];
    public selectedCategory: string;
    public user: UserModel;
    public cart: CartModel;
    public items: ItemModel[];

    constructor(private myProductsService: ProductsService, private myRouter: Router, private notify: NotifyService, private myCartService: CartService) { }

    async ngOnInit() {
        try {
            this.user = store.getState().authState.user;
            this.categories = await this.myProductsService.getAllCategoriesAsync();
            //Resume Shopping.
            this.cart = await this.myCartService.getOpenCartByUserIdAsync(this.user._id);
            this.items = await this.myCartService.getItemsByCartIdAsync(this.cart._id);
        }

        catch (err: any) {
            if (err.message === "Your login session has expired.") {
                this.myRouter.navigateByUrl("/login");
            }
            this.notify.error(err.message);
        }
    }

    public async showProducts(args: Event) {
        try {
            const categoryId = (args.target as HTMLSelectElement).value;
            this.products = await this.myProductsService.getProductsByCategoryAsync(categoryId);
        } catch (err: any) {
            this.notify.error(err.message);
        }
    }

}
