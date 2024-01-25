import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
import { AchatVenteService } from 'src/app/achatvente/achat-vente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-liste-achat-vente',
  templateUrl: './liste-achat-vente.page.html',
  styleUrls: ['./liste-achat-vente.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class ListeAchatVentePage implements OnInit {
  annonces: any[] = [];
 
  userId: string = ''; // Update the type to string

  constructor(
    private auth: AuthService,
    private router: Router,
    private AchatVenteService: AchatVenteService
  ) {}

  ngOnInit() {
    this.loadVentesAchats();
  }

  logOut() {
    console.log('Logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  panier() {
    this.router.navigateByUrl('/panier');
  }

  profil() {
    this.router.navigateByUrl('/donnees-perso');
  }


  loadVentesAchats() {
    this.auth.getUser$().subscribe(
      (user) => {
        if (user) {
          this.userId = user.id;
          // Utilisez la chaîne de caractères userId
  
          this.AchatVenteService.getMesAnnonces(this.userId).subscribe(
            (ventes: any[]) => {
              this.annonces = ventes;
            },
            (error: any) => {
              console.error('Erreur lors du chargement des ventes', error);
            }
          );
  

        } else {
          console.error('Identifiant utilisateur non disponible');
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de l\'ID utilisateur', error);
      }
    );
  }
  
}