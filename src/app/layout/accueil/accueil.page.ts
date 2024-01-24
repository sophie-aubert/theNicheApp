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
import { Units } from '@turf/helpers';
import * as turf from '@turf/turf';

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
  annonceSelectionnee: any;
  mapOptions: MapOptions;
  mapMarkers: Marker[];
  

  constructor(
    private auth: AuthService,
    private router: Router,
    private readonly http: HttpClient,
    private toastController: ToastController
  ) {
    this.modal = {} as IonModal;
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
    console.log('La carte est prête');
  
    Geolocation.getCurrentPosition().then((position) => {
      if (position && position.coords) {
        const currentLocation = turf.point([position.coords.longitude, position.coords.latitude]);
        const annoncesAvecDistance = this.calculerDistancePourAnnonces(currentLocation);
  
        console.log('Annonces avec distance :', annoncesAvecDistance);
  
        const toast = this.toastController.create({
          message: 'Carte affichée avec les annonces et distances',
          duration: 2000,
        });
        toast.then((t) => t.present());
      } else {
        console.error('Position géographique non disponible');
      }
    });
  
    setTimeout(() => {
      map.invalidateSize();
      console.log('La carte devrait être redimensionnée');
    }, 200);
  }

  loadAnnonces() {
    const url = `${environment.apiUrl}/annonces?page=${this.page}&limit=${this.limit}`;

    this.http.get<any[]>(url).subscribe(
      (annonces: any[]) => {
        this.annonces = annonces;
        this.totalPages = Math.ceil(annonces.length / this.limit);

        // Initialiser un nouveau tableau de marqueurs
        this.mapMarkers = this.createMarkersForAnnonces();

        console.log('Annonces chargées :', this.annonces);
      },
      (error: any) => {
        console.error('Erreur lors du chargement des annonces', error);
      }
    );
  }

 
  
  
  ngOnInit() {
    this.loadAnnonces();
  }

  ionViewWillEnter(): void {
    this.loadAnnonces();
  }

  logOut() {
    console.log('Déconnexion...');
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

  panier() {
    this.router.navigateByUrl('/panier');
  }

  profil() {
    this.router.navigateByUrl('/donnees-perso');
  }

  onAnnonceClick(annonce: any) {
    console.log('Annonce cliquée :', annonce);
    this.annonceSelectionnee = annonce;
    this.router.navigate(['/article', this.annonceSelectionnee.id]);
  }

  @ViewChild(IonModal) modal: IonModal;
  message = 'Cet exemple de modal utilise des déclencheurs pour ouvrir automatiquement une modal lorsque le bouton est cliqué.';
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
      this.message = `Bonjour, ${ev.detail.data} !`;
    }
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    return turf.point([coordinates.coords.longitude, coordinates.coords.latitude]);
  }

  async afficherCarteAvecAnnonces() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      if (coordinates && coordinates.coords) {
        // Inverser les propriétés longitude et latitude
        const location = turf.point([coordinates.coords.latitude, coordinates.coords.longitude]);
        const annoncesAvecDistance = this.calculerDistancePourAnnonces(location);
  
        console.log('Annonces avec distance :', annoncesAvecDistance);
  
        const toast = this.toastController.create({
          message: 'Carte affichée avec les annonces et distances',
          duration: 2000,
        });
        toast.then((t) => t.present());
      } else {
        console.error('Position géographique non disponible');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de la position actuelle', error);
    }
  }
  
  createMarkersForAnnonces(location?: any): Marker[] {
    return this.annonces
      .filter(annonce => annonce.geolocation && annonce.geolocation.coordinates)
      .map(annonce => {
        const customIcon = defaultIcon;
        // Inverser les propriétés longitude et latitude
        return marker([annonce.geolocation.coordinates[1], annonce.geolocation.coordinates[0]], { icon: customIcon, title: annonce.titre });
      });
  }

  calculerDistancePourAnnonces(location: any) {
   

    const annoncesAvecDistance = this.annonces.map((annonce) => {
      const destination = turf.point(annonce.geolocation.coordinates);
      const options: { units?: Units | undefined } = { units: 'kilometers' };
      const distance = turf.distance(location, destination, options);

      return { ...annonce, distance };
    });

    return annoncesAvecDistance;
  }
}
