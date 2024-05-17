import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { Product } from '@shared/model/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() id?: string;

  product = signal<Product | null>(null);
  cover = signal<String>('');

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.id) {
      this.productService.getProductById(this.id).subscribe({
        next: (product) => {
          console.log(product);
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        },
        error: (error) => {
          console.log('Error: ' + error);
        },
      });
    }
  }

  changeCover(newImage: string) {
    this.cover.set(newImage);
  }

  addToCartFromDetail() {
    const product = this.product();
    if (product) {
      console.log('Product added');
      this.cartService.addToCart(product);
    }
  }
}
