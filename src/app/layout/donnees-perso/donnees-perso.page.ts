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

  // ONSUBMITMODIF
  ///////////////////////////////////
  onSubmitModif(form: NgForm) {
    if (this.user) {
      this.auth
        .updateProfil$(this.profilRequest, this.user.id)
        .subscribe((response) => {
          console.log('response', response);
          this.router.navigateByUrl('/accueil');
        });
    }
  }

  supprimerProfile() {
    console.log('bouton Supprimer OK');

    this.auth.getToken$().subscribe((authToken) => {
      console.log("Token d'authentification récupéré", authToken);

      if (!authToken) {
        console.error("Token d'authentification introuvable.");
        return;
      } else {
        console.log('id', this.user?.id);

        // Ne pas inclure les headers ici
        this.auth.deleteProfile$(this.profilRequest).subscribe(() => {
          // on déconnecte l'utilisateur
          this.auth.logOut();
          this.router.navigateByUrl('/login');
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
