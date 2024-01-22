import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Storage } from "@ionic/storage-angular";
import { addIcons } from "ionicons";
import { logOut } from "ionicons/icons";
import { basketOutline } from "ionicons/icons";
import { personOutline } from 'ionicons/icons';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(storage: Storage) {
    storage.create();
    addIcons({
      logout: logOut,
      panier: basketOutline,
      profil: personOutline

    })
  }
}