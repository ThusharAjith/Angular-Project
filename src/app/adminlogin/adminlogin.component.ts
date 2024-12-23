import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
  email: string = '';
  password:string = '';

  constructor(private auth: AuthService){}
ngOnInit(): void{}

adminlogin(){
  if(this.email == ''){
    alert('Please enter email');
  return;
  }

  if(this.password == ''){
    alert('Please enter password')
    return;
  }

  this.auth.adminlogin(this.email, this.password);
  this.email= '';
  this.password = '';
}
}
