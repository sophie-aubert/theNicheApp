import { Component, OnInit } from '@angular/core';
import { PanierService } from 'src/app/layout/panier/panier.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PanierPage implements OnInit {
  articlesInPanier: any[] = [];

  constructor(
    private panierService: PanierService,
    private auth: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Récupérer les articles du panier lors de l'initialisation de la page
    try {
      this.articlesInPanier = await this.panierService.getPanier();
    } catch (error) {
      console.error('Erreur lors de la récupération du panier', error);
    }
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
