import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-admin-edit-orders',
  templateUrl: './admin-edit-orders.component.html',
  styleUrls: ['./admin-edit-orders.component.css']
})
export class AdminEditOrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.productService.getOrders().subscribe({
      next: (orders) => {
        console.log('Fetched orders: ', orders);
        this.orders = orders;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }
}
