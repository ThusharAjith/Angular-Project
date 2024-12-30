import { Component, Input, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/services/about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  @Input() isAdmin: boolean = false;

  aboutusData: any = {}; //aboutus data is stored in this for displaying
  
  constructor(private aboutusdata: AboutUsService){}

  ngOnInit(): void {
      if( !this.isAdmin){
        this.isAdmin = localStorage.getItem('userRole') === 'admin';
      }

      //about us data to be fetched when the component loads

      this.aboutusData.getAboutusData().subscribe(
        (data:any) => {
          this.aboutusData = data;
        }
      );
  }



}
