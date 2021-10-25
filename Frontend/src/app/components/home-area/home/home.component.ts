import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public products: ProductModel[];
    constructor(private myProductsService: ProductsService, private notify: NotifyService) { }

    async ngOnInit(): Promise<void> {
        try {
            this.products = await this.myProductsService.getAllProductsAsync();
        }
        catch (err: any) {
            this.notify.error(err);
        }
    }

}
