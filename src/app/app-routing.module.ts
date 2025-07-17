import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './components/admin/admin.component';
import { SearchComponent } from './components/search/search.component';
import { UploadComponent } from './components/upload/upload.component';

// VULNÉRABILITÉ: Pas de guards de route pour protéger les pages sensibles
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }, // Pas de AuthGuard
  { path: 'admin', component: AdminComponent }, // Pas de RoleGuard
  { path: 'search', component: SearchComponent },
  { path: 'upload', component: UploadComponent },
  // VULNÉRABILITÉ: Route wildcard mal configurée
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // VULNÉRABILITÉ: enableTracing activé exposant les informations de routing
    enableTracing: true,
    // VULNÉRABILITÉ: useHash désactivé (moins sécurisé pour certains cas)
    useHash: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }