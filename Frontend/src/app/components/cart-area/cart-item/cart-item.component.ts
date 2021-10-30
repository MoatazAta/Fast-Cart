import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
    @Input()
    public cartItem: ItemModel;
    constructor() { }

    ngOnInit(): void {
    }

}
