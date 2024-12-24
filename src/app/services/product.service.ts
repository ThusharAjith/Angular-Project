import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Ensure Firebase is initialized in your app
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) {}

  // Fetch products from Firestore
  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('products').valueChanges();
  }

  // Add a product to Firestore
  addProduct(product: Product): Promise<void> {
    const id = this.firestore.createId(); // Generate a new unique ID for the product
    return this.firestore.collection('products').doc(id).set({
      id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  }
}
