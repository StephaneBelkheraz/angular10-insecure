import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `
    <div class="search">
      <h2>Search</h2>
      <input [(ngModel)]="searchQuery" placeholder="Search...">
      <button (click)="search()">Search</button>
      <div id="searchResults"></div>
    </div>
  `
})
export class SearchComponent {
  searchQuery: string = '';

  search() {
    // VULNÉRABILITÉ: A3 - XSS Réfléchi
    const resultsDiv = document.getElementById('searchResults');
    resultsDiv!.innerHTML = `Search results for: ${this.searchQuery}`;
    
    // VULNÉRABILITÉ: A8 - Insecure Deserialization
    const serializedData = localStorage.getItem('searchData');
    if (serializedData) {
      // Désérialisation non sécurisée
      const data = JSON.parse(serializedData);
      eval(data.callback); // Exécution de code arbitraire
    }
    
    // VULNÉRABILITÉ: LDAP Injection
    const ldapQuery = `(&(objectClass=user)(cn=${this.searchQuery}))`;
    
    // VULNÉRABILITÉ: XPath Injection
    const xpathQuery = `//user[name='${this.searchQuery}']`;
  }
}