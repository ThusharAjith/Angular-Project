import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { AdminModule } from "../admin/admin.module";

// Routes are being defined here
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'featured', component: FeaturedProductsComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'shopnow', component: FeaturedProductsComponent },
  { path: 'contact', component: ContactComponent },
  {path: 'profile', component: ProfileComponent},
  {path: 'cart', component: CartComponent}

];

@NgModule({
  declarations: [
    NavBarComponent,
    AboutUsComponent,
    FeaturedProductsComponent,
    HomeComponent,
    CartComponent,
    ProfileComponent,
    FooterComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
],
  exports: [
    NavBarComponent,
    AboutUsComponent,
    FeaturedProductsComponent,
    HomeComponent,
    RouterModule, // To be used in other modules
    CartComponent,
    ProfileComponent,
    FooterComponent,
  ],
})
export class UserModule {}
