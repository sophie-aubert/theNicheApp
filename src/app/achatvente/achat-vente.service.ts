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


}
