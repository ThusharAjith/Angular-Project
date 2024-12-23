import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../user/user.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminAboutUsComponent } from './admin-about-us/admin-about-us.component';
import { AdminEditOrdersComponent } from './admin-edit-orders/admin-edit-orders.component';
import { AdminFeaturedProductsComponent } from './admin-featured-products/admin-featured-products.component';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { RouterModule, Routes } from '@angular/router';

//routes aee being declared here
const routes: Routes =[
  {path: 'edit-about-us', component: AdminAboutUsComponent},
  {path: 'edit-orders', component: AdminEditOrdersComponent},
  {path: '', component: AdminHomeComponent},
  {path: 'adminfeatured', component: AdminFeaturedProductsComponent},
  {path: 'adminprofile', component:AdminProfileComponent}

];

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminAboutUsComponent,
    AdminEditOrdersComponent,
    AdminFeaturedProductsComponent,
    AdminNavBarComponent,
    AdminProfileComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    UserModule,
    RouterModule.forChild(routes)
  ],

  exports: [
    AdminAboutUsComponent,
    AdminHomeComponent,
    AdminEditOrdersComponent,
    AdminFeaturedProductsComponent,
    AdminNavBarComponent,
    AdminFooterComponent,
    AdminProfileComponent,
  ]
})
export class AdminModule { }
