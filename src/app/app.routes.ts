import { Routes } from '@angular/router';
import { authGuardGuard } from './Auth/guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('../app/Auth/components/login-fomrs/login-fomrs.component').then((m) => m.LoginFomrsComponent),
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent: () => import('../app/Post/pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuardGuard],
    children: [
      {
        path: 'Posts',
        pathMatch: 'full',
        loadComponent: () => import('../app/Post/pages/list-post-page/list-post-page.component').then((m) => m.ListPostPageComponent),
      },
      {
        path: '',
        redirectTo: 'Posts',
        pathMatch: 'full',

      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
