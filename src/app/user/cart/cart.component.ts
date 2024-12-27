import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

interface CartItem {
  id: string;
  name: string;
  price: number;
  userId: string;
  productId: string; // Optionally store the product ID
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Stores items fetched from Firestore

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

 
  ngOnInit() {
    // Get the current user's UID and load their cart items
    this.authService.getCurrentUser().subscribe((user) => {
      if (user && user.uid) {
        this.loadCartItems(user.uid);
      } else {
        console.error('No user is currently logged in.');
      }
    });
  }

  // Load cart items for a specific user
  loadCartItems(userId: string) {
    this.firestore
      .collection('carts', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges()
      .subscribe(
        (items) => {
          this.cartItems = items.map((item) => {
            const data = item.payload.doc.data() as Omit<CartItem, 'id'>; // Exclude 'id' from the data type
            return {
              id: item.payload.doc.id, // Explicitly add the document ID
              ...data, // Spread the rest of the fields
            };
            
          });
        },
        
        (error) => {
          console.error('Error fetching cart items:', error);
        }
      );
  }

  // Delete a cart item
  deleteCartItem(itemId: string) {
    this.firestore
      .doc(`carts/${itemId}`)
      .delete()
      .then(() => {
        console.log('Cart item deleted successfully.');
        alert('Item removed from cart!')
        this.authService.getCurrentUser().subscribe((user) => {
          if (user && user.uid) {
            this.loadCartItems(user.uid);
          }
        });
      })
      .catch((error) => {
        console.error('Error deleting cart item:', error);
      });
  }
  get totalCost() {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
  
  

  // Place Order
  placeOrder() {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user && user.uid) {
        const order = {
          userId: user.uid,
          items: this.cartItems.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price
          })),
          totalPrice: this.cartItems.reduce((sum, item) => sum + item.price, 0),
          timestamp: new Date().toISOString(),
        };

        // Create an order in the 'orders' collection
        this.firestore.collection('orders').add(order)
          .then(() => {
            console.log('Order placed successfully.');
            alert('Order placed successfully!');
            // Clear the cart after placing the order
            this.clearCart(user.uid);
          })
          .catch((error) => {
            console.error('Error placing order: ', error);
          });
      } else {
        console.error('No user is logged in.');
      }
    });
  }

  // Clear the cart after the order is placed
  clearCart(userId: string) {
    this.firestore.collection('carts', (ref) => ref.where('userId', '==', userId)).get()
      .subscribe(snapshot => {
        snapshot.forEach(doc => {
          this.firestore.doc(`carts/${doc.id}`).delete()
            .then(() => {
              console.log('Cart item deleted successfully.');
            })
            .catch((error) => {
              console.error('Error deleting cart item:', error);
            });
        });
      });
  }
}
