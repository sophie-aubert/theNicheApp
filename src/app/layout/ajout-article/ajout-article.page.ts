import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.page.html',
  styleUrls: ['./ajout-article.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AjoutArticlePage implements OnInit {
  nouvelArticle: any = {

  }; 

    // Assurez-vous que cette propriété est correctement déclarée
    categories: string[] = [
      "Chaussures",
      "Pantalons",
      "Chemises",
      "Pulls",
      "Vestes",
      "Manteaux",
      "Accessoires",
      "T-shirts"
    ];

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  

  ngOnInit() {}

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }

  panier() {
    this.router.navigateByUrl("/panier");
  }

  profil() {
    this.router.navigateByUrl("/donnees-perso");
  }

  ajouterArticle() {
  
    this.auth.getToken$().subscribe((authToken) => {
      console.log('Token d\'authentification récupéré', authToken);

      if (!authToken) {
        console.error('Token d\'authentification introuvable.');
        return;
      } else {
        
      const apiUrl = 'https://thenicheapp.onrender.com';
      const endpoint = `${apiUrl}/annonces`;
  
      this.http.post(endpoint, this.nouvelArticle, {
        headers: {
          Authorization: authToken
        }

      }).subscribe(
        (response: any) => {
          console.log('Nouvel article ajouté avec succès!', response);
          this.nouvelArticle = {};
          this.navCtrl.navigateBack('/accueil');
          location.reload();
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'article', error);
          // Imprimer le contenu de l'erreur pour obtenir des détails spécifiques du serveur
          if (error instanceof HttpErrorResponse) {
            console.error('Erreur du serveur:', error.error);
          }
        }
      );
    }
  }
  );
  }
}
