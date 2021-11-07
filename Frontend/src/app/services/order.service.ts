import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OrderModel } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {


    constructor(private http: HttpClient) { }

    public async getAllOrdersAsync(): Promise<OrderModel[]> {
        return await this.http.get<OrderModel[]>(environment.ordersUrl).toPromise();
    }
    public async getLatestOrderAsync(_id: string): Promise<OrderModel> {
        return await this.http.get<OrderModel>(environment.ordersUrl + _id).toPromise();
    }
    public async addOrderAsync(order: OrderModel): Promise<OrderModel> {
        return await this.http.post<OrderModel>(environment.ordersUrl, order).toPromise();
    }
}