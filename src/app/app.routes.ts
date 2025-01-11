import { Routes } from '@angular/router';
import { authGuardGuard } from './Auth/guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('../app/Auth/components/login-fomrs/login-fomrs.component').then((m) => m.LoginFomrsComponent),
  },
  {
    path: "register",
    pathMatch: 'full',
    loadComponent: () => import('../app/Auth/pages/register-page/register-page.component').then((m) => m.RegisterPageComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('../app/Post/pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuardGuard],
    children: [
      {
        path: 'Posts',
        loadComponent: () => import('../app/Post/pages/list-post-page/list-post-page.component').then((m) => m.ListPostPageComponent),
      },
      {
        path: 'addPost',
        loadComponent: () => import('../app/Post/pages/add-post-page/add-post-page.component').then((m) => m.AddPostPageComponent),
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
