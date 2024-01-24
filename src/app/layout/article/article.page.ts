// article.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { PanierService } from '../panier/panier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ArticlePage implements OnInit {
  annonceId: any;
  annonceDetails: any = {};

  // Ajoutez cette propriété pour récupérer les articles du panier
  articlesInPanier: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private panierService: PanierService
  ) {}

  async loadAnnonceDetails() {
    try {
      // Charger les détails de l'annonce depuis l'API
      // Utilisez this.annonceId pour récupérer l'ID de l'annonce
      // indiqué le titre de l'annonce

      const url = `https://thenicheapp.onrender.com/annonces/${this.annonceId}`;
      const response = await fetch(url);
      const data = await response.json();

      this.annonceDetails = data;
      console.log('Annonce chargée :', this.annonceDetails);
    } catch (error) {
      console.error("Erreur lors du chargement de l'annonce", error);
      // Gérer les erreurs de chargement des annonces ici.
    }
  }

  async ngOnInit() {
    // Récupérer l'ID de l'annonce depuis l'URL
    this.route.paramMap.subscribe(async (params) => {
      this.annonceId = params.get('id');
      console.log('Annonce ID :', this.annonceId);

      // Charger les détails de l'annonce
      await this.loadAnnonceDetails();

      // Afficher les détails de l'annonce
      console.log('Annonce détails :', this.annonceDetails);

      // Récupérer les articles du panier
      this.articlesInPanier = await this.panierService.getPanier();
    });
  }

  ajouterAuPanier() {
    // Ajouter l'annonce au panier en utilisant le service
    this.panierService.ajouterAuPanier(this.annonceDetails);
    console.log('Annonce ajoutée au panier :', this.annonceDetails);

    // Naviguer vers la page du panier
    this.router.navigateByUrl('/panier');
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
