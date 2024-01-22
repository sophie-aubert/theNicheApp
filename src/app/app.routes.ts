import {Routes} from "@angular/router";
import { LayoutPage } from "./layout/layout.page";
import { onlyAuthenticated } from "./security/only-authenticated.guard";

export const routes: Routes =  [
  {
    // Default route
    path: "",
    component: LayoutPage,
    children: [
      {
        // Route that loads the CreateTrip module
        path: "accueil",
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import("./layout/accueil/accueil.page").then(
            (m) => m.AccueilPage
          ),
      },
      {
        // Route that loads the PlacesMap module
        path: "ajout-article",
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import("./layout/ajout-article/ajout-article.page").then(
            (m) => m.AjoutArticlePage
          ),
      },
      {
        // Route that loads the TripList module
        path: "article/:id",
        loadComponent: () =>
          import("./layout/article/article.page").then(
            (m) => m.ArticlePage
          ),
      },
      {
        // Route that loads the TripList module
        path: "donnees-perso",
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import("./layout/donnees-perso/donnees-perso.page").then(
            (m) => m.DonneesPersoPage
          ),
      },{
        // Route that loads the TripList module
        path: "inscription",
        loadComponent: () =>
          import("./layout/inscription/inscription.page").then(
            (m) => m.InscriptionPage
          ),
      },{
        // Route that loads the TripList module
        path: "liste-achat-vente",
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import("./layout/liste-achat-vente/liste-achat-vente.page").then(
            (m) => m.ListeAchatVentePage
          ),
      },{
        // Route that loads the TripList module
        path: "login",
        loadComponent: () =>
          import("./security/login/login.page").then(
            (m) => m.LoginPage
          ),
      },{
        // Route that loads the TripList module
        path: "paiement",
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import("./layout/paiement/paiement.page").then(
            (m) => m.PaiementPage
          ),
      },{
        // Route that loads the TripList module
        path: "panier",
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import("./layout/panier/panier.page").then(
            (m) => m.PanierPage
          ),
      },
      {
        path: "",
        redirectTo: "accueil", // Or whatever tab should be the default one.
        pathMatch: "full",
      },
 
  {
    path: 'login',
    loadComponent: () => import('./security/login/login.page').then( m => m.LoginPage)
  },
],
},
];