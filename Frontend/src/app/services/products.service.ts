import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/category.model';
import { ProductModel } from '../models/product.model';
import { ProductsActionType } from '../redux/products-state';
import store from '../redux/store';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
 
    constructor(private http: HttpClient) { }

    public async getAllProductsAsync(): Promise<ProductModel[]> {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch({ type: ProductsActionType.ProductsDownloaded, payload: products });
        }
        return store.getState().productsState.products;
    }

    public async getOneProductAsync(id: string): Promise<ProductModel> {
        if (store.getState().productsState.products.length === 0) {
            const products = await this.http.get<ProductModel[]>(environment.productsUrl).toPromise();
            store.dispatch({ type: ProductsActionType.ProductsDownloaded, payload: products });
        }
        return store.getState().productsState.products.find(p => p._id === id);
    }

    public async getAllCategoriesAsync(): Promise<CategoryModel[]> {
        return await this.http.get<CategoryModel[]>(environment.categoriesUrl).toPromise();
    }

    public async getProductsByCategoryAsync(categoryId: string): Promise<ProductModel[]> {
        const products = await this.http.get<ProductModel[]>(environment.productsUrl + "products-per-category/" + categoryId).toPromise();
        return products;
    }

    public async addProductAsync(product: ProductModel): Promise<ProductModel> {

        const myFormData = new FormData();
        myFormData.append("categoryId", product.categoryId);
        myFormData.append("name", product.name);
        myFormData.append("price", product.price.toString());
        myFormData.append("image", product.image.item(0));

        const addedProduct = await this.http.post<ProductModel>(environment.productsUrl, myFormData).toPromise();
        store.dispatch({ type: ProductsActionType.ProductAdded, payload: addedProduct });
        return addedProduct;
    }

    public async updateProductAsync(product: ProductModel): Promise<ProductModel>{
        const myFormData = new FormData();
        myFormData.append("categoryId", product.categoryId);
        myFormData.append("name", product.name);
        myFormData.append("price", product.price.toString());
        if(product.image) myFormData.append("image", product.image.item(0));

        const updatedProduct = await this.http.patch<ProductModel>(environment.productsUrl + product._id, myFormData).toPromise();
        store.dispatch({ type: ProductsActionType.ProductUpdated, payload: updatedProduct });
        return updatedProduct;

    }
}
