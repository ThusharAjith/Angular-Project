import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  address: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  register() {
    if (this.fullName.trim() === '') {
      alert('Please enter your full name');
      return;
    }

    if (this.email.trim() === '') {
      alert('Please enter your email');
      return;
    }

    if (this.password.trim() === '') {
      alert('Please enter your password');
      return;
    }

    if (this.phoneNumber.trim() === '') {
      alert('Please enter your phone number');
      return;
    }

    if (this.address.trim() === '') {
      alert('Please enter your address');
      return;
    }

    this.auth.register(this.email, this.password, this.fullName, this.phoneNumber, this.address);
    this.email = '';
    this.password = '';
    this.fullName = '';
    this.phoneNumber = '';
    this.address = '';
  }
}
