import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Product } from '@shared/model/product.model';
import { CommonModule } from '@angular/common';
import { ReversePipe } from '@shared/pipes/reverse.pipe';
import { TimeAgoPipe } from "@shared/pipes/time-ago.pipe";
import { RouterLinkWithHref } from '@angular/router';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    imports: [CommonModule, ReversePipe, TimeAgoPipe, RouterLinkWithHref]
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    console.log('click from child');
    this.addToCart.emit(this.product);
  }
}
