import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from "@angular/router";
import { AuthService } from "src/app/security/auth.service";
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { QimgImage } from 'src/app/models/qimg-image.model';
import { PictureService } from 'src/app/picture/picture.service';

@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.page.html',
  styleUrls: ['./ajout-article.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class AjoutArticlePage implements OnInit {
  nouvelArticle: any = {}; 
  suggestions: any[] = [];

  picture: QimgImage | undefined;
 

    // Assurez-vous que cette propriété est correctement déclarée
    categories: string[] = [
      "Chaussures",
      "Pantalons",
      "Chemises",
      "Pulls",
      "Vestes",
      "Manteaux",
      "Accessoires",
      "T-shirts"
    ];

  constructor(
    private navCtrl: NavController,
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
            const firstResult = response[0];
            this.suggestions = response;
  
            // Stockez la latitude et la longitude dans nouvelArticle
            this.nouvelArticle.longitude = firstResult.lon;
            this.nouvelArticle.latitude = firstResult.lat;
          }
        },
        (error: any) => {
          console.error('Erreur lors de la recherche de la ville', error);
        }
      );
    }
  }
  

  selectCity(city: any): void {
    this.nouvelArticle.localisation = city.display_name;
    this.suggestions = []; // Clear the suggestion list
  }

  ngOnInit() {}

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



  async takePicture() {
    try {
      const image = await this.pictureService.takeAndUploadPicture().toPromise();
      this.picture = image;
    } catch (error) {
      console.error('Erreur lors de la prise de la photo :', error);
    }
  }


  



 


  ajouterArticle() {
  
    this.auth.getToken$().subscribe((authToken) => {
      console.log('Token d\'authentification récupéré', authToken);

      if (!authToken) {
        console.error('Token d\'authentification introuvable.');
        return;
      } else {
        
      const apiUrl = 'https://thenicheapp.onrender.com';
      const endpoint = `${apiUrl}/annonces`;
  
      this.http.post(endpoint, this.nouvelArticle, {
        headers: {
          Authorization: authToken
        }

      }).subscribe(
        (response: any) => {
          console.log('Nouvel article ajouté avec succès!', response);
          this.nouvelArticle = {};
          this.navCtrl.navigateBack('/accueil');
          location.reload();
        },
        (error: any) => {
          console.error('Erreur lors de l\'ajout de l\'article', error);
          // Imprimer le contenu de l'erreur pour obtenir des détails spécifiques du serveur
          if (error instanceof HttpErrorResponse) {
            console.error('Erreur du serveur:', error.error);
          }
        }
      );
    }
  }
  );
  }
}
