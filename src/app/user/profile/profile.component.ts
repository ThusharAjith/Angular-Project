import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  ngOnInit(): void {
    if (!this.isAdmin) {
      this.isAdmin = localStorage.getItem('userRole') === 'admin';
    }
  }

}
