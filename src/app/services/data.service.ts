import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getData(endpoint: string) {
    // VULNÉRABILITÉ: A10 - SSRF (Server Side Request Forgery)
    return this.http.get(endpoint); // Endpoint non validé
  }

  // VULNÉRABILITÉ: A7 - Identification and Authentication Failures
  resetPassword(email: string) {
    // Token de réinitialisation prévisible
    const resetToken = btoa(email + ':reset');
    
    return this.http.post('/api/reset-password', {
      email,
      token: resetToken
    });
  }
}