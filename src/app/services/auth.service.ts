import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router : Router) { 
  }

  //userlogin method
  userlogin(email:string, password: string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
        localStorage.setItem('token','true');
        localStorage.setItem('userRole', 'user');
       this.router.navigate(['/userhome']) //navigate to home page OF USER
    }, err => {
      alert('Enter correct email or password');
      this.router.navigate(['/login']);
    })
  }
  //adminlogin method
  adminlogin(email:string, password: string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
        localStorage.setItem('token','true');
        localStorage.setItem('userRole', 'admin');
        this.router.navigate(['/adminhome']); //navigate to home page OF ADMIN
    }, err => {
      alert('Enter correct email or password');
      this.router.navigate(['/login']);
    })
  }

  //register method
register(email:string, password:string){
  this.fireauth.createUserWithEmailAndPassword(email,password).then( () => {
    alert('registration successfull');
    this.router.navigate(['/login']);
  }, err => {
    alert(err.message);
    this.router.navigate(['/regitser'])
  })
}
  //logout method

logout() {
  this.fireauth.signOut().then( ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }, err=> {
      alert(err.message)
    })
  }

}
