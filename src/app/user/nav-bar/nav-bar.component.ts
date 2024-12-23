import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isProfileMenuOpen = false;

  @Input() isAdmin: boolean = false; // same logic, ie for user it is false and for admin it will be true.

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  ngOnInit() {
    // Admin flag based on the user role from localStorage or authentication service
    if (!this.isAdmin) {
      this.isAdmin = localStorage.getItem('userRole') === 'admin'; // Alternatively use your auth service
    }
  }
}
