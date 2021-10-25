import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    public products: ProductModel[];
    constructor(private myProductsService: ProductsService,private notify: NotifyService) { }

   async ngOnInit() {
        try {
            this.products = await this.myProductsService.getAllProductsAsync();
        }
        catch (err: any) {
            this.notify.error(err.message);
        }
    }

}
