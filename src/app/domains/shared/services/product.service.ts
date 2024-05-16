import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  constructor() {}

  getProducts() {
    return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products');
  }

  getProductById(id: string) {
    return this.http.get<Product>(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
  }
}
