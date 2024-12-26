import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface User {
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  // User login method
  userlogin(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.firestore
            .collection<User>('users')
            .doc(user.uid)
            .get()
            .subscribe(
              (doc) => {
                const data = doc.data();
                if (doc.exists && data?.role === 'user') {
                  localStorage.setItem('token', 'true');
                  localStorage.setItem('userRole', 'user');
                  this.router.navigate(['/userhome']);
                } else {
                  alert('Access denied: Not a user account');
                  this.router.navigate(['/login']);
                }
              },
              (err) => {
                console.error('Error fetching user role:', err);
                alert('Error fetching user role.');
              }
            );
        }
      },
      (err) => {
        alert('Enter correct email or password');
        this.router.navigate(['/login']);
      }
    );
  }

  // Admin login method
  adminlogin(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        if (user) {
          this.firestore
            .collection<User>('users')
            .doc(user.uid)
            .get()
            .subscribe(
              (doc) => {
                const data = doc.data();
                if (doc.exists && data?.role === 'admin') {
                  localStorage.setItem('token', 'true');
                  localStorage.setItem('userRole', 'admin');
                  this.router.navigate(['/adminhome']);
                } else {
                  alert('Access denied: Not an admin account');
                  this.router.navigate(['/login']);
                }
              },
              (err) => {
                console.error('Error fetching admin role:', err);
                alert('Error fetching admin role.');
              }
            );
        }
      },
      (err) => {
        alert('Enter correct email or password');
        this.router.navigate(['/login']);
      }
    );
  }

  // Register method
  register(
    email: string,
    password: string,
    fullName: string,
    phoneNumber: string,
    address: string
  ) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        if (user) {
          // Add user to Firestore
          this.firestore
            .collection('users')
            .doc(user.uid)
            .set({
              email: user.email || '',
              role: 'user',
              fullName: fullName,
              phoneNumber: phoneNumber,
              address: address,
            })
            .then(() => {
              console.log('User added to Firestore');
              alert('Registration successful');
              this.router.navigate(['/login']);
            })
            .catch((err) => {
              console.error('Error adding user to Firestore:', err);
              alert('Error saving user to database.');
            });
        }
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  // Logout method
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // Method to get the current logged-in user
  getCurrentUser() {
    return this.fireauth.authState; // Returns an Observable of the current user state
  }
}
