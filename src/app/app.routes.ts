import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      { path: '', redirectTo: 'blog', pathMatch: 'full' },
      {
        path: 'notes',
        loadChildren: () => import('./features/notes/notes.routes').then(m => m.notesRoutes)
      },
      {
        path: 'blog',
        loadChildren: () => import('./features/blog/blog.routes').then(m => m.blogRoutes)
      }
    ]
  }
];
