import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private firestore: AngularFirestore) {}

  //get data from about us collection

  getAboutusData(): Observable<any> {
    return new Observable(observer => {
      this.firestore.collection('aboutus').doc().get().subscribe(doc => {
        if(doc.exists){
          observer.next(doc.data());
        } else {
          observer.error('About us Data not found');
        }
      });
    
    })
  }

  
}
