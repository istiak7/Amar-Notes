import { Routes } from '@angular/router';

export const blogRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./blog-list/blog-list').then(m => m.BlogList)
  },
  {
    path: ':id',
    loadComponent: () => import('./blog-detail/blog-detail').then(m => m.BlogDetail)
  }
];
