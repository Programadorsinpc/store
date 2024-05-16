import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class CartProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() removeFromCart = new EventEmitter();

  removeFromCartHandler() {
    console.log('item removed');
    this.removeFromCart.emit(this.product);
  }
}
