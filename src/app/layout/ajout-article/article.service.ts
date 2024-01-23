// annonce.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  annonces: any[] = [];

  constructor() {}

  addAnnonce(annonce: any) {
    this.annonces.push(annonce);
  }
}
