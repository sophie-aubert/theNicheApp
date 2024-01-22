import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; // Importez le module Storage

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private panier: any[] = [];
  private readonly STORAGE_KEY = 'panier'; // Clé pour stocker le panier dans le Storage

  constructor(private storage: Storage) {}

  async initStorage() {
    await this.storage.create();
  }

  async ajouterAuPanier(article: any) {
    this.panier.push(article);
    await this.storage.set(this.STORAGE_KEY, this.panier); // Stockez le panier dans le Storage
  }

  async getPanier() {
    this.panier = await this.storage.get(this.STORAGE_KEY) || []; // Obtenez le panier depuis le Storage
    return this.panier;
  }
}