import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierPage } from '../panier/panier.page';
import { AchatVenteService } from 'src/app/achatvente/achat-vente.service';
import { firstValueFrom } from 'rxjs';
import { PanierService } from '../panier/panier.service';

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

  constructor(
    private route: ActivatedRoute,
    private achatVenteService: AchatVenteService,
    private router: Router,
    private panierService: PanierService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params['state'] && JSON.parse(params['state']).panier) {
        this.articlesInPanier = JSON.parse(params['state']).panier;
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
    this.calculerTotal();
  }

  calculerTotal() {
    this.total = this.articlesInPanier.reduce(
      (acc, article) => acc + article.prix,
      0
    );
  }

  passerPaiement() {
    const updateStatusPromises = this.articlesInPanier.map((article) => {
      article.status = 'Acheté';
      return firstValueFrom(
        this.achatVenteService.modifierStatus(article, article.status)
      );
    });

    Promise.all(updateStatusPromises)
      .then(() => {
        alert(
          'Paiement effectué avec succès, merci pour votre achat ! Un mail de confirmation vous a été envoyé.'
        );
        this.panierService.videPanier();
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la mise à jour du statut pour certains articles',
          error
        );
      });
  }
}
