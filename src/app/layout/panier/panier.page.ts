import { Component, OnInit, OnDestroy } from '@angular/core';
import { PanierService } from 'src/app/layout/panier/panier.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PanierPage implements OnInit, OnDestroy {
  private panierSubscription: Subscription;
  articlesInPanier: any[] = [];

  constructor(
    private panierService: PanierService,
    private auth: AuthService,
    private router: Router
  ) {
    this.panierSubscription = this.panierService
      .getPanierObservable()
      .subscribe((panier) => {
        this.articlesInPanier = panier;
      });
  }

  async ngOnInit() {
    try {
      await this.panierService.initStorage();
      const panier = await this.panierService.getPanier();

      // Filtrer les articles avec le statut "En ligne"
      this.articlesInPanier = panier.filter(
        (article) => article.status === 'En ligne'
      );
    } catch (error) {
      console.error('Erreur lors de la récupération du panier', error);
    }
  }

  payer() {
    console.log('Paiement en cours...');
    this.router.navigate(['/paiement'], {
      queryParams: { state: JSON.stringify({ panier: this.articlesInPanier }) },
    });
  }

  ngOnDestroy() {
    this.panierSubscription.unsubscribe();
  }

  logOut() {
    console.log('Déconnexion...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  panier() {
    console.log('Accéder au panier...');
  }

  profil() {
    this.router.navigateByUrl('/donnees-perso');
  }

  supprimerDuPanier(article: any) {
    const index = this.articlesInPanier.indexOf(article);
    if (index !== -1) {
      this.articlesInPanier.splice(index, 1);
      this.panierService.setPanier(this.articlesInPanier);
    }
  }
}
