// article.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ArticlePage implements OnInit {
  annonceId: any;
  annonceDetails: any = {};

  constructor(private route: ActivatedRoute,  private router: Router) {}

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
      console.error('Erreur lors du chargement de l\'annonce', error);
      // Gérer les erreurs de chargement des annonces ici.
    }
  }

  async ngOnInit() {
    // Récupérer l'ID de l'annonce depuis l'URL
    this.route.paramMap.subscribe(async params => {
      this.annonceId = params.get('id');
      console.log('Annonce ID :', this.annonceId);

      // Charger les détails de l'annonce
      await this.loadAnnonceDetails();

      // Afficher les détails de l'annonce
      console.log('Annonce détails :', this.annonceDetails);
    });
  }

  ajouterAuPanier() {
    // Implémentez ici le code pour ajouter l'annonce au panier
    console.log('Annonce ajoutée au panier :', this.annonceDetails);
    // Ajoutez votre logique pour ajouter l'article au panier
    this.router.navigateByUrl('/panier');
  }
}
