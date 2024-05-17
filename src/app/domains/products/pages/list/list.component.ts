import { Component, Input, SimpleChanges, inject, signal } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { Category, Product } from '@shared/model/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ProductComponent,
    HeaderComponent,
    RouterLinkWithHref
],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  @Input() category_id?: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    try {
      this.productService.getProducts(this.category_id).subscribe({
        next: (productsList) => {
          this.products.set(productsList);
        },
        error: (error) => {
          console.log('Error:' + error);
        },
      });
    } catch (error) {
      console.log('getProducts error: ' + error);
    }
  }

  private getCategories() {
    try {
      this.categoryService.getAllCategories().subscribe({
        next: (categories) => {
          this.categories.set(categories);
        },
        error: (error) => {
          console.log('Error:' + error);
        },
      });
    } catch (error) {
      console.log('getCategories error: ' + error);
    }
  }
}
