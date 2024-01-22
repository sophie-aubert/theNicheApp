import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";

@Component({
  selector: 'app-liste-achat-vente',
  templateUrl: './liste-achat-vente.page.html',
  styleUrls: ['./liste-achat-vente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListeAchatVentePage implements OnInit {

  constructor(
    // Inject the authentication provider.
    private auth: AuthService,
    // Inject the router
    private router: Router
    ) {}

  ngOnInit() {
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
    }

  panier() {
    this.router.navigateByUrl("/panier");
  }
  profil() {
    this.router.navigateByUrl("/donnees-perso");
  }

}