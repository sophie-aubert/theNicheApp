import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { homeOutline, addCircleOutline, listOutline } from 'ionicons/icons';

declare type PageTab = {
  title: string;
  icon: string;
  path: string;
};

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LayoutPage {
  tabs: PageTab[];

  constructor() {
    this.tabs = [
      { title: 'Accueil', icon: homeOutline, path: 'accueil' },
      { title: 'Ajout Article', icon: addCircleOutline, path: 'ajout-article' },
      { title: 'Mes ventes', icon: listOutline, path: 'liste-achat-vente' },
    ];
  }
}
