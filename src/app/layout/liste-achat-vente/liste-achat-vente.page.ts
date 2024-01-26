import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';
import { AchatVenteService } from 'src/app/achatvente/achat-vente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ModifierAnnoncePage } from '../modifier-annonce/modifier-annonce.page';

@Component({
  selector: 'app-liste-achat-vente',
  templateUrl: './liste-achat-vente.page.html',
  styleUrls: ['./liste-achat-vente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class ListeAchatVentePage implements OnInit {
  annonces: any[] = [];

  userId: string = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    private AchatVenteService: AchatVenteService,
    private alertController: AlertController,
    private modalController: ModalController
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
        console.error(
          "Erreur lors de la récupération de l'ID utilisateur",
          error
        );
      }
    );
  }

  badgeColor(status: string): string {
    switch (status) {
      case 'En ligne':
        return 'success';
      case 'Acheté':
        return 'primary';
      case 'Vendu':
        return 'danger';
      default:
        return 'medium';
    }
  }

  displayText(status: string): string {
    switch (status) {
      case 'En ligne':
        return 'En ligne';
      case 'Acheté':
        return 'Acheté';
      case 'Vendu':
        return 'Vendu';
      default:
        return 'Inconnu';
    }
  }

  async supprimerAnnonce(annonce: any) {
    const alert = await this.alertController.create({
      header: 'Confirmer la suppression',
      message: 'Voulez-vous vraiment supprimer cette annonce ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Supprimer',
          handler: async () => {
            try {
              const annonceId = annonce && annonce._id;

              if (annonceId) {
                await this.AchatVenteService.supprimerAnnonce(
                  annonceId
                ).toPromise();
                this.loadVentesAchats();
              } else {
                console.error("L'annonce n'a pas d'ID valide");
              }
            } catch (error) {
              console.error(
                "Erreur lors de la suppression de l'annonce",
                error
              );
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async modifierAnnonce(annonce: any) {
    const modal = await this.modalController.create({
      component: ModifierAnnoncePage,
      componentProps: {
        annonce,
      },
    });

    modal.onDidDismiss().then((data) => {
      this.loadVentesAchats();
    });

    return await modal.present();
  }
}
