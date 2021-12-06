import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { NotifyService } from 'src/app/services/notify.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

    public product = new ProductModel(); 

    public categories: CategoryModel[];
    constructor(private myActivatedRoute: ActivatedRoute, private myProductsService: ProductsService, private myRouter: Router, private notify: NotifyService) { }

    public setImage(args: Event): void {
        this.product.image = (args.target as HTMLInputElement).files;
    }

    async ngOnInit() {
        try {
            this.product._id = this.myActivatedRoute.snapshot.params.id;
            this.product = await this.myProductsService.getOneProductAsync(this.product._id);
            this.categories = await this.myProductsService.getAllCategoriesAsync();
        }
        catch (err: any) {
            if (err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err.message);
        } 
    } 

    public async update() {
        try {
            await this.myProductsService.updateProductAsync(this.product);
            this.notify.success("Product updated");
            this.myRouter.navigateByUrl("/products");
        }
        catch (err: any) {
            if (err.status === 403 || err.status === 401) {
                this.myRouter.navigateByUrl("/logout");
                return;
            }
            this.notify.error(err);
        }
    }

}
