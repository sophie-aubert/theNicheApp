import {Routes} from "@angular/router";
import { LayoutPage } from "./layout/layout.page";
export const routes: Routes =  [
  {
    // Default route
    path: "",
    component: LayoutPage,
    children: [
      {
        // Route that loads the CreateTrip module
        path: "accueil",
        loadComponent: () =>
          import("./layout/accueil/accueil.page").then(
            (m) => m.AccueilPage
          ),
      },
      {
        // Route that loads the PlacesMap module
        path: "ajout-article",
        loadChildren: () =>
          import("./layout/ajout-article/ajout-article.page").then(
            (m) => m.AjoutArticlePage
          ),
      },
      {
        // Route that loads the TripList module
        path: "article",
        loadChildren: () =>
          import("./layout/article/article.page").then(
            (m) => m.ArticlePage
          ),
      },
      {
        // Route that loads the TripList module
        path: "donnees-perso",
        loadChildren: () =>
          import("./layout/donnees-perso/donnees-perso.page").then(
            (m) => m.DonneesPersoPage
          ),
      },{
        // Route that loads the TripList module
        path: "inscription",
        loadChildren: () =>
          import("./layout/inscription/inscription.page").then(
            (m) => m.InscriptionPage
          ),
      },{
        // Route that loads the TripList module
        path: "liste-achat-vente",
        loadChildren: () =>
          import("./layout/liste-achat-vente/liste-achat-vente.page").then(
            (m) => m.ListeAchatVentePage
          ),
      },{
        // Route that loads the TripList module
        path: "login",
        loadChildren: () =>
          import("./layout/login/login.page").then(
            (m) => m.LoginPage
          ),
      },{
        // Route that loads the TripList module
        path: "paiement",
        loadChildren: () =>
          import("./layout/paiement/paiement.page").then(
            (m) => m.PaiementPage
          ),
      },{
        // Route that loads the TripList module
        path: "panier",
        loadChildren: () =>
          import("./layout/panier/panier.page").then(
            (m) => m.PanierPage
          ),
      },
    ],
  },
];