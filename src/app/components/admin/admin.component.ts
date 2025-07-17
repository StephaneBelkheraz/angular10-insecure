import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  template: `
    <div class="admin">
      <h2>Admin Panel</h2>
      <input [(ngModel)]="command" placeholder="Enter command">
      <button (click)="executeCommand()">Execute</button>
      <div>{{ result }}</div>
    </div>
  `
})
export class AdminComponent {
  command: string = '';
  result: string = '';

  constructor(private http: HttpClient) {}

  executeCommand() {
    // VULNÉRABILITÉ: A1 - Command Injection
    this.http.post('/api/admin/execute', { 
      command: `ls ${this.command}` // Injection de commande OS
    }).subscribe(res => this.result = JSON.stringify(res));
    
    // VULNÉRABILITÉ: A5 - Broken Access Control
    // Pas de vérification des permissions admin
  }
}