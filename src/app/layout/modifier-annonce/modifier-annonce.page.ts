// modifier-annonce.page.ts
import { Component, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AchatVenteService } from 'src/app/achatvente/achat-vente.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-modifier-annonce',
  templateUrl: './modifier-annonce.page.html',
  styleUrls: ['./modifier-annonce.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
   
  ]
})
export class ModifierAnnoncePage {
  @Input() annonce: any;
  

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private achatVenteService: AchatVenteService
  ) {
    this.annonce = this.navParams.get('annonce');
  }
// Fonction pour sauvegarder les modifications
sauvegarderModifications() {
  // Mettez à jour l'annonce via le service
  this.achatVenteService.updateAnnonce(this.annonce)
    .pipe(
      finalize(() => {
        // Une fois la mise à jour effectuée, vous pouvez fermer la modal
        this.modalController.dismiss({
          saved: true,
        });
      })
    )
    .subscribe();
}

  // Fonction pour annuler les modifications
  annulerModifications() {
    // Fermez la modal sans sauvegarder les modifications
    this.modalController.dismiss({
      saved: false,
    });
  }
}
