import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { QimgImage } from 'src/app/models/qimg-image.model';
import { PictureService } from 'src/app/picture/picture.service';

@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.page.html',
  styleUrls: ['./ajout-article.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class AjoutArticlePage implements OnInit {
  nouvelArticle: any = {
    titre: '',
    description: '',
    prix: '',
    categorie: '',
    localisation: '',
    image: '',
  };
  suggestions: any[] = [];

  categories: string[] = [
    'Chaussures',
    'Pantalons',
    'Chemises',
    'Pulls',
    'Vestes',
    'Manteaux',
    'Accessoires',
    'T-shirts',
  ];

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private pictureService: PictureService
  ) {}

  searchCity(query: string | number | null | undefined): void {
    if (typeof query === 'string') {
      const nominatimApiUrl = 'https://nominatim.openstreetmap.org/search';
      const params = {
        q: query,
        format: 'json',
        addressdetails: 1,
      };

      this.http.get<any[]>(nominatimApiUrl, { params }).subscribe(
        (response) => {
          console.log('Résultats de la recherche:', response);

          if (response.length > 0) {
            this.suggestions = response;
          }
        },
        (error: any) => {
          console.error('Erreur lors de la recherche de la ville', error);
        }
      );
    }
  }

  selectCity(city: any): void {
    this.nouvelArticle.longitude = city.lon;
    this.nouvelArticle.latitude = city.lat;
    this.nouvelArticle.localisation = city.display_name;
    this.suggestions = [];
  }

  ngOnInit() {}

  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  panier() {
    this.router.navigateByUrl('/panier');
  }

  profil() {
    this.router.navigateByUrl('/donnees-perso');
  }

  async takePicture() {
    try {
      const image = await this.pictureService
        .takeAndUploadPicture()
        .toPromise();
      this.nouvelArticle.image = image?.url;
    } catch (error) {
      console.error('Erreur lors de la prise de la photo :', error);
    }
  }

  ajouterArticle() {
    const apiUrl = 'https://thenicheapp.onrender.com';
    const endpoint = `${apiUrl}/annonces`;

    this.http.post(endpoint, this.nouvelArticle).subscribe(
      (response: any) => {
        console.log('Nouvel article ajouté avec succès!', response);
        this.nouvelArticle = {};
        this.router.navigateByUrl('/accueil');
      },
      (error: any) => {
        console.error("Erreur lors de l'ajout de l'article", error);
        if (error instanceof HttpErrorResponse) {
          console.error('Erreur du serveur:', error.error);
        }
      }
    );
  }
}
