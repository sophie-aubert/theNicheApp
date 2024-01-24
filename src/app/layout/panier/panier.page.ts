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
  articlesInPanier: any[] = [];
  private panierSubscription: Subscription;

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
      await this.panierService.initStorage(); // Initialisez le stockage avant d'accéder au panier
      this.articlesInPanier = await this.panierService.getPanier();
    } catch (error) {
      console.error('Erreur lors de la récupération du panier', error);
    }
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
    // Changer le nom de la méthode "panier()" car il est également utilisé pour déclencher la navigation vers cette page
    console.log('Accéder au panier...');
  }

  profil() {
    this.router.navigateByUrl('/donnees-perso');
  }

  supprimerDuPanier(article: any) {
    const index = this.articlesInPanier.indexOf(article);
    if (index !== -1) {
      this.articlesInPanier.splice(index, 1);
      this.panierService.setPanier(this.articlesInPanier); // Met à jour le panier dans le service
    }
  }
}
