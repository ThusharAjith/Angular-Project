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

  editedProduct: Product | null = null; //current product thta is being edited

  @Input() isAdmin: boolean = false; //is current user an admin?
  
  constructor(
    private productService: ProductService, 
    private authService: AuthService, 
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

   //adding new product --> admin function
  addProduct() {
    if (this.newProduct.name && this.newProduct.price && this.newProduct.imageUrl) {
      this.productService.addProduct(this.newProduct).then(() => {
        console.log('Product added successfully');
        alert('Prodjct added successfully')
        this.loadProducts();  //reload products after new product is added
        this.resetProductForm(); //form reset
      }).catch(error => {
        console.error('Error adding product: ', error);
      });
    } else {
      console.error('All fields are required');
    }
  }
  loadProducts() {
    //fetch products from firestore
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
    this.editedProduct = null; // Reset edited product on close
    document.body.classList.remove('bg-blur');
  }

  // Admin-specific method to edit a product
  editProduct(product: Product) {
    // Populate the editedProduct with the selected product's data
    this.editedProduct = { ...product };
    document.body.classList.add('bg-blur');
  }

  // Method to save the edited product to Firestore
  saveEditedProduct() {
    if (this.editedProduct && this.editedProduct.id) {
      this.firestore.collection('products').doc(this.editedProduct.id).update({
        name: this.editedProduct.name,
        price: this.editedProduct.price,
        imageUrl: this.editedProduct.imageUrl,
      }).then(() => {
        console.log('Product updated successfully');
        alert('Product has been updated!')
        this.loadProducts();  // Reload products to reflect changes
        this.closeModal(); // Close the modal after saving
      }).catch(error => {
        console.error('Error updating product: ', error);
        alert('Error updating product')
      });
    } else {
      console.error('Invalid product data');
      alert('Invalid product data')
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
          alert('Item added to cart');
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
