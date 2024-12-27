import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {}

  //get data using userID
  getUserData(): Observable<any> {
    return new Observable(observer => {
      this.auth.currentUser.then(user => {
        if (user) {
          //fetch data using userID
          this.firestore.collection('users').doc(user.uid).get().subscribe(doc => {
            if (doc.exists) {
              observer.next(doc.data());
            } else {
              observer.error('User data not found');
            }
          });
        } else {
          observer.error('User is not authenticated');
        }
      });
    });
  }
}
