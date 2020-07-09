import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  firstName: string
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    nom: new FormControl(''),
    email: new FormControl(''),
  });
  noms: string;
  mail : string;
  telephones : string;
name : string;
  messages : string;
  message_validation : boolean = false; 
  constructor(private fb: FormBuilder) {


  }

  ngOnInit(): void { 
    this.profileForm = this.fb.group({
      firstName: ["", Validators.required],
      nom: ["", Validators.required],
      telephone: ["", Validators.required],
      email: ["", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      message: ["", Validators.required]

    });
  }
  onSubmit() {
    this.noms = this.profileForm.get('firstName').value;
    this.mail = this.profileForm.get('email').value;
    this.name = this.profileForm.get('nom').value;
    this.messages =  this.profileForm.get('message').value;
    this.telephones = this.profileForm.get('telephone').value;


    this.message_validation = true ;
    setTimeout(() => {
      this.profileForm.reset();
      this.message_validation = false;
    }, 2000);

    axios.post('http://localhost:3000/mail1', {
      nom: this.noms,
      email: this.mail,
      name : this.name,
      message : this.messages,
      telephone : this.telephones
    })


  }
  get primEmail() {
    return this.profileForm.get('email');
  }

  



}
