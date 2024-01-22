import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class AccueilPage implements OnInit, ViewWillEnter {
  annonces: any[] = []; 
  annonceSelectionnee: any; // Nouvelle propriété

  constructor(
    private auth: AuthService,
    private router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit() {
    // Chargement initial des annonces
    this.loadAnnonces();
  }

  ionViewWillEnter(): void {
    // Chargement des annonces à chaque entrée dans la vue
    this.loadAnnonces();
  }

  loadAnnonces() {
    const url = `${environment.apiUrl}/annonces`;

    this.http.get<any[]>(url).subscribe(
      (annonces: any[]) => {
        this.annonces = annonces;
        console.log('Annonces chargées :', this.annonces);
      },
      (error: any) => {
        console.error('Erreur lors du chargement des annonces', error);
        // Gérer les erreurs de chargement des annonces ici.
      }
    );
  }

  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }


  // Nouvelle méthode pour gérer le clic sur une annonce
  onAnnonceClick(annonce: any) {
    console.log('Annonce cliquée :', annonce);
    this.annonceSelectionnee = annonce;
    this.router.navigateByUrl('./layout/article.page'); // Naviguer vers la nouvelle page
  }
}
