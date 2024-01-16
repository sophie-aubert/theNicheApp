import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InscriptionPage implements OnInit {
  inscriptionRequest: any = {}; // Un objet pour stocker les données du formulaire

  constructor() {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    // Ne rien faire si le formulaire est invalide.
    if (form.invalid) {
      return;
    }

    // Vous pouvez traiter ici les données du formulaire (inscriptionRequest).
    console.log('Formulaire soumis :', this.inscriptionRequest);
  }
}