import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Ensure Firebase is initialized in your app
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) {}

  //fetch products from firestore
  getProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('products').valueChanges();
  }

  //adding product to firestore
  addProduct(product: Product): Promise<void> {
    const id = this.firestore.createId(); // Generate a new unique ID for the product
    return this.firestore.collection('products').doc(id).set({
      id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  }

  //fetch orders from firestore
  getOrders(): Observable <Order[]> {
    return this.firestore.collection<Order>('orders').valueChanges();
  }
}
