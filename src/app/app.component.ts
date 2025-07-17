import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h1>Vulnerable Angular App</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .app {
      padding: 20px;
    }
  `]
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // VULNÉRABILITÉ: A9 - Security Logging and Monitoring Failures
    // Aucun logging de sécurité
    
    // VULNÉRABILITÉ: Exposition d'informations sensibles dans la console
    console.log('Debug mode enabled');
    console.log('API Key:', 'sk_live_1234567890abcdef');
    
    // VULNÉRABILITÉ: Désactivation des protections de sécurité
    window['__Zone_disable_requestAnimationFrame'] = true;
  }
}