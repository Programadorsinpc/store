import { Component, Input, inject, signal } from '@angular/core';
import { Product } from '@shared/model/product.model';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  @Input() id?: string;
  product = signal<Product | null>(null);
  private productService = inject(ProductService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.id) {
      this.productService.getProductById(this.id).subscribe({
        next: (product) => {
          console.log(product);
          this.product.set(product);
        },
      });
    }
  }
}
