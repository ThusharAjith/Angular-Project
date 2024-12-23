import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { RegisterComponent } from './register/register.component';
import { SelectionComponent } from './selection/selection.component';


const routes: Routes = [
  {path: 'userhome', loadChildren: () => import('./user/user.module').then(m=> m.UserModule)},
  {path: 'adminhome', loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:'userlogin', component:UserloginComponent},
  {path: 'adminlogin', component:AdminloginComponent},
  {path:'register', component:RegisterComponent},
  {path: '', component: SelectionComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
