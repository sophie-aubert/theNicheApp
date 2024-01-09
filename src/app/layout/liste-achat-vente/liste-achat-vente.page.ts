import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-liste-achat-vente',
  templateUrl: './liste-achat-vente.page.html',
  styleUrls: ['./liste-achat-vente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListeAchatVentePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
