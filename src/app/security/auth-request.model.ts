// auth-request.model.ts
export interface AuthRequest {
  id?: string;
  nom?: string;
  prenom?: string;
  username?: string;
  email?: string;
  password?: string; // Ajoutez cette ligne si nécessaire
  ville?: string;
  adresse?: string;
  npa?: string;
}
