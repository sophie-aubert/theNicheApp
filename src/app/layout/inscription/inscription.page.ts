// Assurez-vous d'importer le HttpClient dans votre composant
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthRequest } from 'src/app/security/auth-request.model';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: "app-login",
  templateUrl: "./inscription.page.html",
  styleUrls: ["./inscription.page.scss"],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class InscriptionPage {
  inscriptionRequest: AuthRequest = {};

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const apiUrl = 'https://thenicheapp.onrender.com';
    const endpoint = `${apiUrl}/auth/inscription`;

    this.http.post(endpoint, this.inscriptionRequest).subscribe(
      (response: any) => {
        console.log('Inscription réussie!', response);
        // Rediriger l'utilisateur vers la page de connexion.
        this.router.navigateByUrl('/accueil');
    
      },
      (error: any) => {
        console.error('Erreur lors de l\'inscription', error);

        // Gérer les erreurs d'inscription ici.
        if (error.status === 409) {
          // Exemple: Afficher un message d'erreur pour un conflit (par exemple, utilisateur existant)
          console.error('Utilisateur déjà existant');
        } else {
          // Gérer d'autres erreurs
        }
      }
    );
  }
}
