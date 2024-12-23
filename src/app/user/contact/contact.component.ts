import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  states = [
    {name:"Kerala"},{name:"Tamil Nadu"},{name:"Andhra Pradesh"}, {name:"Karnataka"}, {name:"Telangana"}, {name:"Maharashtra"}, {name:"Uttar-Pradesh"}
  ]
  submitoption = false;
  submitToggle(): void{
    this.submitoption = !this.submitoption
  }

}
