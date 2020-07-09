import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
interface heure {
  value: string;
  viewValue: string;
  disabled: boolean;
}


@Component({
  selector: 'app-avocat',
  templateUrl: './avocat.component.html',
  styleUrls: ['./avocat.component.css']
})

export class AvocatComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  today = new Date()
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  nomFormGroup: FormGroup;
  DateForm: FormGroup;
  nomer: any;
  param: string;
  message_validation = false; 
  noms : string;

  isOptional = false;
  isLinear: true;
  heuresPrise: any = [];
  heures: heure[] = [
    { value: "", viewValue: "", disabled: true },
    { value: '09h00', viewValue: '09h00', disabled: false },
    { value: '10h00', viewValue: '10h00', disabled: false },
    { value: '11h00', viewValue: '11h00', disabled: false },
    { value: '13h00', viewValue: '13h00', disabled: false },
    { value: '14h00', viewValue: '14h00', disabled: false },
    { value: '15h00', viewValue: '15h00', disabled: false },
    { value: '16h00', viewValue: '16h00', disabled: false },
    { value: '17h00', viewValue: '17h00', disabled: false }
  ];
  constructor(private route: Router, private routes : ActivatedRoute, private adapter: DateAdapter<any>, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.adapter.setLocale('fr');
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
     
    });
    this.nomFormGroup = this.formBuilder.group({
   
      noms : ['',Validators.required],
      email: ["", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    });
    this.nomer = this.routes.snapshot.paramMap.get('id');
    console.log(this.nomer);
    if (this.nomer == 2) {
      this.param = 'Sonia NETO';

    }
    else if (this.nomer == 1) {
      this.param = 'Christophe Youssif';
    }

  }
  dateFilter = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6 && date > this.today
  }

  afficheHeure() {
    //Récupère les donnée du jour sélectionné à partir du calendrier. 
    axios.get('http://localhost:3000/recupHeur'+this.nomer+'?jour='+this.firstFormGroup.get('firstCtrl').value.toLocaleDateString()).then((res) => {
      //Vide le tableau des heures prises.
      this.heuresPrise = []
      //Remet les heures en active.
      for (var i = 1; i < this.heures.length; i++) {
        this.heures[i].disabled = false
      }
      //Insére toutes les heures de rdv déjà réservé dans le tableau "heurePrise"
      res.data.forEach(element => {
        this.heuresPrise.push(element.heure)
      });
      //Compare toutes les heures de rdv a ceux déja réservé (tableau heuresPrise), si déjà réservé alors l'heure est bloqué.
      this.heuresPrise.forEach(element => {
        for (var i = 0; i < this.heures.length; i++) {
          if (element == this.heures[i].value) {
            this.heures[i].disabled = true
          }
        }
      })
    })
  }


  insererRdv() {
    if (this.nomFormGroup.valid ) {
      console.log("Form Submitted!"); 
      this.message_validation  = true; 
    }
    setTimeout(()=>{
        this.message_validation  = false; 
      },2000)

      axios.post("http://localhost:3000/insererRdv"+this.nomer,
      {
        nom: this.nomFormGroup.get('noms').value,
        email: this.nomFormGroup.get('email').value,
        jour: this.firstFormGroup.get('firstCtrl').value.toLocaleDateString(),
        heure: this.secondFormGroup.get('secondCtrl').value
      })
      axios.post('http://localhost:3000/mail2', {
        nom: this.nomFormGroup.get('noms').value,
        email: this.nomFormGroup.get('email').value,
        jour: this.firstFormGroup.get('firstCtrl').value.toLocaleDateString(),
        heure: this.secondFormGroup.get('secondCtrl').value
    })
      
  }
  
 get primEmail() {
    return this.nomFormGroup.get('email');
  }


}
