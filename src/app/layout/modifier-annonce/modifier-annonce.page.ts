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
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
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
  sauvegarderModifications() {
    this.achatVenteService
      .updateAnnonce(this.annonce)
      .pipe(
        finalize(() => {
          this.modalController.dismiss({
            saved: true,
          });
        })
      )
      .subscribe();
  }

  annulerModifications() {
    this.modalController.dismiss({
      saved: false,
    });
  }
}
