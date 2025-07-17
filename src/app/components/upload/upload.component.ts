import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  template: `
    <div class="upload">
      <h2>File Upload</h2>
      <input type="file" (change)="onFileSelected($event)">
      <button (click)="upload()">Upload</button>
    </div>
  `
})
export class UploadComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) return;
    
    // VULNÉRABILITÉ: A4 - XXE (XML External Entity)
    if (this.selectedFile.type === 'text/xml') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const xmlContent = e.target?.result as string;
        // Parsing XML non sécurisé
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
      };
      reader.readAsText(this.selectedFile);
    }
    
    // VULNÉRABILITÉ: Path Traversal
    const filename = this.selectedFile.name;
    const uploadPath = `/uploads/${filename}`; // Pas de validation du nom de fichier
    
    // VULNÉRABILITÉ: Pas de validation du type de fichier
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    
    this.http.post('/api/upload', formData).subscribe();
  }
}