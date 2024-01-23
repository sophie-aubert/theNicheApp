import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core/components';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, MapOptions, tileLayer } from 'leaflet';
import { Map } from 'leaflet';
import { defaultIcon } from './default-marker';
import { marker, Marker } from 'leaflet';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    LeafletModule,
  ],
})
export class AccueilPage implements OnInit, ViewWillEnter {
  annonces: any[] = [];
  page = 1;
  limit = 100;
  totalPages = 10;
  annonceSelectionnee: any; // Nouvelle propriété
  mapOptions: MapOptions;
  mapMarkers: Marker[];


  constructor(
    private auth: AuthService,
    private router: Router,
    private readonly http: HttpClient,
    private toastController: ToastController
  ) {
    // Initialisation de 'modal'
    this.modal = {} as IonModal;
    // Initialisation de 'name'
    this.name = '';

    this.mapOptions = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
        }),
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524),
    };

    this.mapMarkers = [
      marker([46.778186, 6.641524], { icon: defaultIcon }),
      marker([46.780796, 6.647395], { icon: defaultIcon }),
      marker([46.784992, 6.652267], { icon: defaultIcon }),
    ];
  }

  onMapReady(map: Map) {
    console.log('Map is ready');
    setTimeout(() => {
      map.invalidateSize();
      console.log('Map should resize');
    }, 200);
  }


  ///////LOAD ANNONCES ET PREVIOUS ET NEXT/////////////////////////

  loadAnnonces() {
    const url = `${environment.apiUrl}/annonces?page=${this.page}&limit=${this.limit}`;

    this.http.get<any[]>(url).subscribe(
      (annonces: any[]) => {
        // Ajouter les annonces chargées au tableau des annonces
        this.annonces = [...this.annonces, ...annonces];
        this.totalPages = Math.ceil(annonces.length / this.limit);

        console.log('Annonces chargées :', this.annonces);
      },
      (error: any) => {
        console.error('Erreur lors du chargement des annonces', error);
        // Gérer les erreurs de chargement des annonces ici.
      }
    );
  }
  ngOnInit() {
    // Chargement initial des annonces
    this.loadAnnonces();
  }

  ionViewWillEnter(): void {
    // Chargement des annonces à chaque entrée dans la vue
    this.loadAnnonces();
  }



  logOut() {
    console.log('logging out...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  // Nouvelle méthode pour gérer le clic sur le bouton "Panier"
  panier() {
    this.router.navigateByUrl('/panier');
  }
  profil() {
    this.router.navigateByUrl('/donnees-perso');
  }

  // Nouvelle méthode pour gérer le clic sur une annonce
  onAnnonceClick(annonce: any) {
    console.log('Annonce cliquée :', annonce);
    this.annonceSelectionnee = annonce;
    this.router.navigate(['/article', this.annonceSelectionnee.id]); // Passer l'ID lors de la navigation
  }

  ////////////////////////////AFFICHER MODAL//////////////////////////////////////

  @ViewChild(IonModal) modal: IonModal;

  message =
    'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  //////////////////////////////GEOLOCALISATION//////////////////////////////////////
  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }

  async afficherCarteAvecAnnonces() {
    try {
      const location = await this.getCurrentLocation();
      const annoncesAvecDistance = this.calculerDistancePourAnnonces(location);

      // Utilisez les données pour afficher la carte ou effectuer d'autres actions
      console.log('Annonces avec distance:', annoncesAvecDistance);

      // Affichez un message à l'utilisateur
      const toast = await this.toastController.create({
        message: 'Carte affichée avec les annonces et distances',
        duration: 2000,
      });
      toast.present();
    } catch (error) {
      console.error(
        'Erreur lors de la récupération de la position actuelle',
        error
      );
    }
  }

  calculerDistancePourAnnonces(location: any) {
    // Implémentez la logique pour calculer la distance pour chaque annonce
    // Vous pouvez utiliser la formule Haversine ou d'autres méthodes de calcul de distance
    // Ensuite, ajoutez la distance aux données de l'annonce
    const annoncesAvecDistance = this.annonces.map((annonce) => {
      const distance = this.calculerDistanceEntreDeuxPoints(
        location.latitude,
        location.longitude,
        annonce.latitude, // Remplacez par la propriété réelle de latitude de votre annonce
        annonce.longitude // Remplacez par la propriété réelle de longitude de votre annonce
      );

      return { ...annonce, distance };
    });

    return annoncesAvecDistance;
  }

  calculerDistanceEntreDeuxPoints(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    // Implémentez la formule Haversine ou utilisez des bibliothèques comme haversine-distance
    // pour calculer la distance entre deux points géographiques
    // Retournez la distance calculée
  }
}
