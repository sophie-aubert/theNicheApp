import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthRequest } from 'src/app/security/auth-request.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InscriptionPage {
  inscriptionRequest: AuthRequest = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}

  async onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const apiUrl = 'https://thenicheapp.onrender.com';
    const endpoint = `${apiUrl}/auth/inscription`;

    try {
      const response = await this.http
        .post(endpoint, this.inscriptionRequest)
        .toPromise();
      console.log('Inscription réussie!', response);
      this.router.navigateByUrl('/accueil');
    } catch (error) {
      if (error) {
        this.presentAlert(
          'Ohlala...',
          'Cette adresse mail est déjà utilisée !'
        );
      } else {
        this.presentAlert(
          "Erreur d'inscription",
          "Une erreur inattendue s'est produite."
        );
      }
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
