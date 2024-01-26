import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private panier: any[] = [];
  private readonly STORAGE_KEY = 'panier';
  private panierSubject = new Subject<any[]>(); // Ajoutez un Subject

  constructor(private storage: Storage) {}

  async initStorage() {
    await this.storage.create();
  }

  async ajouterAuPanier(article: any) {
    this.panier.push(article);
    await this.storage.set(this.STORAGE_KEY, this.panier);
    this.panierSubject.next([...this.panier]); // Émettez une notification de changement
  }

  async getPanier() {
    this.panier = (await this.storage.get(this.STORAGE_KEY)) || [];
    return this.panier;
  }

  getPanierObservable() {
    return this.panierSubject.asObservable();
  }

  async setPanier(panier: any[]) {
    this.panier = panier;
    await this.storage.set(this.STORAGE_KEY, this.panier);
    this.panierSubject.next([...this.panier]); // Émettez une notification de changement
  }

  videPanier() {
    this.panier = [];
    this.storage.remove(this.STORAGE_KEY);
    this.panierSubject.next([...this.panier]); // Émettez une notification de changement
  }
}
