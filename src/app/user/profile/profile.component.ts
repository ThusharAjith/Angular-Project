import { Component, Input, OnInit } from '@angular/core';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() isAdmin: boolean = false;

  userData: any = {}; //user data is stored in this, for displaying
  isLoading: boolean = true; //state of loadibg

  constructor(private userdata: UserdataService) {}

  ngOnInit(): void {
    if (!this.isAdmin) {
      this.isAdmin = localStorage.getItem('userRole') === 'admin';
    }

    // user data to be fetched when the component loads
    this.userdata.getUserData().subscribe(
      (data:any) => {
        this.userData = data;
        this.isLoading = false; // loading is false if the data has been loaded
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }
}
