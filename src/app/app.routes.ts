import { Routes } from '@angular/router';
import { LayoutPage } from './layout/layout.page';
import { onlyAuthenticated } from './security/only-authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: 'accueil',
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import('./layout/accueil/accueil.page').then((m) => m.AccueilPage),
      },
      {
        path: 'ajout-article',
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import('./layout/ajout-article/ajout-article.page').then(
            (m) => m.AjoutArticlePage
          ),
      },
      {
        path: 'article/:id',
        loadComponent: () =>
          import('./layout/article/article.page').then((m) => m.ArticlePage),
      },
      {
        path: 'donnees-perso',
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import('./layout/donnees-perso/donnees-perso.page').then(
            (m) => m.DonneesPersoPage
          ),
      },
      {
        path: 'inscription',
        loadComponent: () =>
          import('./layout/inscription/inscription.page').then(
            (m) => m.InscriptionPage
          ),
      },
      {
        path: 'liste-achat-vente',
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import('./layout/liste-achat-vente/liste-achat-vente.page').then(
            (m) => m.ListeAchatVentePage
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./security/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'paiement',
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import('./layout/paiement/paiement.page').then((m) => m.PaiementPage),
      },
      {
        path: 'panier',
        canActivate: [onlyAuthenticated],
        loadComponent: () =>
          import('./layout/panier/panier.page').then((m) => m.PanierPage),
      },
      {
        path: '',
        redirectTo: 'accueil',
        pathMatch: 'full',
      },

      {
        path: 'login',
        loadComponent: () =>
          import('./security/login/login.page').then((m) => m.LoginPage),
      },
    ],
  },
];
