import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // VULNÉRABILITÉ: A2 - Cryptographic Failures
  private apiKey = 'sk_live_1234567890abcdef'; // Clé API hardcodée
  private secretKey = 'mySecretKey123'; // Clé secrète faible
  
  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string) {
    // VULNÉRABILITÉ: Transmission en clair
    return this.http.post('/api/auth', {
      username,
      password, // Mot de passe non hashé
      apiKey: this.apiKey
    });
  }

  // VULNÉRABILITÉ: Génération de token prévisible
  generateToken(userId: string) {
    return btoa(userId + ':' + Date.now());
  }
}
