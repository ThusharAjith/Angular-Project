import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {
  email: string = '';
  password:string = '';

  constructor(private auth: AuthService){}
ngOnInit(): void{}

userlogin(){
  if(this.email == ''){
    alert('Please enter email');
  return;
  }

  if(this.password == ''){
    alert('Please enter password')
    return;
  }

  this.auth.userlogin(this.email, this.password)
  this.email= '';
  this.password = '';


}

}
