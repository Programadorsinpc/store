import { Component, SimpleChanges, inject, signal } from '@angular/core';
import { Product } from '@shared/model/product.model';
import { CartProductComponent } from '@shared/components/cart-product/cart-product.component';
import { CartService } from '@shared/services/cart.service';

import { RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CartProductComponent, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  hidenSideMenu = signal(true);
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  total = this.cartService.total;

  //@Output() removeFromCart = new EventEmitter();

  toggleSideMenu() {
    this.hidenSideMenu.update((prevState) => !prevState);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    const cart = changes['cart'];
    // if (cart) {
    //   this.total.set(this.calcTotal());
    // }
  }

  // calcTotal(): number {
  //   return this.cart.reduce((total, product) => total + product.price, 0);
  // }

  removeFromCard(index: number) {}
}
