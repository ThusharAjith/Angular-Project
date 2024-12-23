import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() isAdmin: boolean = false;

  ngOnInit():void {
    // If the flag is not passed as Input, use localStorage to determine admin status
    if (!this.isAdmin) {
      this.isAdmin = localStorage.getItem('userRole') === 'admin';
    }
  }
}
