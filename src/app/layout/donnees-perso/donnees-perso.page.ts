import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";

@Component({
  selector: 'app-donnees-perso',
  templateUrl: './donnees-perso.page.html',
  styleUrls: ['./donnees-perso.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DonneesPersoPage implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

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
