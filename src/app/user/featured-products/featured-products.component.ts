import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css']
})
export class FeaturedProductsComponent {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  
  newProduct: Product = {
    id: '',
    name: '',
    price: 0,
    imageUrl: ''
  };

  @Input() isAdmin: boolean = false; // To determine if the current user is an admin
  
  constructor(
    private productService: ProductService, 
    private authService: AuthService, 
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    // Fetch products from Firestore
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    document.body.classList.add('bg-blur');
  }

  closeModal() {
    this.selectedProduct = null;
    document.body.classList.remove('bg-blur');
  }

  // Admin-specific method to edit a product
  editProduct(product: Product) {
    console.log('Edit product', product);
  }

  // Method to add a new product (Admin functionality)
  addProduct() {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.imageUrl) {
      this.productService.addProduct(this.newProduct).then(() => {
        console.log('Product added successfully');
        this.loadProducts();  // Reload products
        this.resetProductForm(); // Reset form
      }).catch(error => {
        console.error('Error adding product: ', error);
      });
    } else {
      console.error('All fields are required');
    }
  }

  // Method to add a product to the cart
  addToCart(product: Product) {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user && user.uid) {
        const cartItem = {
          name: product.name,
          price: product.price,
          userId: user.uid, // Associate product with the current user
          productId: product.id, // Optionally store the product ID
        };

        // Add the cart item to the 'carts' collection in Firestore
        this.firestore.collection('carts').add(cartItem).then(() => {
          console.log('Item added to cart');
        }).catch(error => {
          console.error('Error adding item to cart: ', error);
        });
      } else {
        console.error('No user is logged in');
      }
    });
  }

  // Reset form fields
  resetProductForm() {
    this.newProduct = {
      id: '',
      name: '',
      price: 0,
      imageUrl: ''
    };
  }
}
