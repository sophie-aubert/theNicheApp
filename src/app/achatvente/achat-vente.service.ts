import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AchatVenteService {
  private apiUrl = 'https://thenicheapp.onrender.com';

  constructor(private http: HttpClient) {}

  // Obtenez les ventes d'un utilisateur par ID
  getMesAnnonces(userId: string): Observable<any[]> {
    const url = `${this.apiUrl}/annonces/mesAnnonces/${userId}`;
    return this.http.get<any[]>(url);
  }

    // Nouvelle méthode pour supprimer une annonce
    supprimerAnnonce(annonceId: string): Observable<any> {
        const url = `${environment.apiUrl}/annonces/${annonceId}`;
        return this.http.delete(url);
      }

      getAnnonce$(annonceId: string): Observable<any> {
        const authUrl = `${environment.apiUrl}/annonces/${annonceId}`;
    
        return this.http.get<any>(authUrl);
      }
    
      updateAnnonce(annonce: any): Observable<any> {
        const url = `${this.apiUrl}/annonces/${annonce._id}`;
        return this.http.put(url, annonce);
      }

      modifierStatus(annonce: any, nouveauStatut: string): Observable<any> {
        const url = `${this.apiUrl}/annonces/${annonce._id}`;
        const updateData = { status: nouveauStatut };
        return this.http.put(url, updateData);
      }


}
