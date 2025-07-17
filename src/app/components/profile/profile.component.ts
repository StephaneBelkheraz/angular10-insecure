import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  template: `
    <div class="profile">
      <h2>User Profile</h2>
      <div [innerHTML]="userBio"></div>
      <input [(ngModel)]="newBio" placeholder="Update bio">
      <button (click)="updateBio()">Update</button>
      <div id="output"></div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  userBio: any;
  newBio: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // VULNÉRABILITÉ: Récupération non sécurisée des données utilisateur
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // VULNÉRABILITÉ: A3 - XSS via bypassSecurityTrustHtml
    this.userBio = this.sanitizer.bypassSecurityTrustHtml(userData.bio || '');
  }

  updateBio() {
    // VULNÉRABILITÉ: DOM XSS direct
    document.getElementById('output')!.innerHTML = this.newBio;
    
    // VULNÉRABILITÉ: eval() avec entrée utilisateur
    try {
      eval('var userInput = "' + this.newBio + '"');
    } catch (e) {}
    
    // VULNÉRABILITÉ: Stockage de données sensibles non chiffrées
    localStorage.setItem('userData', JSON.stringify({
      bio: this.newBio,
      ssn: '123-45-6789', // VULNÉRABILITÉ: Données sensibles hardcodées
      creditCard: '4111111111111111'
    }));
  }
}