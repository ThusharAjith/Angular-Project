import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AngularFireModule } from '@angular/fire/compat'; // Import the compatibility version of AngularFire
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Compatibility Auth module
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { SelectionComponent } from './selection/selection.component'; 

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserloginComponent,
    AdminloginComponent,
    SelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AdminModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase with the compat API
    AngularFireAuthModule, // Auth compatibility module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
