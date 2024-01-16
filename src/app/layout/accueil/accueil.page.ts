import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class AccueilPage implements OnInit {
constructor(
  private auth: AuthService,
  private router: Router
  ) {}
  ngOnInit() {
  }
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
    }
}

export class accueilListePage implements ViewWillEnter {
  constructor(private readonly http: HttpClient) {}

  ionViewWillEnter(): void {
    // Make an HTTP request to retrieve the trips.
    const url = "https://thenicheapp.onrender.com/annonces";
    this.http.get(url).subscribe((annonces) => {
      console.log('Annonces chargées :', annonces);
    });
  }
}