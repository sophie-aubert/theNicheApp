import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/security/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/security/auth-request.model';
import { User } from 'src/app/security/user.model';

@Component({
  selector: 'app-donnees-perso',
  templateUrl: './donnees-perso.page.html',
  styleUrls: ['./donnees-perso.page.scss'],

  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DonneesPersoPage implements OnInit {
  user?: User;
  profilRequest: AuthRequest = {};
  originalProfilRequest: AuthRequest = {};

  constructor(private auth: AuthService, private router: Router) {}

  // quand on refresh la page, appelle le ngOnInit

  ngOnInit() {
    this.auth.getUser$().subscribe((user) => {
      this.user = user;
      if (user) {
        this.profilRequest = {
          id: user.id || '',
          nom: user.nom || '',
          prenom: user.prenom || '',
          username: user.username || '',
          email: user.email || '',
          password: user.password || '',
          ville: user.ville || '',
          adresse: user.adresse || '',
          npa: user.npa || '',
        } as AuthRequest;
      }
    });
  }

  onSubmit(form: NgForm) {
    console.log('bouton OK');

    this.auth.getToken$().subscribe((authToken) => {
      console.log("Token d'authentification récupéré", authToken);

      if (!authToken) {
        console.error("Token d'authentification introuvable.");
        return;
      } else {
        console.log('id', this.user?.id);

        const headers = {
          Authorization: authToken,
        };

        // Faire la requête HTTP avec le token dans le header
        this.auth
          .updateProfil$(this.profilRequest, headers)
          .subscribe((user) => {
            console.log('Profil mis à jour avec succès!', user);
            this.router.navigateByUrl('/accueil');
          });
      }
    });
  }

  // supprimer le compte avec la requête HTTP DELETE /utilisateurs/:id
  supprimerProfile() {
    console.log('bouton Supprimer OK');

    this.auth.getToken$().subscribe((authToken) => {
      console.log("Token d'authentification récupéré", authToken);

      if (!authToken) {
        console.error("Token d'authentification introuvable.");
        return;
      } else {
        console.log('id', this.user?.id);

        const headers = {
          Authorization: authToken,
        };

        // Faire la requête HTTP avec le token dans le header
        this.auth
          .deleteProfile$(this.profilRequest, headers)
          .subscribe((user) => {
            console.log('Profil supprimer', user);
            this.router.navigateByUrl('/');
          });
      }
    });
  }

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  panier() {
    this.router.navigateByUrl('/panier');
  }

  profil() {
    this.router.navigateByUrl('/donnees-perso');
  }
}
