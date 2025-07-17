import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-form">
      <h2>Login</h2>
      <input [(ngModel)]="username" placeholder="Username">
      <input type="password" [(ngModel)]="password" placeholder="Password">
      <button (click)="login()">Login</button>
      <div [innerHTML]="errorMessage"></div>
    </div>
  `
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // A1: Injection - SQL Injection vulnerability
  login() {
    // VULNÉRABILITÉ: Construction de requête SQL non sécurisée
    const query = `SELECT * FROM users WHERE username='${this.username}' AND password='${this.password}'`;
    
    // VULNÉRABILITÉ: Stockage du mot de passe en clair dans localStorage
    localStorage.setItem('password', this.password);
    
    // VULNÉRABILITÉ: Token JWT hardcodé et faible
    const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    
    // VULNÉRABILITÉ: Pas de validation côté client
    this.http.post('/api/login', { query })
      .subscribe(
        response => {
          // VULNÉRABILITÉ: Stockage non sécurisé du token
          sessionStorage.setItem('token', hardcodedToken);
          localStorage.setItem('userToken', hardcodedToken);
          document.cookie = `token=${hardcodedToken}; path=/`;
          
          this.router.navigate(['/profile']);
        },
        error => {
          // VULNÉRABILITÉ: XSS - Affichage direct du message d'erreur
          this.errorMessage = error.message;
        }
      );
  }
}