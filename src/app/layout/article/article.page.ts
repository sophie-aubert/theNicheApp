import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { PanierService } from '../panier/panier.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListeAchatVentePage } from '../liste-achat-vente/liste-achat-vente.page';

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

  articlesInPanier: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private panierService: PanierService,
    private listeAchatVentePage: ListeAchatVentePage
  ) {}

  async loadAnnonceDetails() {
    try {
      const url = `https://thenicheapp.onrender.com/annonces/${this.annonceId}`;
      const response = await fetch(url);
      const data = await response.json();

      this.annonceDetails = data;
      console.log('Annonce chargée :', this.annonceDetails);
    } catch (error) {
      console.error("Erreur lors du chargement de l'annonce", error);
    }
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.annonceId = params.get('id');
      console.log('Annonce ID :', this.annonceId);

      await this.loadAnnonceDetails();

      console.log('Annonce détails :', this.annonceDetails);

      this.articlesInPanier = await this.panierService.getPanier();
    });
  }

  async ajouterAuPanier() {
    this.panierService.ajouterAuPanier(this.annonceDetails);
    console.log('Annonce ajoutée au panier :', this.annonceDetails);

    this.listeAchatVentePage.annonces.unshift(this.annonceDetails);
    console.log(
      "Annonce ajoutée à la liste d'achat-vente :",
      this.annonceDetails
    );

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
