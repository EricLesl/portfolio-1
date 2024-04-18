import { Component } from '@angular/core';
import emailjs from 'emailjs-com';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  selectedOption = { design: true, research: false, chat: false };
  userInfo = { name: '', email: '', company: '', message: '' };

  ngOnInit() {
    // Initialize EmailJS with your user ID
    emailjs.init('NHYYPzpW3YMAmX-_-');
  }

  setSelected(type: string){
    for(const prop in this.selectedOption){
      if(prop === type){
        this.selectedOption[prop] = true;
      }else{
        this.selectedOption[prop] = false;
      }
    }
  }

  submitForm() {
    const templateParams = {
      from: this.userInfo.name,
      message: this.userInfo.message,
    };
  
    emailjs.send('service_dzgdygn', 'template_bl1ye8e', templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        this.userInfo = { name: '', email: '', company: '', message: '' };
      }, (error) => {
        console.log('FAILED...', error);
        alert("There was an error sending the email - if this persists, please email me directly at LilyanTweddle@gmail.com");
      });
  }
  
}
