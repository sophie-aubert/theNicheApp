import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PanierPage } from '../panier/panier.page';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.page.html',
  styleUrls: ['./paiement.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PaiementPage implements OnInit {
  articlesInPanier: any[] = [];
  total: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupérer les données du panier transmises par la page précédente
    this.route.queryParams.subscribe((params) => {
      if (params && params['state'] && JSON.parse(params['state']).panier) {
        this.articlesInPanier = JSON.parse(params['state']).panier;

        // Calculer le total après avoir chargé les données
        this.calculerTotal();
        console.log('Articles dans le panier', this.articlesInPanier);
      }
    });
  }

  retirerDuPaiement(article: any) {
    const index = this.articlesInPanier.indexOf(article);
    if (index !== -1) {
      this.articlesInPanier.splice(index, 1);
    }
    // Calculer le total après avoir retiré un article
    this.calculerTotal();
  }

  calculerTotal() {
    this.total = this.articlesInPanier.reduce(
      (acc, article) => acc + article.prix,
      0
    );
  }

  passerPaiement() {
    this.articlesInPanier.forEach((article) => {
      article.statut = 'Acheté';
    });
    this.articlesInPanier = [];
    this.total = 0;
    console.log('articlesInPanier', this.articlesInPanier);

    alert(
      'Paiement effectué avec succès, merci pour votre achat ! Un mail de confirmation vous a été envoyé.'
    );
    // Rediriger vers la page d'accueil
    window.location.href = '/';
  }
}
