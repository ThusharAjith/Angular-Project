import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Order } from 'src/app/models/order.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-admin-edit-orders',
  templateUrl: './admin-edit-orders.component.html',
  styleUrls: ['./admin-edit-orders.component.css']
})
export class AdminEditOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private productService: ProductService, 
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  //fetch various orders
  loadOrders(): void {
    this.productService.getOrders().subscribe({
      next: (orders) => {
        //including firestore doc ID and timestamp with other things
        this.orders = orders.map(order => ({
          ...order,
          timestamp: order.timestamp //timestamp is the unique identifier !!!! SINCE ORDERID IS NOT THERE
        }));
        console.log('Fetched orders: ', this.orders);
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }

  //delete order using timestamp
  deleteOrder(timestamp: string): void {
    //timestamp is stored as a string but can also be of date type
    this.firestore.collection('orders', ref => ref.where('timestamp', '==', timestamp))
      .get().toPromise()
      .then(querySnapshot => {
        if (querySnapshot && !querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            //deleting doc using snapshot id
            this.firestore.collection('orders').doc(doc.id).delete().then(() => {
              console.log('Order deleted successfully');
              this.loadOrders();  //refresh orde elist
            }).catch(error => {
              console.error('Error deleting order: ', error);
            });
          });
        } else {
          console.log('No orders found with the given timestamp.');
        }
      })
      .catch(error => {
        console.error('Error finding order to delete: ', error);
      });
  }
}
